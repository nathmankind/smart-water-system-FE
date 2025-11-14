// Mock current user (can switch between superadmin and regular user)

export const mockUsers = [
  {
    id: "superadmin-1",
    email: "admin@waterquality.com",
    role: "superadmin",
    full_name: "System Administrator",
    company_id: null,
  },
  {
    id: "user-1",
    email: "john@citywater.com",
    role: "user",
    full_name: "John Smith",
    company_id: "company-1",
  },
  {
    id: "user-2",
    email: "sarah@greentech.com",
    role: "user",
    full_name: "Sarah Johnson",
    company_id: "company-2",
  },
];

export const mockCompanies = [
  {
    id: "company-1",
    name: "City Water Authority",
    contact_email: "contact@citywater.com",
    contact_phone: "+1-555-0100",
    address: "123 Water Street, Springfield, IL 62701",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "company-2",
    name: "GreenTech Industries",
    contact_email: "info@greentech.com",
    contact_phone: "+1-555-0200",
    address: "456 Industrial Ave, Chicago, IL 60601",
    created_at: "2024-02-01T10:00:00Z",
  },
  {
    id: "company-3",
    name: "AquaPure Solutions",
    contact_email: "support@aquapure.com",
    contact_phone: "+1-555-0300",
    address: "789 Clean Water Blvd, Milwaukee, WI 53202",
    created_at: "2024-02-15T10:00:00Z",
  },
];

export const mockLocations = [
  {
    id: "location-1",
    company_id: "company-1",
    name: "Main Treatment Plant",
    address: "100 Treatment Road, Springfield, IL 62701",
    latitude: 39.7817,
    longitude: -89.6501,
    created_at: "2024-01-20T10:00:00Z",
  },
  {
    id: "location-2",
    company_id: "company-1",
    name: "North Reservoir",
    address: "200 Reservoir Drive, Springfield, IL 62702",
    latitude: 39.8117,
    longitude: -89.6401,
    created_at: "2024-01-21T10:00:00Z",
  },
  {
    id: "location-3",
    company_id: "company-2",
    name: "Factory Cooling System",
    address: "456 Industrial Ave, Chicago, IL 60601",
    latitude: 41.8781,
    longitude: -87.6298,
    created_at: "2024-02-05T10:00:00Z",
  },
];

export const mockConfigurations = [
  {
    id: "config-1",
    location_id: "location-1",
    parameter_name: "pH",
    min_value: 6.5,
    max_value: 8.5,
    unit: "pH",
    created_at: "2024-01-20T11:00:00Z",
  },
  {
    id: "config-2",
    location_id: "location-1",
    parameter_name: "Turbidity",
    min_value: 0,
    max_value: 5,
    unit: "NTU",
    created_at: "2024-01-20T11:00:00Z",
  },
  {
    id: "config-3",
    location_id: "location-1",
    parameter_name: "Chlorine",
    min_value: 0.2,
    max_value: 4.0,
    unit: "mg/L",
    created_at: "2024-01-20T11:00:00Z",
  },
  {
    id: "config-4",
    location_id: "location-2",
    parameter_name: "pH",
    min_value: 6.5,
    max_value: 8.5,
    unit: "pH",
    created_at: "2024-01-21T11:00:00Z",
  },
  {
    id: "config-5",
    location_id: "location-3",
    parameter_name: "Temperature",
    min_value: 10,
    max_value: 30,
    unit: "°C",
    created_at: "2024-02-05T11:00:00Z",
  },
];
