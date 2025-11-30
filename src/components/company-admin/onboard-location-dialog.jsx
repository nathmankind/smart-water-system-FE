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
import { getMockCurrentUser } from "@/lib/mock-data";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

export function OnboardLocationDialog({ open, onOpenChange }) {
  const user = getMockCurrentUser();
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    device_id: "",
    contact_person_first_name: "",
    contact_person_last_name: "",
    contact_person_email: "",
    contact_person_phone: "",
  });

  const {
    mutate: onboardLocation,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (locationData) => {
      console.log("mutattion about to start");
      const response = await apiClient.post("/locations", locationData);
      return response.data;
    },
    onSuccess: () => {
      onOpenChange(false);
      window.location.reload();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("button clicked", user);
    if (!user?.companyId) return;

    const locationData = {
      name: formData.name,
      contactEmail: formData.contact_person_email,
      contactPhone: formData.contact_person_phone,
      deviceId: formData.device_id,
      address: formData.street,
      city: formData.city,
      country: formData.country,
      province: formData.province,
      postalCode: formData.postalCode,
      companyId: user.companyId,
      locationContact: {
        firstName: formData.contact_person_first_name,
        lastName: formData.contact_person_last_name,
      },
    };

    if (user.email === formData.contact_person_email) {
      setFormError(
        `Contact person email cannot be the same as your email - ${user.email}`
      );
      return;
    }

    onboardLocation(locationData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Onboard New Location</DialogTitle>
          <DialogDescription>
            Add a monitoring location with device and contact person information
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Location Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Main Treatment Plant"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
                placeholder="123 Main St"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  placeholder="Toronto"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Province *</Label>
                <Input
                  id="province"
                  value={formData.province}
                  onChange={(e) =>
                    setFormData({ ...formData, province: e.target.value })
                  }
                  placeholder="ON"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                  placeholder="M5V 3A8"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  placeholder="Canada"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="device_id">Device ID *</Label>
              <Input
                id="device_id"
                value={formData.device_id}
                onChange={(e) =>
                  setFormData({ ...formData, device_id: e.target.value })
                }
                placeholder="DEV-001"
                required
              />
            </div>

            <div className="border-t pt-4 space-y-4">
              <h3 className="mb-4 text-sm font-medium">
                Contact Person (Will be created as user)
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact_person_first_name">
                    First Name *
                  </Label>
                  <Input
                    id="contact_person_first_name"
                    value={formData.contact_person_first_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact_person_first_name: e.target.value,
                      })
                    }
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_person_last_name">Last Name *</Label>
                  <Input
                    id="contact_person_last_name"
                    value={formData.contact_person_last_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact_person_last_name: e.target.value,
                      })
                    }
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_person_email">Email *</Label>
                <Input
                  id="contact_person_email"
                  type="email"
                  value={formData.contact_person_email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact_person_email: e.target.value,
                    })
                  }
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_person_phone">Phone *</Label>
                <Input
                  id="contact_person_phone"
                  type="tel"
                  value={formData.contact_person_phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact_person_phone: e.target.value,
                    })
                  }
                  placeholder="+1-555-0100"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {!!formError && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                {formError}
              </div>
            )}
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                {error.response.data?.message}
              </div>
            )}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={isPending}
              >
                {isPending ? "Onboarding..." : "Onboard Location"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
