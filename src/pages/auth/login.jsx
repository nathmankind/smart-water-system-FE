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
import { mockUsers } from "@/lib/mock-data";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const {
  //   mutate: handleLogin,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: async () => {
  //     const response = await apiClient.post("/auth/login", { email, password });
  //     return response.data;
  //   },
  //   onSuccess: (data) => {
  //     localStorage.setItem("user_token", data.token);
  //     if (data.user.role === "superadmin") {
  //       navigate("/admin");
  //     } else if (data.user.role === "user") {
  //       navigate("/dashboard");
  //     }
  //   },
  // });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // e.preventDefault();
    setIsLoading(true);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user by email
    const user = mockUsers.find((u) => u.email === email);

    if (!user) {
      setError("Invalid email or password");
      setIsLoading(false);
      return;
    }

    localStorage.setItem("mock_current_user", JSON.stringify(user));

    if (user.role === "superadmin") {
      navigate("/admin");
    } else if (user.role === "company_admin") {
      navigate("/company-admin");
    } else {
      navigate("/location");
    }

    setIsLoading(false);
  };

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
            {/* <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            > */}
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
                {error && (
                  <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                    {error.message}
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  // disabled={isPending}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
