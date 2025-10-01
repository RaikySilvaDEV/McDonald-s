import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";

const HomePage = async () => {
  // get the first restaurant and redirect to its slug
  const restaurant = await db.restaurant.findFirst({ orderBy: { createdAt: "asc" } });
  if (!restaurant) {
    return <h1>No restaurants available</h1>;
  }
  redirect(`/${restaurant.slug}`);
};

export default HomePage;
