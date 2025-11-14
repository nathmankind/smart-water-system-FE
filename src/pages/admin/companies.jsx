import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Mail, Phone, MapPin } from "lucide-react";
import { OnboardCompanyDialog } from "@/components/admin/onboard-company-dialog";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

export default function CompaniesPage() {
  const [showOnboardDialog, setShowOnboardDialog] = useState(false);

  const {
    data: companies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await apiClient.get("/companies");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Loading companies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        <p>Error loading companies: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
          <p className="mt-1 text-sm text-gray-600">
            Onboard and manage companies
          </p>
        </div>
        <Button
          onClick={() => setShowOnboardDialog(true)}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Onboard Company
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {companies.map((company) => {
          return (
            <Card key={company.id} className="border-gray-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{company.name}</CardTitle>
                      <p className="text-sm text-gray-500">
                        {company.locations.length} locations
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{company.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{company.contactPhone}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>
                    {`${company.address}, ${company.city}, ${company.province} ${company.postalCode}, ${company.country}`}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <OnboardCompanyDialog
        open={showOnboardDialog}
        onOpenChange={setShowOnboardDialog}
      />
    </div>
  );
}
