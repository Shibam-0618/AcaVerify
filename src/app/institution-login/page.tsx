"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Link from "next/link";
import {
  Loader2,
  Lock,
  User,
  Building2,
  PlusCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";

// ✅ Validation schema (only user credentials now)
const loginSchema = z.object({
  // User credentials only
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Infer type from schema
type LoginForm = z.infer<typeof loginSchema>;

type AlertType = { type: "success" | "error"; message: string } | null;

function AlertBanner({
  alert,
  onClose,
}: {
  alert: AlertType;
  onClose: () => void;
}) {
  if (!alert) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 ${
        alert.type === "success"
          ? "bg-green-100 border border-green-400 text-green-700"
          : "bg-red-100 border border-red-400 text-red-700"
      } px-4 py-3 rounded shadow-lg`}
    >
      <div className="flex justify-between items-center">
        <span>{alert.message}</span>
        <button
          onClick={onClose}
          className="text-lg"
          aria-label="Close alert"
          type="button"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default function InstitutionalLoginPage() {
  // 🔹 State for loading and alerts
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertType>(null);
  const alertTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 🔹 Show alert function with cleanup
  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
    if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
    alertTimeoutRef.current = setTimeout(() => setAlert(null), 3000);
  };

  useEffect(() => {
    return () => {
      if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
    };
  }, []);

  // 🔹 React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // 🔹 Show/hide password toggle
  const [showPassword, setShowPassword] = useState(false);
  const passwordValue = watch("password");

  // 🔹 Form submit handler
  const onSubmit = async (data: LoginForm) => {
    setLoading(true);

    try {
      // Fake API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showAlert("success", `Login successful as ${data.username}`);
    } catch (error) {
      showAlert("error", "Login failed. Please check your credentials.");
      // Clear password field on failure
      setValue("password", "");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PageHeader />

      {/* Alert Banner */}
      <AlertBanner alert={alert} onClose={() => setAlert(null)} />

      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Institutional Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Institutional Login
              </h1>
            </div>
            <p className="text-gray-600 text-sm">Access your institutional account</p>
          </div>

          <Card className="w-full shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold">
                Login to Your Account
              </CardTitle>
              <CardDescription>Enter your credentials to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    {...register("username")}
                    disabled={loading}
                    aria-disabled={loading}
                    autoComplete="username"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2 relative">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    disabled={loading}
                    aria-disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  aria-disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" /> Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                {/* Links Section */}
                <div className="flex justify-between text-sm mt-4 pt-2">
                  <Link
                    href="/forgot-password"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Forgot Password?
                  </Link>
                  <Link
                    href="/create-account"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Create New Account
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <footer className="mt-6 text-center text-xs text-gray-500">
            <p>© 2024 Institutional Login Portal. All rights reserved.</p>
            <p className="mt-1">Secure authentication system</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
