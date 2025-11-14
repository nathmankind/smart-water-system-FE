import {
  Droplet,
  LayoutDashboard,
  MapPin,
  AlertTriangle,
  LogOut,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMockCurrentUser, getCompanyById } from "@/lib/mock-data";
import { useLocation, useNavigate } from "react-router-dom";

export function CompanyAdminNav() {
  const navigate = useNavigate();

  const location = useLocation();
  const pathname = location.pathname;
  const user = getMockCurrentUser();
  const company = user.company_id ? getCompanyById(user.company_id) : null;

  const handleLogout = () => {
    localStorage.removeItem("mock_current_user");
    localStorage.removeItem("user_token");
    navigate("/auth/login");
  };

  const navItems = [
    {
      href: "/company-admin",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      href: "/company-admin/locations",
      label: "Locations",
      icon: MapPin,
    },
    {
      href: "/company-admin/users",
      label: "Users",
      icon: Users,
    },
    {
      href: "/company-admin/alarms",
      label: "Alarms",
      icon: AlertTriangle,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <a href="/company-admin" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <Droplet className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                {company?.name || "Company Admin"}
              </span>
              <span className="text-xs text-gray-500">
                Water Quality Monitor
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden flex-col items-end sm:flex">
            <span className="text-sm font-medium text-gray-900">
              {user.full_name}
            </span>
            <span className="text-xs text-gray-500">Company Admin</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
