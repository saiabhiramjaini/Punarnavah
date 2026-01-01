import { useState } from "react";
import axios from "axios";
import { CreateInnovativeProdOrderType } from "@abhiram2k03/punarnavah-common";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { backendUrl } from "../../utils/config";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { ErrorMsgComp } from "../../components/ErrorMsgComp";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Package } from "lucide-react";

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
  const { name = "Innovative Product", price = 0 } = location.state || {};

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

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
        toast.error("Failed to place order");
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
      setError("Order was not placed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Section - Order Summary */}
        <div className="lg:w-1/2 bg-primary/80 p-8 lg:p-16 flex flex-col justify-center text-secondary-foreground">
          <div className="max-w-md mx-auto w-full">
            <div className="flex items-center gap-2 mb-8">
              <Package className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Order Summary</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold mb-8 leading-tight">
              Review Your Purchase
            </h1>

            <div className="space-y-6 bg-secondary-foreground/10 p-6 rounded-2xl backdrop-blur-sm">
              <div className="flex justify-between items-start border-b border-secondary-foreground/20 pb-4">
                <div>
                  <p className="font-semibold text-lg">{name}</p>
                  <p className="text-sm text-secondary-foreground/70">Quantity: {totalQuantity}</p>
                </div>
                <p className="font-bold">₹{price.toFixed(2)}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-foreground/70">Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-foreground/70">Shipping</span>
                  <span className="text-green-300 font-medium">Free</span>
                </div>
              </div>

              <Separator className="bg-secondary-foreground/20" />

              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>


          </div>
        </div>

        {/* Right Section - Form */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Checkout</h2>
              <p className="text-muted-foreground">Complete your shipping and contact information.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <ErrorMsgComp error={error!} />

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
                  Contact Information
                </h3>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Phone number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md text-sm text-muted-foreground">
                      +91
                    </span>
                    <input
                      type="number"
                      name="mobile"
                      placeholder="Enter 10 digit number"
                      onChange={handleInputChange}
                      className="flex-1 h-10 rounded-l-none rounded-r-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
                  Shipping Address
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Street address, apartment, suite, etc."
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="City"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="State"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="6-digit PIN code"
                      onChange={handleInputChange}
                      required
                      maxLength={6}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" size="lg" className="w-full text-base py-6" disabled={loading}>
                  {loading ? "Processing..." : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Place Order • ₹{grandTotal.toFixed(2)}
                    </>
                  )}
                </Button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovativeProdCheckOutPage;
