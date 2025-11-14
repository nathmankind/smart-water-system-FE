import { useState } from "react";
// import { createClient } from "@/lib/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AlarmsTable({ alarms }) {
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();

  const getAlarmTypeColor = (type) => {
    switch (type) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "fault":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800";
      case "acknowledged":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleResolve = async (alarmId) => {
    setIsLoading(alarmId);
    // const supabase = createClient();

    // try {
    //   const {
    //     data: { user },
    //   } = await supabase.auth.getUser();

    //   const { error } = await supabase
    //     .from("alarms")
    //     .update({
    //       status: "resolved",
    //       resolved_by: user?.id,
    //       resolved_at: new Date().toISOString(),
    //     })
    //     .eq("id", alarmId);

    //   if (error) throw error;
    //   router.refresh();
    // } catch (error) {
    //   console.error("[v0] Error resolving alarm:", error);
    // } finally {
    //   setIsLoading(null);
    // }
  };

  return (
    <div className="rounded-md border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Parameter</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alarms.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500">
                No alarms found
              </TableCell>
            </TableRow>
          ) : (
            alarms.map((alarm) => (
              <TableRow key={alarm.id}>
                <TableCell>
                  <Badge className={getAlarmTypeColor(alarm.alarm_type)}>
                    {alarm.alarm_type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {alarm.locations?.name || "N/A"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {alarm.locations?.companies?.name || ""}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{alarm.parameter_name}</TableCell>
                <TableCell>
                  {alarm.current_value !== null
                    ? `${alarm.current_value} ${alarm.unit || ""}`
                    : "N/A"}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {alarm.message}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(alarm.status)}>
                    {alarm.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(alarm.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {alarm.status !== "resolved" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleResolve(alarm.id)}
                      disabled={isLoading === alarm.id}
                      className="text-green-600 hover:text-green-700"
                    >
                      <CheckCircle className="mr-1 h-4 w-4" />
                      {isLoading === alarm.id ? "Resolving..." : "Resolve"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
