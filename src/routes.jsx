import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginForm from "./pages/auth/login";
import SignUpPage from "./pages/auth/sign-up";
import SignUpSuccessPage from "./pages/auth/sign-up-success";
import AdminPage from "./pages/admin";
import AdminLayout from "./layouts/AdminLayout";
import CompaniesPage from "./pages/admin/companies";
import AlarmsPage from "./pages/admin/alarms";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/dashboard";
import AuthLayout from "./layouts/AuthLayout";
import ForgotPassword from "./pages/auth/forgot-password";
import CompanyAdminProtectedRoute from "./app-components/CompanyAdminProtectedRoute";
import CompanyAdminLayout from "./layouts/CompanyAdminLayout";
import CompanyAdminPage from "./pages/company-admin";
import CompanyAdminAlarmsPage from "./pages/company-admin/alarms";
import CompanyAdminLocationsPage from "./pages/company-admin/locations";
import CompanyAdminLocationDetailPage from "./pages/company-admin/location-details";
import CompanyAdminUsersPage from "./pages/company-admin/users";
import LocationLayout from "./layouts/RegUserLayout";
import LocationDashboard from "./pages/location";
import LocationAlarmsPage from "./pages/location/alarms";
import SuperAdminProtectedRoute from "./app-components/SuperAdminProtectedRoute";

import ChangePasswordPage from "./pages/auth/change-password";

import ChangePasswordSuccessPage from "./pages/auth/change-password-success";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    // element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <LoginForm />,
      },
      {
        path: "/auth/change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "/auth/change-password-success",
        element: <ChangePasswordSuccessPage />,
      },
      {
        path: "/auth/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/auth/sign-up-success",
        element: <SignUpSuccessPage />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    element: <SuperAdminProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "/admin",
            element: <AdminPage />,
          },
          {
            path: "/admin/companies",
            element: <CompaniesPage />,
          },
          {
            path: "/admin/alarms",
            element: <AlarmsPage />,
          },
        ],
      },
    ],
  },
  // Company admin dashboard routes
  {
    element: <CompanyAdminProtectedRoute />,
    children: [
      {
        path: "/company-admin/*",
        element: <CompanyAdminLayout />,
        children: [
          {
            path: "",
            element: <CompanyAdminPage />,
          },
          {
            path: "alarms",
            element: <CompanyAdminAlarmsPage />,
          },
          {
            path: "locations",
            element: <CompanyAdminLocationsPage />,
          },
          {
            path: "locations/:id",
            element: <CompanyAdminLocationDetailPage />,
          },
          {
            path: "users",
            element: <CompanyAdminUsersPage />,
          },
        ],
      },
      {
        path: "/location/*",
        element: <LocationLayout />,
        children: [
          {
            path: "",
            element: <LocationDashboard />,
          },
          {
            path: "alarms",
            element: <LocationAlarmsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
]);
