import { useState } from "react";
import { getMockCurrentUser, getUsersByCompany } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Mail, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OnboardUserDialog } from "@/components/company-admin/onboard-user-dialog";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

export default function CompanyAdminUsersPage() {
  const user = getMockCurrentUser();
  const [showOnboardDialog, setShowOnboardDialog] = useState(false);
  const users = user?.companyId ? getUsersByCompany(user.companyId) : [];

  const {
    data: locations,
    isLoading: isLoadingLocations,
    error: locationsError,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const response = await apiClient.get("/locations");
      return response.data;
    },
    enabled: !!user?.companyId, // Only fetch locations if company_id is available
  });

  const getLocationName = (locationId) => {
    if (!locationId) return "All Locations";
    if (isLoadingLocations) return "Loading...";
    if (locationsError) return "Error";
    const location = locations?.find((l) => l.id === locationId);
    return location?.name || "Unknown";
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">
            Manage location contacts and their access
          </p>
        </div>
        <Button
          onClick={() => setShowOnboardDialog(true)}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((u) => (
          <Card key={u.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{u.full_name}</CardTitle>
                  <Badge
                    variant={
                      u.role === "company_admin" ? "default" : "secondary"
                    }
                    className="mt-2"
                  >
                    {u.role === "company_admin" ? "Admin" : "Location Contact"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{u.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{getLocationName(u.location_id)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <Card>
          <CardContent className="flex min-h-[200px] items-center justify-center">
            <p className="text-gray-600">
              No users yet. Add your first location contact.
            </p>
          </CardContent>
        </Card>
      )}

      <OnboardUserDialog
        open={showOnboardDialog}
        onOpenChange={setShowOnboardDialog}
        locations={locations}
        isLoadingLocations={isLoadingLocations}
        locationsError={locationsError}
      />
    </div>
  );
}
