import { Navigate, Outlet } from "react-router-dom";
import { getMockCurrentUser } from "@/lib/mock-data";

const useSuperAdminAuth = () => {
  const user = getMockCurrentUser();

  if (!user || user.role !== "superadmin") {
    return { isAuthenticated: false, mustChangePassword: false };
  }

  return {
    isAuthenticated: true,
    mustChangePassword: user.mustChangePassword === true,
  };
};

export default function SuperAdminProtectedRoute() {
  const { isAuthenticated, mustChangePassword } = useSuperAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (mustChangePassword) {
    return <Navigate to="/auth/change-password" replace />;
  }

  return <Outlet />;
}
