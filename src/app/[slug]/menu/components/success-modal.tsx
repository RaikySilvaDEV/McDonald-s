"use client";

import { Prisma } from "@prisma/client";
import { CheckCircle2 } from "lucide-react";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  restaurant: Prisma.RestaurantGetPayload<{}>;
}

export const SuccessModal = ({
  open,
  onClose,
  restaurant,
}: SuccessModalProps) => {
  const router = useRouter();

  const handleViewOrders = () => {
    onClose();
    router.push(`/${restaurant.slug}/orders`);
  };

  const handleContinue = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleContinue}>
      <DialogContent className="w-[90%] rounded-lg">
        {open && <Confetti recycle={false} numberOfPieces={400} />}
        <DialogHeader className="items-center text-center">
          <CheckCircle2
            size={60}
            className="animate-pop-in text-green-500"
          />
          <DialogTitle className="pt-2 text-xl font-semibold">
            Pedido Efetuado!
          </DialogTitle>
          <DialogDescription>
            Seu pedido já foi para a cozinha e está sendo preparado!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button onClick={handleViewOrders} className="w-full">
            Ver Pedidos
          </Button>
          <Button onClick={handleContinue} variant="ghost" className="w-full">
            Continuar Comprando
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};