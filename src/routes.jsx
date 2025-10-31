import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./app-components/ProtectedRoute";
import LoginForm from "./pages/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  //   {
  //     path: "/forgot-password",
  //     element: <ForgotPassword />,
  //   },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard/*",
        // element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <h1>Hello to the dashboard</h1>,
          },
          {
            path: "*",
            element: <div>404 - Page Not Found</div>,
          },
        ],
      },
    ],
  },
]);
