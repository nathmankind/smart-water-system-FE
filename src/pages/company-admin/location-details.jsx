import {
  getMockCurrentUser,
  getLocationById,
  getConfigurationsByLocation,
  getSensorReadingsByLocation,
  getAlarmsByLocation,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Droplet,
  Activity,
  Phone,
  Mail,
  Network,
} from "lucide-react";
import { useParams } from "react-router-dom";

export default function CompanyAdminLocationDetailPage() {
  const user = getMockCurrentUser();
  const { id } = useParams();
  const location = getLocationById(id);

  const configurations = getConfigurationsByLocation(id);
  const sensorReadings = getSensorReadingsByLocation(id);
  const alarms = getAlarmsByLocation(id);
  const activeAlarms = alarms.filter((a) => a.status === "active");

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{location.name}</h1>
        <p className="text-gray-600">{location.address}</p>
      </div>

      {activeAlarms.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900">
              <AlertTriangle className="h-5 w-5" />
              Active Alarms ({activeAlarms.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activeAlarms.map((alarm) => (
                <div key={alarm.id} className="rounded-lg bg-white p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {alarm.parameter_name}
                      </p>
                      <p className="text-sm text-gray-600">{alarm.message}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Value: {alarm.measured_value} (Threshold:{" "}
                        {alarm.threshold_value})
                      </p>
                    </div>
                    <Badge variant="destructive">{alarm.severity}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Location & Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Device Information
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <Network className="h-4 w-4 text-gray-400" />
                <span className="font-medium text-gray-900">Device IP:</span>
                <span className="text-gray-600 font-mono">
                  {location.device_ip}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Contact Person
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-900">Name:</span>
                  <span className="text-gray-600">
                    {location.contact_person_name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    {location.contact_person_phone}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    {location.contact_person_email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Current Readings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {sensorReadings.map((reading) => {
              const config = configurations.find(
                (c) => c.parameter_name === reading.parameter_name
              );
              const isOutOfRange = config
                ? reading.value < config.min_value ||
                  reading.value > config.max_value
                : false;

              return (
                <div
                  key={reading.id}
                  className={`rounded-lg border p-4 ${
                    isOutOfRange
                      ? "border-red-200 bg-red-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Droplet
                      className={`h-4 w-4 ${
                        isOutOfRange ? "text-red-600" : "text-blue-600"
                      }`}
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {reading.parameter_name}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`text-2xl font-bold ${
                        isOutOfRange ? "text-red-600" : "text-gray-900"
                      }`}
                    >
                      {reading.value}
                    </span>
                    <span className="ml-1 text-sm text-gray-600">
                      {reading.unit}
                    </span>
                  </div>
                  {config && (
                    <p className="mt-1 text-xs text-gray-500">
                      Range: {config.min_value} - {config.max_value}{" "}
                      {config.unit}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
