import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="w-full max-w-md">
        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-semibold">
              Password Changed Successfully
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-gray-600">
              Your password has been updated. Please log in with your new
              password.
            </p>
            <Button
              onClick={() => navigate("/auth/login")}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
