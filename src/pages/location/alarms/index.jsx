import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getMockCurrentUser,
  getLocationById,
  getAlarmsByLocation,
} from "@/lib/mock-data";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

export default function LocationAlarmsPage() {
  const user = getMockCurrentUser();
  const location = user?.location_id ? getLocationById(user.location_id) : null;
  const [alarms, setAlarms] = useState(
    location ? getAlarmsByLocation(location.id) : []
  );

  if (!location) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">No location assigned</p>
      </div>
    );
  }

  const activeAlarms = alarms.filter((a) => a.status === "active");
  const acknowledgedAlarms = alarms.filter((a) => a.status === "acknowledged");
  const resolvedAlarms = alarms.filter((a) => a.status === "resolved");

  const handleAcknowledge = (alarmId) => {
    setAlarms(
      alarms.map((alarm) =>
        alarm.id === alarmId
          ? {
              ...alarm,
              status: "acknowledged",
              acknowledged_at: new Date().toISOString(),
              acknowledged_by: user?.id || null,
            }
          : alarm
      )
    );
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const renderAlarmCard = (alarm, showActions) => (
    <Card key={alarm.id}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Badge variant={getSeverityColor(alarm.severity)}>
                {alarm.severity.toUpperCase()}
              </Badge>
              <Badge variant="outline">{alarm.alarm_type}</Badge>
            </div>
            <CardTitle className="mt-2">{alarm.parameter_name}</CardTitle>
            <CardDescription className="mt-1">{alarm.message}</CardDescription>
          </div>
          {alarm.status === "active" && (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
          {alarm.status === "acknowledged" && (
            <Clock className="h-5 w-5 text-yellow-600" />
          )}
          {alarm.status === "resolved" && (
            <CheckCircle className="h-5 w-5 text-green-600" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Measured Value:</span>
            <span className="font-medium">{alarm.measured_value}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Threshold:</span>
            <span className="font-medium">{alarm.threshold_value}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Created:</span>
            <span className="font-medium">{formatDate(alarm.created_at)}</span>
          </div>
          {alarm.acknowledged_at && (
            <div className="flex justify-between">
              <span className="text-gray-600">Acknowledged:</span>
              <span className="font-medium">
                {formatDate(alarm.acknowledged_at)}
              </span>
            </div>
          )}
          {alarm.resolved_at && (
            <div className="flex justify-between">
              <span className="text-gray-600">Resolved:</span>
              <span className="font-medium">
                {formatDate(alarm.resolved_at)}
              </span>
            </div>
          )}
        </div>
        {showActions && alarm.status === "active" && (
          <Button
            onClick={() => handleAcknowledge(alarm.id)}
            className="mt-4 w-full"
            variant="outline"
          >
            Acknowledge Alarm
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Alarm Management</h1>
        <p className="text-gray-600">
          View and manage alarms for {location.name}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alarms</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAlarms.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {acknowledgedAlarms.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedAlarms.length}</div>
          </CardContent>
        </Card>
      </div>

      {activeAlarms.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Active Alarms</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {activeAlarms.map((alarm) => renderAlarmCard(alarm, true))}
          </div>
        </div>
      )}

      {acknowledgedAlarms.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Acknowledged Alarms
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {acknowledgedAlarms.map((alarm) => renderAlarmCard(alarm, false))}
          </div>
        </div>
      )}

      {resolvedAlarms.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Resolved Alarms
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {resolvedAlarms.map((alarm) => renderAlarmCard(alarm, false))}
          </div>
        </div>
      )}

      {alarms.length === 0 && (
        <Card>
          <CardContent className="flex min-h-[200px] items-center justify-center">
            <p className="text-gray-600">No alarms found for this location</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
