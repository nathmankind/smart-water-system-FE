import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LocationDialog } from "@/components/admin/location-dialog";
import { LocationsTable } from "@/components/admin/locations-table";

export default function LocationsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage monitoring locations
          </p>
        </div>
        <LocationDialog>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Button>
        </LocationDialog>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <LocationsTable locations={[]} />
        </CardContent>
      </Card>
    </div>
  );
}
