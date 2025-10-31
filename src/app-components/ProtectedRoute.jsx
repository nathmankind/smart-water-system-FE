import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  // Replace this with real auth logic (e.g., check token, session, etc.)
  return !!localStorage.getItem("user_token");
};

export default function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}
