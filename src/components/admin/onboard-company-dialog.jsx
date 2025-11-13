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
import { addCompany, addUser } from "@/lib/mock-data";

export function OnboardCompanyDialog({ open, onOpenChange }) {
  const [formData, setFormData] = useState({
    company_name: "",
    company_email: "",
    company_phone: "",
    company_street: "",
    company_city: "",
    company_province: "",
    company_postal_code: "",
    admin_first_name: "",
    admin_last_name: "",
    admin_email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCompany = addCompany({
      name: formData.company_name,
      contact_email: formData.company_email,
      contact_phone: formData.company_phone,
      address: {
        street: formData.company_street,
        city: formData.company_city,
        province: formData.company_province,
        postal_code: formData.company_postal_code,
      },
    });

    // Add company admin user
    addUser({
      email: formData.admin_email,
      role: "company_admin",
      full_name: `${formData.admin_first_name} ${formData.admin_last_name}`,
      company_id: newCompany.id,
      location_id: null,
    });

    setFormData({
      company_name: "",
      company_email: "",
      company_phone: "",
      company_street: "",
      company_city: "",
      company_province: "",
      company_postal_code: "",
      admin_first_name: "",
      admin_last_name: "",
      admin_email: "",
    });

    onOpenChange(false);
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Onboard New Company</DialogTitle>
          <DialogDescription>
            Register a new company and create their admin account
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="mb-4 text-sm font-medium">Company Information</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name *</Label>
                  <Input
                    id="company_name"
                    value={formData.company_name}
                    onChange={(e) =>
                      setFormData({ ...formData, company_name: e.target.value })
                    }
                    placeholder="Water Treatment Corp"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_email">Company Email *</Label>
                  <Input
                    id="company_email"
                    type="email"
                    value={formData.company_email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        company_email: e.target.value,
                      })
                    }
                    placeholder="contact@company.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_phone">Company Phone *</Label>
                  <Input
                    id="company_phone"
                    type="tel"
                    value={formData.company_phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        company_phone: e.target.value,
                      })
                    }
                    placeholder="+1-555-0100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_street">Street Address *</Label>
                  <Input
                    id="company_street"
                    value={formData.company_street}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        company_street: e.target.value,
                      })
                    }
                    placeholder="123 Main St"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="company_city">City *</Label>
                    <Input
                      id="company_city"
                      value={formData.company_city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          company_city: e.target.value,
                        })
                      }
                      placeholder="Toronto"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_province">Province *</Label>
                    <Input
                      id="company_province"
                      value={formData.company_province}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          company_province: e.target.value,
                        })
                      }
                      placeholder="Ontario"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_postal_code">Postal Code *</Label>
                    <Input
                      id="company_postal_code"
                      value={formData.company_postal_code}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          company_postal_code: e.target.value,
                        })
                      }
                      placeholder="M5V 2T6"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <h3 className="mb-4 text-sm font-medium">
                Company Admin Account
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="admin_first_name">Admin First Name *</Label>
                  <Input
                    id="admin_first_name"
                    value={formData.admin_first_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        admin_first_name: e.target.value,
                      })
                    }
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin_last_name">Admin Last Name *</Label>
                  <Input
                    id="admin_last_name"
                    value={formData.admin_last_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        admin_last_name: e.target.value,
                      })
                    }
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin_email">Admin Email *</Label>
                  <Input
                    id="admin_email"
                    type="email"
                    value={formData.admin_email}
                    onChange={(e) =>
                      setFormData({ ...formData, admin_email: e.target.value })
                    }
                    placeholder="john@company.com"
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
              Onboard Company
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
