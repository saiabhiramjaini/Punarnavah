// import { useState } from "react";
// import axios from "axios";
// import { CreateInnovativeProdOrderType } from "@abhiram2k03/punarnavah-common";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { backendUrl } from "../../utils/config";
// import Navbar from "../../components/Navbar";
// import toast from "react-hot-toast";
// import { Button } from "../../components/Button";
// import { InputBox } from "../../components/InputBox";
// // @ts-ignore
// import { load } from "@cashfreepayments/cashfree-js";

// export const InnovativeProdCheckOutPage = () => {
//   const [formData, setFormData] = useState<CreateInnovativeProdOrderType>({
//     mobile: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     amount: 0,
//     innovativeProductId: "",
//   });

//   const innovativeProductId = useParams<{ id: string }>().id;

//   const location = useLocation();
//   const { name = "Default Item", price = 0 } = location.state;

//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const [orderId, setOrderId] = useState<string | null>(null);

//   const handleInputChange = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const totalQuantity = 1;
//   const totalPrice = price * totalQuantity;
//   const deliveryCharges = 0.0;
//   const grandTotal = totalPrice + deliveryCharges;

//   let cashfree: any;

//   let initializeSDK = async () => {
//     cashfree = await load({
//       mode: "sandbox",
//     });
//   };

//   initializeSDK();

//   const getSessionId = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/api/v1/payment`);
//       if (response.data && response.data.payment_session_id) {
//         console.log(response.data.payment_session_id);
//         setOrderId(response.data.orderId);
//         return response.data.payment_session_id;

//       }
//     } catch (error: any) {
//       console.error("Error occurred", error);
//     }
//   };


//   const verifyPayment = async function(orderId: string | null) {
//     try {

//       let res = await axios.post(`${backendUrl}/api/v1/verify`, {
//         orderId: orderId
//       });

//       if(res && res.data) {
//         alert("payment verified");
//       }
//     }
//     catch(err) {
//       console.log(err);
//     }
//   }


//   const handleClick = async (e: any) =>{
//     e.preventDefault();
//     console.log("clicked");
//     try {
//       let sessionId = await getSessionId();
//       let checkoutOptions = {
//         paymentSessionId: sessionId,
//         redirectTarget: "_modal"
//       }

//       cashfree.checkout(checkoutOptions).then(() => {
//         console.log("payment initiated");

//         verifyPayment(orderId)
//       })
//     }
//     catch(err) {
//       console.log(err);
//     }
//   }



//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setError(null);
//     setLoading(true);

//     const sessionId = getSessionId();

//     let checkoutOptions = {
//       paymentSessionId: sessionId,
//       redirectTarget: "_modal",
//     };

//     cashfree.checkout(checkoutOptions);

//     const updatedFormData = {
//       ...formData,
//       amount: grandTotal,
//       innovativeProductId: innovativeProductId,
//     };

//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/v1/innovative-prod-orders`,
//         updatedFormData
//       );

//       if (response.status === 201) {
//         toast.success("Order placed successfully");
//         navigate(`/profile`);
//       } else {
//         console.error("Error occurred", response.data.error[0].message);
//         toast.error(response.data.error[0].message);
//       }
//     } catch (error: any) {
//       if (error.response?.status === 401) {
//         toast.error("Unauthorized access. Please login to continue.");
//         localStorage.removeItem("token");
//         navigate("/signin");
//       } else {
//         const errorMessage =
//           error.response?.data?.errors?.[0]?.message ||
//           error.response?.data?.message ||
//           "An error occurred";
//         toast.error(errorMessage);
//       }
//       console.error("Error occurred", error);
//       setError("Order was not placed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-screen h-screen">
//       <Navbar />
//       <div className="grid md:grid-cols-2 gap-8 pt-8 p-5">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
         
//             {error && (
//               <p className="text-red-500 text-center text-xs">{error}</p>
//             )}
//             <div>
//               <InputBox
//                 label="Phone Number"
//                 type="tel"
//                 placeholder="Enter your phone number"
//                 name="mobile"
//                 onChange={handleInputChange}
//               />
//             </div>

