import { UploadContributionType } from "@abhiram2k03/punarnavah-common";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../utils/config";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import { LoadingComp } from "../../components/LoadingComp";
import { ErrorMsgComp } from "../../components/ErrorMsgComp";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ContributionPage = () => {
  const [data, setData] = useState<UploadContributionType>({
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    quantity: 0,
    wasteRequestId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { id: wasteRequestId = "" } = useParams<{ id: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      wasteRequestId,
    }));
  }, [wasteRequestId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/contributions/${wasteRequestId}`,
        data
      );

      if (response.status === 201) {
        toast.success("Contributed Successfully");
        navigate(`/home`);
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
      setError("Request creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <LoadingComp />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Left Section */}
        <div className="lg:w-1/2 bg-primary/80 p-8 lg:p-12 flex items-center justify-center">
          <div className="max-w-md text-center">
            {/* Badge */}
            <span className="inline-block bg-secondary-foreground/20 text-secondary-foreground text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              Contribute & Earn
            </span>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-secondary-foreground leading-tight mb-4">
              Turn Your Waste Into Someone's Treasure
            </h1>

            {/* Features */}
            <div className="space-y-2 text-left max-w-xs mx-auto">
              <div className="flex items-center gap-3 text-secondary-foreground/90 text-sm">
                <span className="text-secondary-foreground">✓</span>
                <span>Support sustainable livelihoods</span>
              </div>
              <div className="flex items-center gap-3 text-secondary-foreground/90 text-sm">
                <span className="text-secondary-foreground">✓</span>
                <span>Get paid for your materials</span>
              </div>
              <div className="flex items-center gap-3 text-secondary-foreground/90 text-sm">
                <span className="text-secondary-foreground">✓</span>
                <span>Reduce landfill waste</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 p-4 md:p-8 flex items-center">
          <Card className="w-full max-w-xl mx-auto">
            <CardContent className="p-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Be a Contributor
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                      onChange={handleChange}
                      className="flex-1 h-10 rounded-l-none rounded-r-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Enter your address"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="City"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="State"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        placeholder="Pincode"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      name="quantity"
                      placeholder="Enter quantity"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <ErrorMsgComp error={error!} />

                <div className="flex justify-center pt-4">
                  <Button type="submit" size="lg" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Contribution"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};