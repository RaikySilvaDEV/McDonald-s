"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  slug: string;
}

export default function AdminOrderList({ slug }: Props) {
  const [adminKey, setAdminKey] = useState("");
  const [orders, setOrders] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?slug=${slug}`, {
        headers: { "x-admin-key": adminKey },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Unauthorized or failed");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders — check admin key");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: number, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      await loadOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          placeholder="Admin key"
          className="border px-2 py-1 rounded"
        />
        <Button onClick={loadOrders} disabled={!adminKey || loading}>
          Carregar pedidos
        </Button>
      </div>

      {orders && (
        <div className="space-y-4 pt-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 border rounded">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">Pedido #{order.id}</p>
                  <p>CPF: {order.customerCpf}</p>
                </div>
                <div className="flex gap-2">
                  {order.status === "PENDING" && (
                    <Button onClick={() => updateStatus(order.id, "IN_PREPARATION")}>
                      Iniciar preparo
                    </Button>
                  )}
                  {order.status === "IN_PREPARATION" && (
                    <Button onClick={() => updateStatus(order.id, "FINISHED")}>
                      Finalizar
                    </Button>
                  )}
                </div>
              </div>
              <div className="pt-2">
                {order.orderProducts.map((op: any) => (
                  <div key={op.id} className="text-sm">
                    {op.quantity}x {op.product.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
