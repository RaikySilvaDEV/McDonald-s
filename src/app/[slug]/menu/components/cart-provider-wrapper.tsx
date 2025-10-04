"use client";

import { Prisma } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

import { CartProvider } from "../contexts/cart";

interface CartProviderWrapperProps {
  children: ReactNode;
  restaurant: Prisma.RestaurantGetPayload<{}>;
}

export const CartProviderWrapper = ({
  children,
  restaurant,
}: CartProviderWrapperProps) => {
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get("consumptionMethod") || "TAKEAWAY";

  return (
    <CartProvider restaurant={restaurant} consumptionMethod={consumptionMethod}>
      {children}
    </CartProvider>
  );
};
