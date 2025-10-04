import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const CheckoutSuccessPage = () => {
  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center py-10">
      <CheckCircle2 size={120} className="text-primary" />
      <h1 className="mt-4 text-2xl font-semibold">Pedido Realizado!</h1>
      <p className="mt-2 text-muted-foreground">
        Seu pedido foi processado com sucesso.
      </p>
      <p className="text-muted-foreground">
        Você pode acompanhar o status do seu pedido na seção &quot;Meus Pedidos&quot;.
      </p>
      <Button asChild className="mt-6 rounded-full">
        <Link href="/">Voltar para o início</Link>
      </Button>
    </div>
  );
};

export default CheckoutSuccessPage;
