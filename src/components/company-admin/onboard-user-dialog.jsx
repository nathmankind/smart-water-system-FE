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
import {
  getMockCurrentUser,
  addUser,
  getLocationsByCompany,
} from "@/lib/mock-data";

export function OnboardUserDialog({ open, onOpenChange }) {
  const user = getMockCurrentUser();

  const locations = user?.company_id
    ? getLocationsByCompany(user.company_id)
    : [];

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    location_id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.company_id) return;

    addUser({
      email: formData.email,
      role: "location_contact",
      full_name: formData.full_name,
      company_id: user.company_id,
      location_id: formData.location_id || null,
    });

    setFormData({
      full_name: "",
      email: "",
      password: "",
      location_id: "",
    });

    onOpenChange(false);
    window.location.reload();
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
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                placeholder="John Doe"
                required
              />
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
              <Label htmlFor="password">Temporary Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter temporary password"
                required
              />
              <p className="text-xs text-gray-500">
                User will be prompted to change on first login
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Assign to Location *</Label>
              <Select
                value={formData.location_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, location_id: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {locations.length === 0 && (
                <p className="text-xs text-amber-600">
                  Please add at least one location first
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={locations.length === 0}
            >
              Create User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
