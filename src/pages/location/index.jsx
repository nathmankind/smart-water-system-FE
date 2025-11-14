import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getMockCurrentUser,
  getLocationById,
  getSensorReadingsByLocation,
  getAlarmsByLocation,
  getConfigurationsByLocation,
  getCompanyById,
} from "@/lib/mock-data";
import {
  AlertCircle,
  CheckCircle,
  Droplets,
  Gauge,
  MapPin,
  ThermometerIcon,
  Building2,
  Network,
} from "lucide-react";

export default function LocationDashboard() {
  const user = getMockCurrentUser();
  const location = user?.location_id ? getLocationById(user.location_id) : null;
  const company = user?.company_id ? getCompanyById(user.company_id) : null;
  const sensorReadings = location
    ? getSensorReadingsByLocation(location.id)
    : [];
  const alarms = location ? getAlarmsByLocation(location.id) : [];
  const configurations = location
    ? getConfigurationsByLocation(location.id)
    : [];

  const activeAlarms = alarms.filter((a) => a.status === "active");
  const criticalAlarms = activeAlarms.filter(
    (a) => a.severity === "critical" || a.severity === "high"
  );

  if (!location) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">No location assigned</p>
      </div>
    );
  }

  const getParameterIcon = (param) => {
    if (param.toLowerCase().includes("ph")) return Droplets;
    if (param.toLowerCase().includes("temp")) return ThermometerIcon;
    return Gauge;
  };

  const getParameterStatus = (reading) => {
    const config = configurations.find(
      (c) => c.parameter_name === reading.parameter_name
    );
    if (!config) return "unknown";

    if (reading.value < config.min_value || reading.value > config.max_value) {
      return "critical";
    }

    const range = config.max_value - config.min_value;
    const warningThreshold = range * 0.1;

    if (
      reading.value < config.min_value + warningThreshold ||
      reading.value > config.max_value - warningThreshold
    ) {
      return "warning";
    }

    return "normal";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{location.name}</h1>
        <p className="text-gray-600">Real-time water quality monitoring</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Location & Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Company:</span>
                <span className="text-gray-600">{company?.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Address:</span>
                <span className="text-gray-600">{location.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Network className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Device IP:</span>
                <span className="text-gray-600">{location.device_ip}</span>
              </div>
            </div>
            {company && (
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="font-medium">Company Contact:</span>
                  <p className="text-gray-600">{company.contact_email}</p>
                  <p className="text-gray-600">{company.contact_phone}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alarms</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAlarms.length}</div>
            <p className="text-xs text-gray-600">
              {criticalAlarms.length} critical
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Parameters Monitored
            </CardTitle>
            <Gauge className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorReadings.length}</div>
            <p className="text-xs text-gray-600">Real-time sensors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {criticalAlarms.length === 0 ? "Normal" : "Alert"}
            </div>
            <p className="text-xs text-gray-600">All systems operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Location</CardTitle>
            <MapPin className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{location.name}</div>
            <p className="text-xs text-gray-600">{location.address}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Water Quality Parameters</CardTitle>
          <CardDescription>
            Real-time sensor readings and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sensorReadings.map((reading) => {
              const Icon = getParameterIcon(reading.parameter_name);
              const status = getParameterStatus(reading);
              const config = configurations.find(
                (c) => c.parameter_name === reading.parameter_name
              );

              return (
                <Card key={reading.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {reading.parameter_name}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      <div className="text-2xl font-bold">
                        {reading.value.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {reading.unit}
                      </div>
                    </div>
                    {config && (
                      <p className="mt-1 text-xs text-gray-600">
                        Range: {config.min_value} - {config.max_value}{" "}
                        {config.unit}
                      </p>
                    )}
                    <Badge
                      className="mt-2"
                      variant={
                        status === "critical"
                          ? "destructive"
                          : status === "warning"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {status === "critical"
                        ? "Critical"
                        : status === "warning"
                        ? "Warning"
                        : "Normal"}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {activeAlarms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Active Alarms
            </CardTitle>
            <CardDescription>Immediate attention required</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeAlarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className="rounded-lg border border-red-200 bg-red-50 p-4"
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
                          {alarm.severity.toUpperCase()}
                        </Badge>
                        <span className="font-medium text-gray-900">
                          {alarm.parameter_name}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-700">
                        {alarm.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-600">
                        Measured: {alarm.measured_value} | Threshold:{" "}
                        {alarm.threshold_value}
                      </p>
                    </div>
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
