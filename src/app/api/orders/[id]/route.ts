import { OrderStatus } from "@prisma/client";
import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
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

    const updated = await db.order.update({
      where: { id: Number(id) },
      data: { status: status as OrderStatus },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
