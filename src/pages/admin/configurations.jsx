import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ConfigurationDialog } from "@/components/admin/configuration-dialog";
import { ConfigurationsTable } from "@/components/admin/configurations-table";

export default async function ConfigurationsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurations</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage water quality parameters and thresholds
          </p>
        </div>
        <ConfigurationDialog>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Configuration
          </Button>
        </ConfigurationDialog>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Configurations</CardTitle>
        </CardHeader>
        <CardContent>
          <ConfigurationsTable configurations={[]} />
        </CardContent>
      </Card>
    </div>
  );
}
