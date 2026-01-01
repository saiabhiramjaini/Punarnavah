import { useState } from "react";
import axios from "axios";
import { ForgotPasswordType } from "@abhiram2k03/punarnavah-common";
import { backendUrl } from "../utils/config";
import animationData from "../assets/lottie/forgot-password.json";
import Lottie from "lottie-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const ForgotPassword = () => {
  const [forgotPasswordData, setForgotPasswordData] = useState<ForgotPasswordType>({
    email: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${backendUrl}/api/v1/auth/forgot-password`, {
        email: forgotPasswordData.email
      });
      if (response.status === 200) {
        toast.success(response.data.msg);
        setSuccess(true);
      } else {
        setError("Couldn't send an email. Please try again.");
        toast.error(response.data.msg);
      }
    } catch (e: any) {
      setError("Couldn't send an email. Please try again.");
      toast.error(e.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left section - Lottie Animation */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/80 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="w-full">
            <Lottie animationData={animationData} />
          </div>
          <h2 className="text-2xl font-bold text-secondary-foreground mt-8 text-center">
            Forgot Password?
          </h2>
          <p className="text-secondary-foreground/80 mt-2 text-center">
            No worries! We'll help you reset it.
          </p>
        </div>
      </div>

      {/* Right section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Reset Password
            </h1>
            <p className="text-muted-foreground mt-2">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {success ? (
            <div className="space-y-5">
              <Alert className="border-primary bg-primary/10">
                <AlertDescription className="text-foreground">
                  Password reset link has been sent to your email. Please check your inbox.
                </AlertDescription>
              </Alert>
              <Link to="/signin">
                <Button className="w-full" variant="outline">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={forgotPasswordData.email}
                  onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, email: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <span className="text-muted-foreground">Remember your password? </span>
            <Link to="/signin" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </div>

          {/* Mobile Lottie */}
          <div className="mt-8 lg:hidden">
            <div className="w-32 h-32 mx-auto">
              <Lottie animationData={animationData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};