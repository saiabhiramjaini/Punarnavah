import { useState } from "react";
import axios from "axios";
import { SignupType } from "@abhiram2k03/punarnavah-common";
import { backendUrl } from "../utils/config";
import Lottie from "lottie-react";
import animationData from "../assets/lottie/Signup-a1.json";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export const Signup = () => {
  const [signupData, setSignupData] = useState<SignupType>({
    username: "",
    email: "",
    password: "",
    cPassword: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${backendUrl}/api/v1/auth/signup`, {
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
        cPassword: signupData.cPassword
      });
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate('/home');
      } else {
        toast.error(response.data.msg);
        setError("Signup Unsuccessful. Please try again.");
      }
    } catch (e: any) {
      toast.error(e.response.data.msg);
      setError("Signup Unsuccessful. Please try again.");
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
            Join the Movement
          </h2>
          <p className="text-secondary-foreground/80 mt-2 text-center">
            "Waste isn't waste until we waste it."
          </p>
        </div>
      </div>

      {/* Right section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Create Account
            </h1>
            <p className="text-muted-foreground mt-2">
              Start your journey towards sustainable living
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={signupData.username}
                onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="cPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={signupData.cPassword}
                  onChange={(e) => setSignupData({ ...signupData, cPassword: e.target.value })}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-muted-foreground">Already have an account? </span>
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