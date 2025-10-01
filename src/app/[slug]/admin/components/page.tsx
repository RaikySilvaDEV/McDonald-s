import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";
import ConsumptionMethodOption from "../../components/consumption-method-option";

interface RestaurantPageProps {
  params: {
    slug: string;
  };
}

const RestaurantPage = async ({ params: { slug } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-center text-lg font-semibold">Como você quer retirar seu pedido?</h1>
      <div className="flex flex-col gap-4 md:flex-row">
        <ConsumptionMethodOption
          slug={slug}
          imageUrl="/eat-in.png"
          imageAlt="Para Comer no Local"
          buttonText="Para Comer no Local"
          option="EAT_IN"
        />
        <ConsumptionMethodOption
          slug={slug}
          imageUrl="/take-out.png"
          imageAlt="Para Levar"
          buttonText="Para Levar"
          option="TAKE_OUT"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
