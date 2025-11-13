import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, AlertTriangle, Activity } from "lucide-react";
import {
  getMockCurrentUser,
  getLocationsByCompany,
  getAlarmsByCompany,
} from "@/lib/mock-data";

export default async function DashboardPage() {
  const user = getMockCurrentUser();

  if (!user.company_id) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <Card className="max-w-md border-gray-200">
          <CardHeader>
            <CardTitle>No Company Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Your account has not been assigned to a company yet. Please
              contact your administrator.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const locations = getLocationsByCompany(user.company_id);
  const companyAlarms = getAlarmsByCompany(user.company_id);
  const activeAlarmsCount = companyAlarms.filter(
    (a) => a.status === "active"
  ).length;
  const recentAlarms = companyAlarms.slice(0, 5);

  const stats = [
    {
      title: "Active Locations",
      value: locations.length,
      total: locations.length,
      icon: MapPin,
      color: "bg-blue-500",
      href: "/dashboard/locations",
    },
    {
      title: "Active Alarms",
      value: activeAlarmsCount,
      icon: AlertTriangle,
      color: "bg-red-500",
      href: "/dashboard/alarms",
    },
    {
      title: "Monitoring",
      value: "Real-time",
      icon: Activity,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Monitor your water quality systems
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const content = (
            <Card
              key={index}
              className="border-gray-200 transition-shadow hover:shadow-md"
            >
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
                  {stat.total && (
                    <span className="text-lg text-gray-500">
                      {" "}
                      / {stat.total}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );

          return stat.href ? (
            <a key={index} href={stat.href}>
              {content}
            </a>
          ) : (
            <div key={index}>{content}</div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Your Locations</CardTitle>
          </CardHeader>
          <CardContent>
            {locations.length > 0 ? (
              <div className="space-y-3">
                {locations.map((location) => (
                  <a
                    key={location.id}
                    href={`/dashboard/locations/${location.id}`}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {location.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {location.address}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No locations found</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Recent Alarms</CardTitle>
          </CardHeader>
          <CardContent>
            {recentAlarms.length > 0 ? (
              <div className="space-y-3">
                {recentAlarms.map((alarm) => {
                  const location = locations.find(
                    (l) => l.id === alarm.location_id
                  );
                  return (
                    <div
                      key={alarm.id}
                      className="flex items-start gap-3 rounded-lg border border-gray-200 p-3"
                    >
                      <div
                        className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg ${
                          alarm.alarm_type === "critical"
                            ? "bg-red-100"
                            : alarm.alarm_type === "warning"
                            ? "bg-yellow-100"
                            : "bg-orange-100"
                        }`}
                      >
                        <AlertTriangle
                          className={`h-4 w-4 ${
                            alarm.alarm_type === "critical"
                              ? "text-red-600"
                              : alarm.alarm_type === "warning"
                              ? "text-yellow-600"
                              : "text-orange-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {location?.name || "Unknown Location"}
                        </p>
                        <p className="text-sm text-gray-600">{alarm.message}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(alarm.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No recent alarms</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
