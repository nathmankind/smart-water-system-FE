import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Mail, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OnboardUserDialog } from "@/components/company-admin/onboard-user-dialog";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

export default function CompanyAdminUsersPage() {
  const [showOnboardDialog, setShowOnboardDialog] = useState(false);

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
  });

  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["companyUsers", locations],
    queryFn: async () => {
      if (!locations) return [];

      const userPromises = locations.map((location) =>
        apiClient.get(`/locations/${location.id}`)
      );

      const locationDetailsResponses = await Promise.all(userPromises);

      const allUsers = locationDetailsResponses.flatMap(
        (response) => response.data.users
      );

      const uniqueUsers = allUsers.reduce((acc, current) => {
        if (!acc.find((item) => item.id === current.id)) {
          acc.push(current);
        }
        return acc;
      }, []);

      return uniqueUsers;
    },
    enabled: !!locations,
  });

  const getLocationName = (locationId) => {
    if (!locationId) return "All Locations";
    if (isLoadingLocations) return "Loading...";
    if (locationsError) return "Error";
    const location = locations?.find((l) => l.id === locationId);
    return location?.name || "Unknown";
  };

  const isLoading = isLoadingLocations || isLoadingUsers;
  const error = locationsError || usersError;

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

      {isLoading && (
        <Card>
          <CardContent className="flex min-h-[200px] items-center justify-center">
            <p className="text-gray-600">Loading users...</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card>
          <CardContent className="flex min-h-[200px] items-center justify-center">
            <p className="text-red-600">Error loading users: {error.message}</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users?.map((u) => (
              <Card key={u.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {u.firstName} {u.lastName}
                      </CardTitle>
                      <Badge
                        variant={
                          u.role === "company_admin" ? "default" : "secondary"
                        }
                        className="mt-2"
                      >
                        {u.role === "company_admin"
                          ? "Admin"
                          : "Location Contact"}
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
                    <span>{getLocationName(u.locationId)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge
                      variant={u.mustChangePassword ? "destructive" : "default"}
                      className="mt-2"
                    >
                      {u.mustChangePassword ? "Password Change Required" : "Access Granted"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {users?.length === 0 && (
            <Card>
              <CardContent className="flex min-h-[200px] items-center justify-center">
                <p className="text-gray-600">
                  No users yet. Add your first location contact.
                </p>
              </CardContent>
            </Card>
          )}
        </>
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
