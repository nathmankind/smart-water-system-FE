import { useState } from "react";
import {
  getMockCurrentUser,
  getLocationsByCompany,
  getAlarmsByLocation,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, AlertTriangle, Network, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OnboardLocationDialog } from "@/components/company-admin/onboard-location-dialog";

export default function CompanyAdminLocationsPage() {
  const user = getMockCurrentUser();
  const [showOnboardDialog, setShowOnboardDialog] = useState(false);
  const locations = user?.company_id
    ? getLocationsByCompany(user.company_id)
    : [];

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
          <p className="text-gray-600">
            Manage all monitoring locations for your company
          </p>
        </div>
        <Button
          onClick={() => setShowOnboardDialog(true)}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Location
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {locations.map((location) => {
          const alarms = getAlarmsByLocation(location.id);
          const activeAlarms = alarms.filter((a) => a.status === "active");

          return (
            <Card key={location.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{location.name}</CardTitle>
                    <p className="text-sm text-gray-600">{location.address}</p>
                  </div>
                  {activeAlarms.length > 0 && (
                    <Badge variant="destructive" className="gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {activeAlarms.length}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-900">
                    Device Information
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Network className="h-4 w-4" />
                    <span>IP: {location.device_ip}</span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-900">
                    Contact Person
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">
                        {location.contact_person_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{location.contact_person_phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{location.contact_person_email}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`/company-admin/locations/${location.id}`}
                  className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  View Details
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <OnboardLocationDialog
        open={showOnboardDialog}
        onOpenChange={setShowOnboardDialog}
      />
    </div>
  );
}
