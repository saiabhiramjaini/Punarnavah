import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import axios from "axios";
import { ResetPasswordInput } from "../utils/schema";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../utils/config";


export const ResetPassword = () => {
  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordInput>({
    password: "",
    cPassword: ""
  })

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/v1/auth/reset-password/:token`, {
        password: resetPasswordData.password,
        cPassword: resetPasswordData.cPassword,
      });
      alert(response.data.msg);
      if (response.data.msg === 'password updated') {
        navigate("/signin");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border bg-white p-8 rounded-xl shadow-xl text-center">
        <Heading text={"Reset Password"} />
        
        <InputBox
          type="password"
          label="Password"
          onChange={(e) => {
            setResetPasswordData({
              ...resetPasswordData,
              password: e.target.value
            });
          } } placeholder={""} name={""}        />

        <InputBox
          type="password"
          label="Confirm Password"
          onChange={(e) => {
            setResetPasswordData({
              ...resetPasswordData,
              cPassword: e.target.value
            });
          } } placeholder={""} name={""}        />
        
        <Button text="Submit" onClick={handleSubmit} />

      </div>
    </div>
  );
};