import { useState } from "react";
import axios from "axios";
import { CreateSatisfiedWasteReqOrderType } from "@abhiram2k03/punarnavah-common";
import { useNavigate, useParams, useLocation  } from "react-router-dom";
import { backendUrl } from "../../utils/config";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { Button } from "../../components/Button";
import { InputBox } from "../../components/InputBox";
import { ErrorMsgComp } from "../../components/ErrorMsgComp";

export const SatisfiedWasteCheckOutPage = () => {
  const [formData, setFormData] = useState<CreateSatisfiedWasteReqOrderType>({
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    amount: 0,
    satisfiedWasteReqId: "",
  });

  const satisfiedWasteReqId = useParams<{ id: string }>().id;

  const location = useLocation();
  const { name = "Default Item", quantity ,price = 0 } = location.state;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const totalQuantity = quantity;
  const totalPrice = price * totalQuantity;
  const deliveryCharges = 0.00;
  const grandTotal = totalPrice + deliveryCharges;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
  
    const updatedFormData = {
      ...formData,
      amount: grandTotal,
      satisfiedWasteReqId: satisfiedWasteReqId,
    };
  
    try {
    
      const response = await axios.post(
        `${backendUrl}/api/v1/satisfied-waste-orders`,
        updatedFormData
      );
  
      if (response.status === 201) {
        toast.success("Order placed successfully");
        navigate(`/profile`);
      } else {
        console.error("Error occurred", response.data.error[0].message);
        toast.error(response.data.error[0].message);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please login to continue.");
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        const errorMessage = error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message ||
          "An error occurred";
        toast.error(errorMessage);
      }
      console.error("Error occurred", error);
      setError("Order was not placed. Please try again.");
    }finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="">
      <Navbar />
      <div className="grid md:grid-cols-2 gap-8 pt-8 p-5">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
          <ErrorMsgComp error={error!} />
           

            <div>
              <InputBox
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                name="mobile"
                onChange={handleInputChange}
              />
            </div>

            <h3 className="text-2xl font-semibold mt-6 mb-4">
              Shipping Address
            </h3>
            <div>
              <InputBox
                label="Address"
                type="text"
                placeholder="Enter your address"
                name="address"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputBox
                  label="City"
                  type="text"
                  placeholder="Enter your city"
                  name="city"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <InputBox
                  label="State"
                  type="text"
                  placeholder="Enter your state"
                  name="state"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <InputBox
                label="PIN Code"
                type="text"
                placeholder="Enter your PIN code"
                name="pincode"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-center items-center">
              <Button text={loading ? "Placing..." : "Place Order"} onClick={() => {}} />
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <span>{name}</span>
              <span>
                {1} x ₹{price.toFixed(2)} = ₹{(1 * price).toFixed(2)}
              </span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span>Total Quantity</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Price</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>₹{deliveryCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

