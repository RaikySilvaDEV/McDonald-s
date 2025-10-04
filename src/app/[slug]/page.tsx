import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="relative h-screen w-full">
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-black/60 px-4">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={82}
            height={82}
            className="rounded-full"
          />
          <h2 className="text-xl font-semibold text-white">{restaurant.name}</h2>
        </div>

        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-semibold text-white">Seja bem-vindo!</h3>
          <p className="text-white/80">
            Escolha como prefere aproveitar sua refeição.
          </p>
        </div>

        <div className="grid w-full max-w-sm grid-cols-2 gap-4">
          <ConsumptionMethodOption
            slug={slug}
            option="DINE_IN"
            buttonText="Para comer aqui"
            imageAlt="Comer aqui"
            imageUrl="/dine_in.png"
          />
          <ConsumptionMethodOption
            slug={slug}
            option="TAKEAWAY"
            buttonText="Para levar"
            imageAlt="Para levar"
            imageUrl="/takeaway.png"
          />
        </div>
      </div>
    </div>
  );
}