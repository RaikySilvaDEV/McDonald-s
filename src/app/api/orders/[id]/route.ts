import { OrderStatus } from "@prisma/client";
import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

// Allow `any` for the route context because Next's runtime expects a flexible shape here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { status } = body as { status?: string };
    if (!status) {
      return NextResponse.json({ error: "Missing status" }, { status: 400 });
    }
    // validate allowed statuses
    const allowed = ["PENDING", "IN_PREPARATION", "FINISHED"];
    if (!allowed.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // simple admin auth: require ADMIN_KEY in header
    const adminKey = request.headers.get("x-admin-key");
    if (!process.env.ADMIN_KEY || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updated = await db.order.update({
      where: {id: parseInt(params.id, 10), },
      data: { status: status as OrderStatus },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
