import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export function CreateAlarmDialog({ children }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    locationId: "",
    alarmType: "warning",
    parameterName: "",
    currentValue: "",
    thresholdValue: "",
    unit: "",
    message: "",
  });

  useEffect(() => {
    if (open) {
      fetchLocations();
    }
  }, [open]);

  const fetchLocations = async () => {
    setLocations([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Alarm</DialogTitle>
          <DialogDescription>
            Manually create an alarm for testing or documentation
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="location">Location *</Label>
            <Select
              value={formData.locationId}
              onValueChange={(value) =>
                setFormData({ ...formData, locationId: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name} - {location.companies?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="alarmType">Alarm Type *</Label>
            <Select
              value={formData.alarmType}
              onValueChange={(value) =>
                setFormData({ ...formData, alarmType: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="fault">Fault</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="parameterName">Parameter Name *</Label>
            <Input
              id="parameterName"
              placeholder="e.g., pH, Turbidity, Chlorine"
              value={formData.parameterName}
              onChange={(e) =>
                setFormData({ ...formData, parameterName: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="currentValue">Current Value</Label>
              <Input
                id="currentValue"
                type="number"
                step="any"
                value={formData.currentValue}
                onChange={(e) =>
                  setFormData({ ...formData, currentValue: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thresholdValue">Threshold</Label>
              <Input
                id="thresholdValue"
                type="number"
                step="any"
                value={formData.thresholdValue}
                onChange={(e) =>
                  setFormData({ ...formData, thresholdValue: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                placeholder="mg/L, NTU"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Describe the alarm condition"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={3}
              required
            />
          </div>
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Creating..." : "Create Alarm"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
