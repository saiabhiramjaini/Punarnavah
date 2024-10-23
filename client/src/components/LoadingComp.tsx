import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/loading.json";

export const LoadingComp = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Lottie animationData={loadingAnimation} className="h-24 w-24" />
    </div>
  );
};
