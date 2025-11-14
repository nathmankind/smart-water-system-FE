import { getMockCurrentUser } from "@/lib/mock-data";
import { redirect } from "next/navigation";
import { LocationNav } from "@/components/location/location-nav";
import { Outlet } from "react-router-dom";

export default function LocationLayout() {
  const user = getMockCurrentUser();

  if (!user || user.role !== "location_contact") {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <LocationNav />
      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