//             <h3 className="text-2xl font-semibold mt-6 mb-4">
//               Shipping Address
//             </h3>
//             <div>
//               <InputBox
//                 label="Address"
//                 type="text"
//                 placeholder="Enter your address"
//                 name="address"
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <InputBox
//                   label="City"
//                   type="text"
//                   placeholder="Enter your city"
//                   name="city"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div>
//                 <InputBox
//                   label="State"
//                   type="text"
//                   placeholder="Enter your state"
//                   name="state"
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//             <div>
//               <InputBox
//                 label="PIN Code"
//                 type="text"
//                 placeholder="Enter your PIN code"
//                 name="pincode"
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="flex justify-center items-center">
//               <Button
//                 text={loading ? "Placing..." : "Place Order"}
//                 onClick={handleClick}
//               />
//             </div>

//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
//           <div className="space-y-4">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
//               <span>{name}</span>
//               <span>
//                 {1} x ₹{price.toFixed(2)} = ₹{(1 * price).toFixed(2)}
//               </span>
//             </div>

//             <div className="border-t pt-4">
//               <div className="flex justify-between">
//                 <span>Total Quantity</span>
//                 <span>{totalQuantity}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Total Price</span>
//                 <span>₹{totalPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Delivery Charges</span>
//                 <span>₹{deliveryCharges.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg mt-2">
//                 <span>Grand Total</span>
//                 <span>₹{grandTotal.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };




import { useEffect, useState } from "react";
import axios from "axios";
import { CreateInnovativeProdOrderType } from "@abhiram2k03/punarnavah-common";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { backendUrl } from "../../utils/config";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { Button } from "../../components/Button";
import { InputBox } from "../../components/InputBox";
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js";

export const InnovativeProdCheckOutPage = () => {
  const [formData, setFormData] = useState<CreateInnovativeProdOrderType>({
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    amount: 0,
    innovativeProductId: "",
  });

  const innovativeProductId = useParams<{ id: string }>().id;

  const location = useLocation();
  const { name = "Default Item", price = 0 } = location.state;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

    const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const totalQuantity = 1;
  const totalPrice = price * totalQuantity;
  const deliveryCharges = 0.0;
  const grandTotal = totalPrice + deliveryCharges;

  let cashfree: any;

  // Initialize Cashfree SDK
  const initializeSDK = async () => {
    cashfree = await load({ mode: "sandbox" });
  };

  // Call initialize on component mount
  useEffect(() => {
    initializeSDK();
  }, []);

  const getSessionId = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/payment`);
      if (response.data && response.data.payment_session_id) {
        return response.data.payment_session_id;
      }
    } catch (error: any) {
      console.error("Error occurred", error);
      throw error; // Propagate error for handling in handleClick
    }
  };

  const verifyPayment = async (orderId: string | null) => {
    try {
      const response = await axios.post(`${backendUrl}/api/v1/verify`, { orderId });
      if (response.data) {
        return true; // Payment is verified
      }
    } catch (error) {
      console.error("Verification error", error);
      throw error; // Propagate error
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const sessionId = await getSessionId();

      const checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then(async () => {
        console.log("Payment initiated");

        const paymentVerified = await verifyPayment(formData.innovativeProductId); // Pass orderId to verifyPayment

        if (paymentVerified) {
          await handleSubmit(); // Call handleSubmit if payment is verified
        }
      });
    } catch (error) {
      console.error("Error in handleClick", error);
      toast.error("Payment process failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const updatedFormData = {
      ...formData,
      amount: grandTotal,
      innovativeProductId: innovativeProductId,
    };

    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/innovative-prod-orders`,
        updatedFormData
      );

      if (response.status === 201) {
        toast.success("Order placed successfully");
        navigate(`/profile`);
      } else {
        toast.error("Error occurred: " + response.data.error[0]?.message);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please login to continue.");
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        const errorMessage =
          error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message ||
          "An error occurred";
        toast.error(errorMessage);
      }
      console.error("Error occurred", error);
    }
  };

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="grid md:grid-cols-2 gap-8 pt-8 p-5">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
          {error && <p className="text-red-500 text-center text-xs">{error}</p>}
          <div>
            <InputBox
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              name="mobile"
              onChange={handleInputChange}
            />
          </div>

          <h3 className="text-2xl font-semibold mt-6 mb-4">Shipping Address</h3>
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
            <Button
              text={loading ? "Placing..." : "Place Order"}
              onClick={handleClick}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <span>{name}</span>
              <span>
                {totalQuantity} x ₹{price.toFixed(2)} = ₹{(totalQuantity * price).toFixed(2)}
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
