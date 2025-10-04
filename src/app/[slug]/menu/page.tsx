import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

export const dynamic = "force-dynamic";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod?.toUpperCase());
};

export default async function RestaurantMenuPage({
  params,
}: RestaurantMenuPageProps) {
  const { slug } = await params;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: {
          products: true,
        },
      },
    },
  });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="relative">
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
}
