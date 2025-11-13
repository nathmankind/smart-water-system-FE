import { getMockCurrentUser } from "@/lib/mock-data";
import { Navigate, Outlet } from "react-router-dom";

const isCompanyAdminAuthenticated = () => {
  // Replace this with real auth logic (e.g., check token, session, etc.)
  const user = getMockCurrentUser();
  return !!user;
};

export default function CompanyAdminProtectedRoute() {
  return isCompanyAdminAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" />
  );
}
