"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAlarms, getLocationById, getCompanyById } from "@/lib/mock-data";
import { AlertCircle, Clock, CheckCircle } from "lucide-react";

export default function AlarmsPage() {
  const alarms = mockAlarms;

  const activeAlarms = alarms.filter((a) => a.status === "active");
  const acknowledgedAlarms = alarms.filter((a) => a.status === "acknowledged");
  const resolvedAlarms = alarms.filter((a) => a.status === "resolved");

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

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Alarms</h1>
        <p className="mt-1 text-sm text-gray-600">
          Monitor alarms across all companies and locations
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

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Alarms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alarms.map((alarm) => {
              const location = getLocationById(alarm.location_id);
              const company = location
                ? getCompanyById(location.company_id)
                : null;

              return (
                <div
                  key={alarm.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={getSeverityColor(alarm.severity)}>
                          {alarm.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{alarm.alarm_type}</Badge>
                        <Badge
                          variant={
                            alarm.status === "active"
                              ? "destructive"
                              : alarm.status === "acknowledged"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {alarm.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {alarm.parameter_name}
                        </p>
                        <p className="text-sm text-gray-600">{alarm.message}</p>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <span>Company: {company?.name}</span>
                        <span>Location: {location?.name}</span>
                        <span>Value: {alarm.measured_value}</span>
                        <span>Threshold: {alarm.threshold_value}</span>
                        <span>Created: {formatDate(alarm.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
