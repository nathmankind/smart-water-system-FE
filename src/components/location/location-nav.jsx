import { Button } from "@/components/ui/button";
import { Droplet, Bell, LogOut } from "lucide-react";
import {
  getMockCurrentUser,
  getLocationById,
} from "@/lib/mock-data";
import { useLocation, useNavigate } from "react-router-dom";

export function LocationNav() {
  const navigate = useNavigate();

  const routePath = useLocation();
  const pathname = routePath.pathname;

  const user = getMockCurrentUser();
  const location = user?.location_id ? getLocationById(user.location_id) : null;

  const handleLogout = () => {
    localStorage.removeItem("mock_current_user");
    localStorage.removeItem("user_token");
    navigate("/auth/login");
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/location" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                <Droplet className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">
                Water Monitor
              </span>
            </a>
            <div className="flex items-center gap-1">
              <a
                href="/location"
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === "/location"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                Dashboard
              </a>
              <a
                href="/location/alarms"
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === "/location/alarms"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Alarms
                </div>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.full_name}
              </p>
              <p className="text-xs text-gray-600">{location?.name}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
