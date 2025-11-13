import { Button } from "@/components/ui/button";
import {
  Droplet,
  Users,
  Building2,
  MapPin,
  Settings,
  AlertTriangle,
  LogOut,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

export function AdminNav() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    // const supabase = createClient();
    // await supabase.auth.signOut();
    // navigate("/auth/login");
    console.log("Logout!");
  };

  const navItems = [
    { href: "/admin", label: "Overview", icon: Droplet },
    { href: "/admin/companies", label: "Companies", icon: Building2 },
    { href: "/admin/alarms", label: "System Alarms", icon: AlertTriangle },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <a href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Droplet className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">
              WQ Monitor
            </span>
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
                      ? "bg-blue-50 text-blue-700"
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

        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="text-gray-600 hover:text-gray-900"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </header>
  );
}
