import { useState } from "react";
import axios from "axios";
import { CreateSatisfiedWasteReqOrderSchema, CreateSatisfiedWasteReqOrderType } from "@abhiram2k03/punarnavah-common";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../utils/config";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { Button } from "../components/Button";

interface OrderItem {
  name: string;
  unit: string;
  price: number;
}

export const CheckoutPage = ({
  name = "Default Item",
  unit = "kg",
  price = 0,
}: OrderItem) => {
  const [formData, setFormData] = useState<CreateSatisfiedWasteReqOrderType>({
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    amount: 0,
    satisfiedWasteReqId: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { wasteReqId } = useParams();
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const totalQuantity = 1;
  const totalPrice = price * totalQuantity;
  const deliveryCharges = 50;
  const grandTotal = totalPrice + deliveryCharges;

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    // Add the order total amount and satisfiedWasteReqId to formData before sending
    const updatedFormData = {
      ...formData,
      amount: grandTotal,
      satisfiedWasteReqId: wasteReqId,
    };

    try {
      // Validate the form data using Zod schema
      const validatedData =
        CreateSatisfiedWasteReqOrderSchema.parse(updatedFormData);

      // Send validated data to the backend using Axios
      const response = await axios.post(`${backendUrl}/api/v1/satisfied-waste-orders`, validatedData);

      // Display success message upon successful submission
      setSuccessMessage("Order submitted successfully!");
      console.log("Order submitted:", response.data);
    } 
    catch (error: any) {
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
      setError("Request creation failed. Please try again.");
    } finally {
      //setLoading(false);
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="grid md:grid-cols-2 gap-8 pt-8 p-5">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}

            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                pattern="[0-9]{10}"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                required
              />
            </div>

            <h3 className="text-2xl font-semibold mt-6 mb-4">
              Shipping Address
            </h3>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter your state"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="pincode"
                className="block text-sm font-medium text-gray-700"
              >
                PIN Code
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                pattern="[0-9]{6}"
                placeholder="Enter your PIN code"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                required
              />
            </div>
            <Button text={"Place Order"} onClick={() => {}} />
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <span>{name}</span>
              <span>
                {1} {unit} x ₹{price.toFixed(2)} = ₹{(1 * price).toFixed(2)}
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
