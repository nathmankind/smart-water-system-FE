import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { CheckCircle, Droplet } from "lucide-react";

export default function SignUpSuccessPage() {
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
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <CardTitle className="text-2xl font-semibold">
                Account Created!
              </CardTitle>
            </div>
            <CardDescription>
              Please verify your email to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-gray-600">
              We&apos;ve sent a confirmation email to your inbox. Please click
              the verification link in the email to activate your account and
              complete the setup process.
            </p>
            <div className="rounded-md bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Check your spam folder if you don&apos;t
                see the email within a few minutes.
              </p>
            </div>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <a href="/auth/login">Return to Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
