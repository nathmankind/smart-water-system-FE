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
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
// import { getSensorReadingsByLocation } from "mockfile/mock-data";

export default function CompanyAdminLocationDetailPage() {
  const { id } = useParams();

  const {
    data: location,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["locationDetails", id],
    queryFn: async () => {
      const response = await apiClient.get(`/locations/${id}/details`);
      return response.data;
    },
    enabled: !!id, // Only run the query if id is available
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Loading location details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        <p>Error loading location details: {error.message}</p>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Location not found.</p>
      </div>
    );
  }

  const activeAlarms = location.alarmSummary.activeAlarms;
  const latestReading = location.alarmSummary.latestReading;

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour format (e.g., "PM")
  };
  const formatter = new Intl.DateTimeFormat("en-US", options); // 'en-US' for English (United States) locale
  // const formattedDateTime = formatter.format(now);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{location.name}</h1>
        <p className="text-gray-600">
          {`${location.address.street}, ${location.address.city}, ${location.address.province} ${location.address.postalCode}, ${location.address.country}`}
        </p>
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
                <span className="font-medium text-gray-900">Device ID:</span>
                <span className="text-gray-600 font-mono">
                  {location.deviceId}
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
                    {location.locationContact.firstName}{" "}
                    {location.locationContact.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    {location.contactInfo.phone}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    {location.contactInfo.email}
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
            Current Readings{" "}
            <span className="font-medium text-sm bg-blue-200 px-2 py-1 rounded text-blue-600">
              Last Reading:{" "}
              {formatter.format(new Date(latestReading.createdAt))}
            </span>
          </CardTitle>
        </CardHeader>
        {/* <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(latestReading).map(([param, value]) => {
              if (param === "timestamp" || param === "condition") return null;
              const config = location.configurations?.find(
                (c) => c.parameter_name.toLowerCase() === param.toLowerCase()
              );
              const isOutOfRange = config
                ? value < config.min_value || value > config.max_value
                : false;

              return (
                <div
                  key={param}
                  className={`rounded-lg border p-4 ${
                    param == "ph" && latestReading.phStatus == "INVALID"
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
                      {param.charAt(0).toUpperCase() + param.slice(1)}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`text-2xl font-bold ${
                        isOutOfRange ? "text-red-600" : "text-gray-900"
                      }`}
                    >
                      {value}
                    </span>
                    <span className="ml-1 text-sm text-gray-600">
                      {config?.unit || ""}
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
        </CardContent> */}

        <hr />

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* water quality */}

            <div className={`rounded-lg border p-4 border-gray-200 `}>
              <div className="flex items-center gap-2">
                <Droplet className={`h-4 w-4 text-blue-600 `} />
                <span className="text-sm font-bold text-gray-900">
                  Water Quality
                </span>
              </div>
              <div className="mt-2">
                <span
                  className={`text-xl font-normal capitalize text-gray-900 `}
                >
                  {latestReading.waterQuality.toLowerCase()}
                </span>
              </div>
            </div>
            {/* ph */}
            <div
              className={`rounded-lg border p-4 ${
                latestReading.phStatus == "INVALID"
                  ? "border-red-200 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Droplet
                  className={`h-4 w-4 ${
                    latestReading.phStatus == "INVALID"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                />
                <span className="text-sm font-medium text-gray-900">pH</span>
              </div>
              <div className="mt-2">
                <span
                  className={`text-2xl font-bold ${
                    latestReading.phStatus == "INVALID"
                      ? "text-red-600"
                      : "text-gray-900"
                  }`}
                >
                  {latestReading.ph}
                </span>
                <span className="ml-1 text-sm text-gray-600">pH</span>
              </div>

              <p
                className={`mt-1 text-xs text-gray-500  p-1 rounded w-fit border border-gray-200 ${
                  latestReading.phStatus == "INVALID"
                    ? "text-white bg-red-500"
                    : ""
                }`}
              >
                {latestReading.phStatus}
              </p>
            </div>

            {/* turbidity */}

            <div
              className={`rounded-lg border p-4 ${
                latestReading.turbidityStatus != "CLEAN"
                  ? "border-red-200 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Droplet
                  className={`h-4 w-4 ${
                    latestReading.turbidityStatus != "CLEAN"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                />
                <span className="text-sm font-medium text-gray-900">
                  Turbidity
                </span>
              </div>
              <div className="mt-2">
                <span
                  className={`text-2xl font-bold ${
                    latestReading.turbidityStatus != "CLEAN"
                      ? "text-red-900"
                      : "text-gray-600"
                  }`}
                >
                  {latestReading.turbidityNtu}
                </span>
                <span className="ml-1 text-sm text-gray-600">NTU</span>
              </div>

              <p
                className={`mt-1 text-xs text-gray-500  px-2 py-1 rounded w-fit border border-gray-200 ${
                  latestReading.turbidityStatus != "CLEAN"
                    ? "text-white bg-red-500"
                    : "text-white bg-green-500"
                }`}
              >
                {latestReading.turbidityStatus}
              </p>
            </div>

            {/* temperature */}
          </div>
        </CardContent>
        {/* /// sample is here */}

        {/* <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {sensorReadings.map((reading) => {
              const config = mockConfigurations.find(
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
        </CardContent> */}
      </Card>
    </div>
  );
}
