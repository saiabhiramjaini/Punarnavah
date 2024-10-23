import { Button } from "../components/Button";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import axios from "axios";
import { ForgotPasswordType } from "@abhiram2k03/punarnavah-common"
import { backendUrl } from "../utils/config";
import animationData from "../assets/lottie/forgot-password.json";
import Lottie from "lottie-react";
import toast from "react-hot-toast";
import { ErrorMsgComp } from "../components/ErrorMsgComp";

export const ForgotPassword = () => {
  const [forgotPasswordData, setForgotPasswordData] = useState<ForgotPasswordType>({
    email: ""
  })

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true)
    setError("")
    try {
      const response = await axios.post(`${backendUrl}/api/v1/auth/forgot-password`, {
        email: forgotPasswordData.email
      });
      if (response.status === 200) {
        toast.success(response.data.msg)
      } else {
        setError("Couldn't send an email. Please try again.")
        toast.error(response.data.msg);
      }
    } catch (e: any) {
      setError("Couldn't send an email. Please try again.")
      toast.error(e.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex justify-center items-center min-h-screen bg-secondary">
        <div className="border bg-white p-6 sm:p-8 rounded-xl shadow-xl text-center w-full max-w-sm sm:max-w-md lg:max-w-lg mb-8"> {/* Responsive width and padding */}

          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto"> 
            <Lottie animationData={animationData} />
          </div>
          <div className="mt-4">
            <SubHeading text={"Forgot your password?"} />
          </div>
          <div className="mt-4 sm:mt-8">
            <p>Enter your email and we'll help you reset your password.</p>
          </div>
          <div className="mt-4 sm:mt-6">
          <ErrorMsgComp error={error!} />
            <InputBox
              type="email"
              label="Email"
              onChange={(e) => {
                setForgotPasswordData({
                  ...forgotPasswordData,
                  email: e.target.value
                });
              }}
              placeholder="Enter your email"
              name="email"
            />
          </div>

          <div className="my-6 sm:my-8">
            <Button text={loading ? "Submitting..." : "Submit"} onClick={handleSubmit} />
          </div>

        </div>
      </div>
  );
};