import {
  getMockCurrentUser,
  getLocationsByCompany,
  getAlarmsByCompany,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CompanyAdminPage() {
  const user = getMockCurrentUser();
  const locations = user?.company_id
    ? getLocationsByCompany(user.company_id)
    : [];
  const alarms = user?.company_id ? getAlarmsByCompany(user.company_id) : [];

  const activeAlarms = alarms.filter((a) => a.status === "active");
  const acknowledgedAlarms = alarms.filter((a) => a.status === "acknowledged");
  const resolvedAlarms = alarms.filter((a) => a.status === "resolved");

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Company Dashboard
          </h1>
          <p className="text-gray-600">
            Manage locations, users, and monitor all alarms
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Locations
            </CardTitle>
            <MapPin className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {locations.length}
            </div>
            <p className="text-xs text-gray-500">Active monitoring sites</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Alarms
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {activeAlarms.length}
            </div>
            <p className="text-xs text-gray-500">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Acknowledged
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {acknowledgedAlarms.length}
            </div>
            <p className="text-xs text-gray-500">Being resolved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Resolved
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {resolvedAlarms.length}
            </div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Locations</CardTitle>
            <a href="/company-admin/locations">
              <Badge variant="outline" className="cursor-pointer">
                Manage All
              </Badge>
            </a>
          </CardHeader>
          <CardContent>
            {locations.length === 0 ? (
              <p className="text-center text-sm text-gray-500">
                No locations yet. Add your first location to get started.
              </p>
            ) : (
              <div className="space-y-4">
                {locations.slice(0, 5).map((location) => {
                  const locationAlarms = alarms.filter(
                    (a) =>
                      a.location_id === location.id && a.status === "active"
                  );
                  return (
                    <a
                      key={location.id}
                      href={`/company-admin/locations/${location.id}`}
                      className="block rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {location.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {location.address}
                          </p>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs text-gray-500">
                              Contact: {location.contact_person_name} •{" "}
                              {location.contact_person_email}
                            </p>
                            <p className="text-xs text-gray-500">
                              Device IP: {location.device_ip}
                            </p>
                          </div>
                        </div>
                        {locationAlarms.length > 0 && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {locationAlarms.length}
                          </Badge>
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Alarms</CardTitle>
            <a href="/company-admin/alarms">
              <Badge variant="outline" className="cursor-pointer">
                View All
              </Badge>
            </a>
          </CardHeader>
          <CardContent>
            {activeAlarms.length === 0 ? (
              <p className="text-center text-sm text-gray-500">
                No active alarms. All systems operating normally.
              </p>
            ) : (
              <div className="space-y-4">
                {activeAlarms.slice(0, 5).map((alarm) => {
                  const location = locations.find(
                    (l) => l.id === alarm.location_id
                  );
                  return (
                    <div
                      key={alarm.id}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                alarm.severity === "critical" ||
                                alarm.severity === "high"
                                  ? "destructive"
                                  : "default"
                              }
                            >
                              {alarm.severity}
                            </Badge>
                            <span className="text-sm font-medium text-gray-900">
                              {alarm.parameter_name}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            {alarm.message}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {location?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
