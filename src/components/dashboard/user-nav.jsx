import { Button } from "@/components/ui/button";
import { Droplet, Home, MapPin, AlertTriangle, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function UserNav({ profile }) {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    // const supabase = createClient();
    // await supabase.auth.signOut();
    navigate("/auth/login");
  };

  const navItems = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/locations", label: "Locations", icon: MapPin },
    { href: "/dashboard/alarms", label: "Alarms", icon: AlertTriangle },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <a href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Droplet className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                WQ Monitor
              </span>
              {profile?.companies && (
                <span className="text-xs text-gray-500">
                  {profile.companies.name}
                </span>
              )}
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

        <div className="flex items-center gap-4">
          <div className="hidden flex-col items-end md:flex">
            <span className="text-sm font-medium text-gray-900">
              {profile?.full_name || "User"}
            </span>
            <span className="text-xs text-gray-500">{profile?.email}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
