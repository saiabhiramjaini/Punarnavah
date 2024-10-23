import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { TextLink } from "../components/TextLink";
import { useState } from "react";
import axios from "axios";
import { SignupType } from "@abhiram2k03/punarnavah-common";
import { backendUrl } from "../utils/config";
import Lottie from "lottie-react";
import animationData from "../assets/lottie/Signup-a1.json";
import bg from "../assets/bg-3.svg";
import toast from "react-hot-toast";
import { ErrorMsgComp } from "../components/ErrorMsgComp";

export const Signup = () => {
  const [signupData, setSignupData] = useState<SignupType>({
    username: "",
    email: "",
    password: "",
    cPassword: ""
  })
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true)
    setError("")
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
      } else{
        toast.error(response.data.msg);
        setError("Signup Unsuccessful. Please try again.")
      }
    } catch (e: any) {
      toast.error(e.response.data.msg);
      setError("Signup Unsuccessful. Please try again.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl">
          {/* Left section for design */}
          <div className="w-full md:w-1/2 p-6 hidden md:flex flex-col justify-center items-center bg-gray-100 rounded-l-3xl">
            <div className="w-full h-auto">
              <Lottie animationData={animationData} />
            </div>
          </div>

          {/* Right section for the form */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <div className="text-center mb-8">
              <Heading text="Create an Account" />
              <p className="mt-4">"Waste isn't waste until we waste it."</p>
            </div>
            <form className="space-y-4">
              <ErrorMsgComp error={error!} />
              <InputBox
                type="text"
                label="Username"
                onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                placeholder="Enter your username" name={""} />
              <InputBox
                type="email"
                label="Email"
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                placeholder="Enter your email" name={""} />
              <InputBox
                type="password"
                label="Password"
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                placeholder="Enter your password" name={""} />
              <InputBox
                type="password"
                label="Confirm Password"
                onChange={(e) => setSignupData({ ...signupData, cPassword: e.target.value })}
                placeholder="Confirm your password" name={""} />
              <div className="flex items-center justify-center">
                <Button text={loading? "Submitting..." : "Submit"} onClick={handleSubmit} />
              </div>
            </form>
            <div className="mt-4 text-right">
              <TextLink text="Already have an account?" linkTo="/signin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};