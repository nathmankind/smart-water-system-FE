import { CompanyAdminNav } from "@/components/company-admin/company-admin-nav";
import { Outlet } from "react-router-dom";

export default function CompanyAdminLayout() {
  //   const user = getMockCurrentUser();

  //   if (user.role !== "company_admin") {
  //     redirect("/auth/login");
  //   }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <CompanyAdminNav />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
