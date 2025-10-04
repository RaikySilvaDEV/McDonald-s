"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod, Prisma } from "@prisma/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CartContext, removeCpfPunctuation } from "../contexts/cart";
import { isValidCpf } from "../helpers/cpf";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é obrigatório.",
    })
    .refine((value) => isValidCpf(value), {
      message: "CPF inválido.",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  restaurant: Prisma.RestaurantGetPayload<{}>;
  onCancelClick: () => void;
}

const FinishOrderForm = ({
  restaurant,
  onCancelClick,
}: FinishOrderDialogProps) => {
  const { slug } = useParams<{ slug: string }>();
  const { products, consumptionMethod, total } = useContext(CartContext);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data: FormSchema) => {
    setIsSubmitting(true);
    setError(null);

    // Verificação de segurança final. A lógica principal de prevenção deve estar no componente pai.
    if (!restaurant) {
      console.error(
        "Erro crítico: onSubmit foi chamado sem um objeto 'restaurant'.",
      );
      setError(
        "Ocorreu um erro inesperado. Por favor, recarregue a página e tente novamente.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId: restaurant.id,
          customerName: data.name,
          customerCpf: removeCpfPunctuation(data.cpf),
          consumptionMethod,
          total,
          products: products.map((p) => ({
            productId: p.id,
            quantity: p.quantity,
            name: p.name,
            price: p.price,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar o pedido.");
      }

      const { checkoutUrl } = await response.json();

      // Redireciona para a página de checkout do Stripe
      window.location.href = checkoutUrl;
    } catch (error) {
      setError("Ocorreu um erro ao finalizar o pedido. Tente novamente.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="p-5">
      <h2 className="mb-4 text-lg font-semibold">Finalizar Pedido</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seu nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seu CPF</FormLabel>
                <FormControl>
                  <PatternFormat
                    placeholder="Digite seu CPF..."
                    format="###.###.###-##"
                    customInput={Input}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3 pt-3">
            <Button type="submit" disabled={isSubmitting || !restaurant}>
              {isSubmitting ? "Finalizando..." : "Ir para o Pagamento"}
            </Button>
            {error && (
              <p className="mt-2 text-center text-xs text-red-500">{error}</p>
            )}
            <Button onClick={onCancelClick} variant="outline">
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FinishOrderForm;
