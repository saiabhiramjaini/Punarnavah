import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/loading.json";

interface LoadingCompProps {
  /**
   * If true, renders as a fixed overlay on top of all content.
   * If false, renders as a centered container in its parent.
   */
  fullScreen?: boolean;
}

export const LoadingComp = ({ fullScreen = true }: LoadingCompProps) => {
  return (
    <div
      className={`${fullScreen
          ? "fixed inset-0 z-[100] flex justify-center items-center bg-background/80 backdrop-blur-sm"
          : "flex justify-center items-center w-full h-full min-h-[400px]"
        }`}
    >
      <div className="flex flex-col items-center gap-4">
        <Lottie animationData={loadingAnimation} className="h-24 w-24" />
      </div>
    </div>
  );
};
