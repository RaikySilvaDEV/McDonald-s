import AdminOrderList from "./components/admin-order-list";

interface AdminPageProps {
  params: { slug: string };
}

const AdminPage = ({ params }: AdminPageProps) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Área do Estabelecimento</h1>
      <p className="text-sm text-muted-foreground">Gerencie pedidos do seu restaurante</p>
      <div className="pt-6">
        <AdminOrderList slug={params.slug} />
      </div>
    </div>
  );
};

export default AdminPage;
