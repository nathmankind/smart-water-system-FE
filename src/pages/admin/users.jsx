import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserOnboardingDialog } from "@/components/admin/user-onboarding-dialog";
import { UsersTable } from "@/components/admin/users-table";

export default function UsersPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage user accounts and permissions
          </p>
        </div>
        <UserOnboardingDialog>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Onboard User
          </Button>
        </UserOnboardingDialog>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <UsersTable users={[]} />
        </CardContent>
      </Card>
    </div>
  );
}
