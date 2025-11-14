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
    address: "",
    latitude: "",
    longitude: "",
    device_ip: "",
    contact_person_name: "",
    contact_person_email: "",
    contact_person_phone: "",
    contact_person_password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.company_id) return;

    const newLocation = addLocation({
      company_id: user.company_id,
      name: formData.name,
      address: formData.address,
      latitude: Number.parseFloat(formData.latitude) || 0,
      longitude: Number.parseFloat(formData.longitude) || 0,
      device_ip: formData.device_ip,
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
      address: "",
      latitude: "",
      longitude: "",
      device_ip: "",
      contact_person_name: "",
      contact_person_email: "",
      contact_person_phone: "",
      contact_person_password: "",
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
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="123 Water Street, City, State ZIP"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) =>
                    setFormData({ ...formData, latitude: e.target.value })
                  }
                  placeholder="39.7817"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) =>
                    setFormData({ ...formData, longitude: e.target.value })
                  }
                  placeholder="-89.6501"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="device_ip">Device IP Address *</Label>
              <Input
                id="device_ip"
                value={formData.device_ip}
                onChange={(e) =>
                  setFormData({ ...formData, device_ip: e.target.value })
                }
                placeholder="192.168.1.100"
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

                <div className="space-y-2">
                  <Label htmlFor="contact_person_password">
                    Temporary Password *
                  </Label>
                  <Input
                    id="contact_person_password"
                    type="password"
                    value={formData.contact_person_password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact_person_password: e.target.value,
                      })
                    }
                    placeholder="••••••••"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Contact will use this to login
                  </p>
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
