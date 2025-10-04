"use client";

import { Prisma } from "@prisma/client";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";
import FinishOrderForm from "./finish-order-form";

interface CartSheetProps {
  restaurant: Prisma.RestaurantGetPayload<{}>;
}

const CartSheet = ({ restaurant }: CartSheetProps) => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  const [view, setView] = useState<"cart" | "form">("cart");

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col py-5">
          {view === "cart" && (
            <>
              {products.length > 0 ? (
                <>
                  <div className="flex-auto space-y-4">
                    {products.map((product) => (
                      <CartProductItem key={product.id} product={product} />
                    ))}
                  </div>
                  <div className="mt-6">
                    <Card>
                      <CardContent className="space-y-4 p-5">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Total</span>
                          <span>{formatCurrency(total)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Button onClick={() => setView("form")} className="mt-6 w-full">
                    Finalizar Pedido
                  </Button>
                </>
              ) : (
                <p className="text-center">Sua sacola está vazia.</p>
              )}
            </>
          )}

          {view === "form" && (
            <FinishOrderForm
              restaurant={restaurant}
              onCancelClick={() => setView("cart")}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;