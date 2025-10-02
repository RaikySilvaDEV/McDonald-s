import { OrderStatus } from "@prisma/client";
import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;
    const updated = await db.order.update({
      where: { id: parseInt(id, 10) },
      data: { status: status as OrderStatus },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
