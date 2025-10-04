import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";
import { CartProviderWrapper } from "./menu/components/cart-provider-wrapper";

interface RestaurantLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function RestaurantLayout({
  children,
  params,
}: RestaurantLayoutProps) {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  if (!restaurant) return notFound();
  return (
    <CartProviderWrapper restaurant={restaurant}>
      {children}
    </CartProviderWrapper>
  );
}