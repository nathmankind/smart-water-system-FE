import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { redirect } from "next/navigation";

export default function LocationsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
        <p className="mt-1 text-sm text-gray-600">
          View and monitor your water quality locations
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {locations && locations.length > 0 ? (
          locations.map((location) => (
            <a key={location.id} href={`/dashboard/locations/${location.id}`}>
              <Card className="border-gray-200 transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {location.address && (
                    <p className="text-sm text-gray-600">{location.address}</p>
                  )}
                  {(location.city || location.state) && (
                    <p className="text-sm text-gray-600">
                      {location.city && location.state
                        ? `${location.city}, ${location.state}`
                        : location.city || location.state}
                    </p>
                  )}
                  {location.description && (
                    <p className="text-sm text-gray-500">
                      {location.description}
                    </p>
                  )}
                  <div className="pt-2">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        location.status === "active"
                          ? "bg-green-100 text-green-800"
                          : location.status === "maintenance"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {location.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))
        ) : (
          <Card className="border-gray-200">
            <CardContent className="py-8 text-center">
              <p className="text-sm text-gray-500">No locations found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
