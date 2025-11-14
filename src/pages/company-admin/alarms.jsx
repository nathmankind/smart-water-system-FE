import { useState } from "react";
import {
  getMockCurrentUser,
  getAlarmsByCompany,
  getLocationById,
  mockAlarms,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";

export default function CompanyAdminAlarmsPage() {
  const user = getMockCurrentUser();
  const [alarms, setAlarms] = useState(
    user.company_id ? getAlarmsByCompany(user.company_id) : []
  );
  const [filter, setFilter] = useState("all");

  const filteredAlarms = alarms.filter((alarm) => {
    if (filter === "all") return true;
    return alarm.status === filter;
  });

  const handleAcknowledge = (alarmId) => {
    const alarmIndex = mockAlarms.findIndex((a) => a.id === alarmId);
    if (alarmIndex !== -1) {
      mockAlarms[alarmIndex].status = "acknowledged";
      mockAlarms[alarmIndex].acknowledged_at = new Date().toISOString();
      mockAlarms[alarmIndex].acknowledged_by = user.id;
      setAlarms([
        ...mockAlarms.filter(
          (a) =>
            user.company_id &&
            getLocationById(a.location_id)?.company_id === user.company_id
        ),
      ]);
    }
  };

  const handleResolve = (alarmId) => {
    const alarmIndex = mockAlarms.findIndex((a) => a.id === alarmId);
    if (alarmIndex !== -1) {
      mockAlarms[alarmIndex].status = "resolved";
      mockAlarms[alarmIndex].resolved_at = new Date().toISOString();
      mockAlarms[alarmIndex].resolved_by = user.id;
      setAlarms([
        ...mockAlarms.filter(
          (a) =>
            user.company_id &&
            getLocationById(a.location_id)?.company_id === user.company_id
        ),
      ]);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Alarm Management</h1>
        <p className="text-gray-600">
          Monitor and resolve alarms across all locations
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-blue-600" : ""}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          onClick={() => setFilter("active")}
          className={filter === "active" ? "bg-blue-600" : ""}
        >
          Active
        </Button>
        <Button
          variant={filter === "acknowledged" ? "default" : "outline"}
          onClick={() => setFilter("acknowledged")}
          className={filter === "acknowledged" ? "bg-blue-600" : ""}
        >
          Acknowledged
        </Button>
        <Button
          variant={filter === "resolved" ? "default" : "outline"}
          onClick={() => setFilter("resolved")}
          className={filter === "resolved" ? "bg-blue-600" : ""}
        >
          Resolved
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alarms ({filteredAlarms.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlarms.map((alarm) => {
              const location = getLocationById(alarm.location_id);
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
                            alarm.status === "active"
                              ? "destructive"
                              : alarm.status === "acknowledged"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {alarm.status}
                        </Badge>
                        <Badge variant="outline">{alarm.severity}</Badge>
                        <span className="text-sm font-medium text-gray-900">
                          {alarm.parameter_name}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-900">
                        {alarm.message}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
                        <span>Location: {location?.name}</span>
                        <span>Value: {alarm.measured_value}</span>
                        <span>Threshold: {alarm.threshold_value}</span>
                        <span>
                          Created: {new Date(alarm.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {alarm.status === "active" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAcknowledge(alarm.id)}
                          className="gap-1"
                        >
                          <Clock className="h-3 w-3" />
                          Acknowledge
                        </Button>
                      )}
                      {(alarm.status === "active" ||
                        alarm.status === "acknowledged") && (
                        <Button
                          size="sm"
                          onClick={() => handleResolve(alarm.id)}
                          className="gap-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3" />
                          Resolve
                        </Button>
                      )}
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
