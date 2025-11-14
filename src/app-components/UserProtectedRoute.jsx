import { getMockCurrentUser } from "@/lib/mock-data";
import { Outlet } from "react-router-dom";

const isUserAuthenticated = () => {
  // Replace this with real auth logic (e.g., check token, session, etc.)
  const user = getMockCurrentUser();
  return !user || user.role !== "location_contact";
};
export default function LocationLayout() {
  return isUserAuthenticated() ? <Outlet /> : <Navigate to="/auth/login" />;
}
