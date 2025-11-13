import { LocationNav } from "@/components/location/location-nav";
import { Outlet } from "react-router-dom";

export default function LocationLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LocationNav />
      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
