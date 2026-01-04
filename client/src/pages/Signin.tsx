import { useState } from "react";
import axios from "axios";
import { SigninType } from "@abhiram2k03/punarnavah-common";
import { backendUrl } from "../utils/config";
import Lottie from "lottie-react";
import animationData from "../assets/lottie/login.json";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { LoadingComp } from "../components/LoadingComp";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export const Signin = () => {
  const [signinData, setSigninData] = useState<SigninType>({
    email: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${backendUrl}/api/v1/auth/signin`, {
        email: signinData.email,
        password: signinData.password,
      });
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate('/home');
      } else {
        setError("Signin Unsuccessful. Please try again.");
        toast.error(response.data.msg);
      }
    } catch (e: any) {
      toast.error(e.response.data.msg);
      setError("Signin Unsuccessful. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {loading && <LoadingComp />}
      {/* Left section - Lottie Animation */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/80 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="w-full">
            <Lottie animationData={animationData} />
          </div>
          <h2 className="text-2xl font-bold text-secondary-foreground mt-8 text-center">
            Welcome Back
          </h2>
          <p className="text-secondary-foreground/80 mt-2 text-center">
            "The greatest threat to our planet is the belief that someone else will save it."
          </p>
        </div>
      </div>

      {/* Right section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Sign In
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome back! Please enter your credentials
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={signinData.email}
                onChange={(e) => setSigninData({ ...signinData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={signinData.password}
                  onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
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

            <div className="text-right">
              <Link to="/forgotpassword" className="text-sm text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
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