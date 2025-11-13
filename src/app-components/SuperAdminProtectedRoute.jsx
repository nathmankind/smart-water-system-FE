import { Navigate, Outlet } from "react-router-dom";
import { getMockCurrentUser } from "@/lib/mock-data";

const isUserAuthenticated = () => {
  // Replace this with real auth logic (e.g., check token, session, etc.)
  const user = getMockCurrentUser();
  return !(!user || user.role !== "superadmin");
};
export default function SuperAdminProtectedRoute() {
  return isUserAuthenticated() ? <Outlet /> : <Navigate to="/auth/login" />;
}
