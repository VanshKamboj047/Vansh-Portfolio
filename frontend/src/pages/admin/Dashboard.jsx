import AdminLayout from "../../components/admin/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h1>
      <p className="text-gray-500">Manage your portfolio content from here.</p>
    </AdminLayout>
  );
}