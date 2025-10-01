"use client";

import { ConsumptionMethod, Prisma } from "@prisma/client";
import { Utensils, Package } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface Props {
  slug: string;
}

type OrderWithProducts = Prisma.OrderGetPayload<{
  include: { orderProducts: { include: { product: true } } };
}>;

export default function AdminOrderList({ slug }: Props) {
  const [adminKey, setAdminKey] = useState("");
  const [orders, setOrders] = useState<OrderWithProducts[] | null>(null);
  const [pendingOrders, setPendingOrders] = useState<OrderWithProducts[]>([]);
  const [inProgressOrders, setInProgressOrders] = useState<OrderWithProducts[]>(
    [],
  );
  const [finishedOrders, setFinishedOrders] = useState<OrderWithProducts[]>([]);

  const [loading, setLoading] = useState(false);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?slug=${slug}`, {
        headers: { "x-admin-key": adminKey },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Unauthorized or failed");
      const data = await res.json();
      setOrders(data); // Mantém a lista completa para o polling

      // Distribui os pedidos por status
      setPendingOrders(
        data.filter((o: OrderWithProducts) => o.status === "PENDING"),
      );
      setInProgressOrders(
        data.filter((o: OrderWithProducts) => o.status === "IN_PREPARATION"),
      );
      setFinishedOrders(data.filter((o: OrderWithProducts) => o.status === "FINISHED"));
    } catch (err) {
      console.error(err);
      alert("Failed to load orders — check admin key");
    } finally {
      setLoading(false);
    }
  }, [adminKey, slug]);
  useEffect(() => {
    if (!adminKey || !orders) return;

    const intervalId = setInterval(() => {
      loadOrders();
    }, 5000); // Atualiza a cada 5 segundos

    return () => {
      clearInterval(intervalId);
    };
  }, [adminKey, orders, loadOrders]);
  
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

  const OrderColumn = ({
    title,
    orders,
  }: {
    title: string;
    orders: OrderWithProducts[];
  }) => (
    <div className="w-full">
      <h3 className="py-2 text-center font-semibold">{title}</h3>
      <div className="flex h-[600px] flex-col gap-4 overflow-y-auto rounded-lg bg-accent p-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="space-y-3 p-5">
                <p className="font-semibold">Pedido #{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  CPF: {order.customerCpf}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {order.consumptionMethod === "DINE_IN" ? (
                    <>
                      <Utensils size={14} />
                      <span>Para Comer no Local</span>
                    </>
                  ) : (
                    <>
                      <Package size={14} />
                      <span>Para Viagem</span>
                    </>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  {order.orderProducts.map((op) => (
                    <div key={op.id} className="text-sm text-muted-foreground">
                      {op.quantity}x {op.product.name}
                    </div>
                  ))}
                </div>

                <div className="flex w-full justify-end gap-2 pt-2">
                  {order.status === "PENDING" && (
                    <Button
                      size="sm"
                      onClick={() => updateStatus(order.id, "IN_PREPARATION")}
                    >
                      Iniciar preparo
                    </Button>
                  )}
                  {order.status === "IN_PREPARATION" && (
                    <Button size="sm" onClick={() => updateStatus(order.id, "FINISHED")}>
                      Finalizar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-sm text-muted-foreground">Nenhum pedido.</p>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex gap-2">
        <Input
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          placeholder="Admin key"
          className="max-w-sm"
        />
        <Button onClick={loadOrders} disabled={!adminKey || loading}>
          Carregar pedidos
        </Button>
      </div>

      {orders && orders.length > 0 && (
        <div className="flex gap-4 pt-6">
          <OrderColumn title="Pendentes" orders={pendingOrders} />
          <OrderColumn title="Em Preparo" orders={inProgressOrders} />
          <OrderColumn title="Finalizados" orders={finishedOrders} />
        </div>
      )}

      {orders && orders.length === 0 && (
        <p className="pt-6 text-muted-foreground">Nenhum pedido encontrado.</p>
      )}
    </div>
  );
}
