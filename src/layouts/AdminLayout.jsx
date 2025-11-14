import { AdminNav } from "@/components/admin-nav";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  //   const supabase = await createClient()

  //   const {
  //     data: { user },
  //     error,
  //   } = await supabase.auth.getUser()

  //   if (error || !user) {
  //     navigate("/auth/login");
  //   }

  // Check if user is superadmin
  //   const { data: profile } = await supabase
  //     .from("profiles")
  //     .select("role")
  //     .eq("id", user.id)
  //     .single();

  //   if (profile?.role !== "superadmin") {
  //     redirect("/dashboard");
  //   }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminNav />
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
