import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMockCurrentUser } from "@/lib/mock-data";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

export function OnboardUserDialog({
  open,
  onOpenChange,
  locations,
  isLoadingLocations,
  locationsError,
}) {
  const user = getMockCurrentUser();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    location_id: "",
  });

  const {
    mutate: onboardUser,
    isPending: isCreatingUser,
    error: createUserError,
  } = useMutation({
    mutationFn: async (userData) => {
      const response = await apiClient.post("/users", userData);
      return response.data;
    },
    onSuccess: () => {
      onOpenChange(false);
      window.location.reload();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.companyId) return;

    const userData = {
      firstName: formData.first_name,
      lastName: formData.last_name,
      email: formData.email,
      role: "location_contact", // Assuming all users onboarded here are location contacts
      companyId: user.companyId,
      locationId: formData.location_id || null,
    };

    onboardUser(userData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new location contact account and assign them to a location
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Assign to Location *</Label>
              {isLoadingLocations ? (
                <p className="text-sm text-gray-500">Loading locations...</p>
              ) : locationsError ? (
                <p className="text-sm text-red-500">
                  Error loading locations: {locationsError.message}
                </p>
              ) : (
                <Select
                  value={formData.location_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, location_id: value })
                  }
                  disabled={!locations || locations.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations?.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {locations?.length === 0 && !isLoadingLocations && (
                <p className="text-xs text-amber-600">
                  Please add at least one location first
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {createUserError && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                {createUserError.message}
              </div>
            )}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
                disabled={isCreatingUser}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={
                  isCreatingUser ||
                  isLoadingLocations ||
                  locationsError ||
                  !locations ||
                  locations.length === 0
                }
              >
                {isCreatingUser ? "Creating User..." : "Create User"}
              </Button>
            </div>
          </div>
        </form>{" "}
      </DialogContent>
    </Dialog>
  );
}
