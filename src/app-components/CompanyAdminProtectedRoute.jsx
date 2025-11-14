import { getMockCurrentUser } from "@/lib/mock-data";
import { Navigate, Outlet } from "react-router-dom";

const useCompanyAdminAuth = () => {
  const user = getMockCurrentUser();

  if (!user || (user.role !== "company_admin" && user.role !== "location_contact")) {
    return { isAuthenticated: false, mustChangePassword: false };
  }

  return {
    isAuthenticated: true,
    mustChangePassword: user.mustChangePassword === true,
  };
};

export default function CompanyAdminProtectedRoute() {
  const { isAuthenticated, mustChangePassword } = useCompanyAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (mustChangePassword) {
    return <Navigate to="/auth/change-password" replace />;
  }

  return <Outlet />;
}
