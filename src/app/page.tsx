import { db } from "@/lib/prisma";
import HomeRedirect from "./home-redirect";

const HomePage = async () => {
  // get the first restaurant and redirect to its slug
  const restaurant = await db.restaurant.findFirst({ orderBy: { createdAt: "asc" } });

  if (!restaurant) {
    return <h1>No restaurants available</h1>;
  }

  return <HomeRedirect slug={restaurant.slug} />;
};

export default HomePage;
