import { useEffect, useState } from "react";
import { InnovativeProductType } from "@abhiram2k03/punarnavah-common";
import axios from "axios";
import { backendUrl } from "../../utils/config";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { LoadingComp } from "../../components/LoadingComp";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Layers } from "lucide-react";

export const InnovativeProdOverview = () => {
  const [data, setData] = useState<InnovativeProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/innovative-prod/${id}`);
        setData(response.data.validatedProd);
      } catch (error: any) {
        if (error.response?.status === 401) {
          toast.error("Unauthorized access. Please login to continue.");
          localStorage.removeItem("token");
          navigate("/signin");
        }
        setError("Failed to fetch product details. Please try again.");
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <LoadingComp />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-destructive">{error || "Product not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Section - Image */}
        <div className="lg:w-1/2 bg-muted p-6 lg:p-10 flex flex-col">
          {/* Image */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
              <img
                src={data.image}
                alt={data.name}
                className="w-full h-auto max-h-[60vh] object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-lg">
            {/* Badge */}
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Innovative Product
            </span>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {data.name}
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
              {data.description}
            </p>

            {/* Materials Used */}
            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Layers className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wide">Materials Used</span>
              </div>
              <p className="text-foreground">{data.materialsUsed}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-muted/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Package className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wide">Available</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {data.quantity}
                  <span className="text-sm font-normal text-muted-foreground ml-1">units</span>
                </p>
              </div>

              <div className="bg-muted/50 rounded-xl p-4">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">Price</span>
                <p className="text-2xl font-bold text-primary mt-1">
                  ₹{data.price}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() =>
                navigate(`/innovative-prod/checkout/${data.id}`, {
                  state: { name: data.name, unit: "", price: data.price },
                })
              }
              size="lg"
              className="w-full text-base py-6"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovativeProdOverview;