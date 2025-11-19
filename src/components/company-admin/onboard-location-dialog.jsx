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
import { getMockCurrentUser, addLocation, addUser } from "@/lib/mock-data";

export function OnboardLocationDialog({ open, onOpenChange }) {
  const user = getMockCurrentUser();

  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    device_id: "",
    contact_person_name: "",
    contact_person_email: "",
    contact_person_phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.company_id) return;

    const newLocation = addLocation({
      company_id: user.company_id,
      name: formData.name,
      address: {
        street: formData.street,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      device_id: formData.device_id,
      contact_person_name: formData.contact_person_name,
      contact_person_email: formData.contact_person_email,
      contact_person_phone: formData.contact_person_phone,
    });

    // Add location contact user
    addUser({
      email: formData.contact_person_email,
      role: "location_contact",
      full_name: formData.contact_person_name,
      company_id: user.company_id,
      location_id: newLocation.id,
    });

    setFormData({
      name: "",
      street: "",
      city: "",
      province: "",
      postalCode: "",
      country: "",
      device_id: "",
      contact_person_name: "",
      contact_person_email: "",
      contact_person_phone: "",
    });

    onOpenChange(false);
    window.location.reload();
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

            <div className="border-t pt-4">
              <h3 className="mb-4 text-sm font-medium">
                Contact Person (Will be created as user)
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_person_name">Full Name *</Label>
                  <Input
                    id="contact_person_name"
                    value={formData.contact_person_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact_person_name: e.target.value,
                      })
                    }
                    placeholder="John Doe"
                    required
                  />
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
            >
              Onboard Location
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
