import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Settings, Activity } from "lucide-react";

export default function LocationDetailPage({ params }) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
            <MapPin className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {location.name}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {location.city && location.state
                ? `${location.city}, ${location.state}`
                : "Location details"}
            </p>
          </div>
        </div>
        <Badge
          className={
            location.status === "active"
              ? "bg-green-100 text-green-800"
              : location.status === "maintenance"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }
        >
          {location.status}
        </Badge>
      </div>

      {location.description && (
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">{location.description}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-600" />
              <CardTitle>Configurations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {configurations && configurations.length > 0 ? (
              <div className="space-y-3">
                {configurations.map((config) => (
                  <div
                    key={config.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {config.parameter_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Target: {config.parameter_value} {config.unit || ""}
                      </p>
                      {config.min_threshold !== null &&
                        config.max_threshold !== null && (
                          <p className="text-xs text-gray-500">
                            Range: {config.min_threshold} -{" "}
                            {config.max_threshold} {config.unit || ""}
                          </p>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No configurations set</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-gray-600" />
              <CardTitle>Recent Readings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {recentReadings && recentReadings.length > 0 ? (
              <div className="space-y-3">
                {recentReadings.map((reading) => (
                  <div
                    key={reading.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {reading.parameter_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(reading.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {reading.value} {reading.unit}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No recent readings</p>
            )}
          </CardContent>
        </Card>
      </div>

      {activeAlarms && activeAlarms.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900">Active Alarms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeAlarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className="rounded-lg border border-red-200 bg-white p-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {alarm.parameter_name}
                      </p>
                      <p className="text-sm text-gray-600">{alarm.message}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(alarm.created_at).toLocaleString()}
                      </p>
                    </div>
                    <Badge
                      className={
                        alarm.alarm_type === "critical"
                          ? "bg-red-100 text-red-800"
                          : alarm.alarm_type === "warning"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-orange-100 text-orange-800"
                      }
                    >
                      {alarm.alarm_type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
