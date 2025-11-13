import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, AlertTriangle } from "lucide-react";
import {
  mockUsers,
  mockCompanies,
  mockLocations,
  mockAlarms,
} from "@/lib/mock-data";

export default function AdminPage() {
  const usersCount = mockUsers.length;
  const companiesCount = mockCompanies.length;
  const locationsCount = mockLocations.length;
  const activeAlarmsCount = mockAlarms.filter(
    (a) => a.status === "active"
  ).length;

  const stats = [
    {
      title: "Companies",
      value: companiesCount,
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      title: "Total Locations",
      value: locationsCount,
      icon: MapPin,
      color: "bg-green-500",
    },
    {
      title: "Active Alarms",
      value: activeAlarmsCount,
      icon: AlertTriangle,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Superadmin Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Onboard companies and oversee the entire system
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <a
              href="/admin/companies"
              className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
            >
              <Building2 className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Onboard Company</h3>
              <p className="text-sm text-gray-600">
                Register a new company and create their admin account
              </p>
            </a>
            <a
              href="/admin/alarms"
              className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
            >
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h3 className="font-semibold text-gray-900">System Alarms</h3>
              <p className="text-sm text-gray-600">
                Monitor alarms across all companies
              </p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
