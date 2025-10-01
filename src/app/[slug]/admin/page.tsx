import AdminOrderList from "./components/admin-order-list";


interface AdminPageProps {
  params: {
    slug: string;
  };
}

export default function AdminPage({ params }: AdminPageProps) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Painel do Administrador</h2>
      <p className="text-sm text-muted-foreground">
        Gerencie pedidos do seu restaurante
      </p>
      <div className="pt-6">
        <AdminOrderList slug={params.slug} />
      </div>
    </div>
  );
}
