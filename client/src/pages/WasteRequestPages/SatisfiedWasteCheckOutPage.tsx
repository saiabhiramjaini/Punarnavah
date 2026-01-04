import { useState } from "react";
import axios from "axios";
import { CreateSatisfiedWasteReqOrderType } from "@abhiram2k03/punarnavah-common";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { backendUrl } from "../../utils/config";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { ErrorMsgComp } from "../../components/ErrorMsgComp";
import { LoadingComp } from "../../components/LoadingComp";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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
  const { name = "Default Item", quantity, price = 0 } = location.state;

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
  const deliveryCharges = 0.0;
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
        const errorMessage =
          error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message ||
          "An error occurred";
        toast.error(errorMessage);
      }
      console.error("Error occurred", error);
      setError("Order was not placed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {loading && <LoadingComp />}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <ErrorMsgComp error={error!} />
                <div className="space-y-2">
                  <Label htmlFor="mobile">Phone Number</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    placeholder="Enter your phone number"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Separator className="my-6" />

                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Shipping Address
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Enter your address"
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
                        placeholder="Enter your city"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="Enter your state"
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
                      placeholder="Enter your PIN code"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    Place Order
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-foreground">
                <span>{name}</span>
                <span>
                  {quantity} x ₹{price.toFixed(2)} = ₹
                  {(quantity * price).toFixed(2)}
                </span>
              </div>

              <Separator />

              <div className="space-y-2 text-foreground">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Quantity</span>
                  <span>{totalQuantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Price</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Charges</span>
                  <span>₹{deliveryCharges.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Grand Total</span>
                  <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
