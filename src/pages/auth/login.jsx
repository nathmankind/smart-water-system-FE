import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Droplet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
const apiUrl = import.meta.env.VITE_API_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log("apiUrl check on prod ...", apiUrl);
  const {
    mutate: handleLogin,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post("/auth/login", { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("user_token", data.access_token);
      console.log("data", data);
      // Assuming the API returns a user object on successful login
      const user = data.user;
      localStorage.setItem("mock_current_user", JSON.stringify(user));

      if (user.mustChangePassword) {
        navigate("/auth/change-password");
      } else if (user.role === "superadmin") {
        navigate("/admin");
      } else if (user.role === "company_admin") {
        navigate("/company-admin");
      } else {
        navigate("/location");
      }
    },
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
            <Droplet className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Water Quality Monitor
          </h1>
          <p className="text-sm text-gray-600">
            Professional monitoring system
          </p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
                  <p className="font-medium mb-1">Demo Credentials:</p>
                  <p>Superadmin: nathmankind+01@gmail.com --- Admin123!</p>
                  <p>Company Admin: nathan@yopmail.com --- password</p>
                  <p>Location Contact: toronto@acme.com</p>
                </div>
                {error && (
                  <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                    {error.message}
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isPending}
                >
                  {isPending ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
