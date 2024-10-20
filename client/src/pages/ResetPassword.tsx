import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import axios from "axios";
import { ResetPasswordInput } from "../utils/schema";
import { backendUrl } from "../utils/config";
import { SubHeading } from "../components/SubHeading";
import toast from "react-hot-toast";


export const ResetPassword = () => {
  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordInput>({
    password: "",
    cPassword: ""
  })

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true)
    setError("")
    try {
      const response = await axios.post(`${backendUrl}/api/v1/auth/reset-password/:token`, {
        password: resetPasswordData.password,
        cPassword: resetPasswordData.cPassword,
      });
      if (response.status === 201) {
        toast.success(response.data.msg)
      } else {
        setError("Couldn't change the password. Please try again.")
        toast.error(response.data.msg);
      }
    } catch (e) {
      setError("Couldn't change the password. Please try again.")
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-secondary">
      <div className="border bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
        <div className="my-6">
          <SubHeading text={"Change your Password"} />
        </div>
        <div className="space-y-4">
          <p className="text-red-500 text-center">{error}</p>
          <InputBox
            type="password"
            label="New password"
            onChange={(e) => {
              setResetPasswordData({
                ...resetPasswordData,
                password: e.target.value
              });
            }}
            placeholder="Enter new password"
            name="password" />
          <InputBox
            type="password"
            label="Confirm Password"
            onChange={(e) => {
              setResetPasswordData({
                ...resetPasswordData,
                cPassword: e.target.value
              });
            }}
            placeholder="Confirm new password"
            name="cPassword" />
        </div>
        <div className="mt-6">
          <Button
            text={loading ? "Submitting" : "Submit"}
            onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};