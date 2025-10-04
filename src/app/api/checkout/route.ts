import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  const {
    restaurantId,
    customerName,
    customerCpf,
    consumptionMethod,
    total,
    products,
  } = await req.json();

  // 1. Validate environment variables
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    console.error("Stripe secret key is not set.");
    return new NextResponse("Internal Server Error: Stripe not configured", {
      status: 500,
    });
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-09-30.clover",
  });

  // Busca o restaurante para obter o slug
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: restaurantId,
    },
  });

  if (!restaurant) return new NextResponse("Restaurant not found", { status: 404 });

  // 2. Create the order and its products in a transaction
  const order = await db.$transaction(async (prisma) => {
    const newOrder = await prisma.order.create({
      data: {
        restaurantId,
        customerName,
        customerCpf,
        consumptionMethod,
        total,
        status: "PENDING",
      },
    });

    await prisma.orderProduct.createMany({
      data: products.map(
        (product: { productId: string; quantity: number; price: number }) => ({
          productId: product.productId,
          quantity: product.quantity,
          price: product.price,
          orderId: newOrder.id,
        }),
      ),
    });

    return newOrder;
  });

  // 3. Create the Stripe Checkout Session
  const lineItems = products.map(
    (product: { name: string; price: number; quantity: number }) => {
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.price * 100), // Price in cents
        },
        quantity: product.quantity,
      };
    },
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${restaurant.slug}/menu?consumptionMethod=${consumptionMethod}&success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${restaurant.slug}/menu?consumptionMethod=${consumptionMethod}`,
    metadata: {
      orderId: order.id.toString(),
    },
  });

  return NextResponse.json({ checkoutUrl: session.url });
}