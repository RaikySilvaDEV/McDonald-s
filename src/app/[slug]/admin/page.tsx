import AdminOrderList from "./components/admin-order-list";

interface AdminPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { slug } = await params;
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Painel do Administrador</h2>
      <p className="text-sm text-muted-foreground">
        Gerencie pedidos do seu restaurante
      </p>
      <div className="pt-6">
        <AdminOrderList slug={slug} />
      </div>
    </div>
  );
}