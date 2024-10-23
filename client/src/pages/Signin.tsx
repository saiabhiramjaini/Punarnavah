import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { TextLink } from "../components/TextLink";
import { useState } from "react";
import axios from "axios";
import { SigninType } from "@abhiram2k03/punarnavah-common";
import { backendUrl } from "../utils/config";
import Lottie from "lottie-react";
import animationData from "../assets/lottie/login.json";
import bg from "../assets/bg-3.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ErrorMsgComp } from "../components/ErrorMsgComp";

export const Signin = () => {
  const [signinData, setSigninData] = useState<SigninType>({
    email: "",
    password: ""
  })
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true)
    setError("")
    try {
      const response = await axios.post(`${backendUrl}/api/v1/auth/signin`, {

        email: signinData.email,
        password: signinData.password,
      });
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate('/home')
      } else {
        setError("Signin Unsuccessful. Please try again.")
        toast.error(response.data.msg);
      }
    } catch (e: any) {
      toast.error(e.response.data.msg);
      console.log(e);
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
              <Heading text="Log in to your Account" />
              <p className="mt-8">"The greatest threat to our planet is the belief that someone else will save it."</p>
            </div>
            <form className="space-y-4">
            <ErrorMsgComp error={error!} />
              <InputBox
                type="text"
                label="Email"
                onChange={(e) => setSigninData({ ...signinData, email: e.target.value })}
                placeholder="Enter your email" name={""} />
              <InputBox
                type="password"
                label="Password"
                onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
                placeholder="Enter your password" name={""} />
                 <div className="text-right">
              <TextLink text="Forgot Password?" linkTo="/forgotpassword" />
            </div>
              <div className="flex items-center justify-center">
                <Button text={loading ? "Submitting..." : "Submit"} onClick={handleSubmit} />
              </div>
            </form>
            <div className="mt-4 text-right">
              <TextLink text="Don't have an account?" linkTo="/signup" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};