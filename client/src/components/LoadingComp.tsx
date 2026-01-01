import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/loading.json";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingCompProps {
  variant?: "lottie" | "skeleton";
}

export const LoadingComp = ({ variant = "lottie" }: LoadingCompProps) => {
  if (variant === "skeleton") {
    return (
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-8 w-1/2" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <Lottie animationData={loadingAnimation} className="h-24 w-24" />
    </div>
  );
};
