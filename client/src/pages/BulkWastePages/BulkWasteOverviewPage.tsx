import { useEffect, useState } from "react";
import { BulkWasteType } from "@abhiram2k03/punarnavah-common";
import axios from "axios";
import { backendUrl } from "../../utils/config";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { ErrorMsgComp } from "../../components/ErrorMsgComp";
import { LoadingComp } from "../../components/LoadingComp";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const BulkWasteOverviewPage = () => {
  const [data, setData] = useState<BulkWasteType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/bulk-waste/${id}`);
        setData(response.data.validatedWaste);
      } catch (error: any) {
        if (error.response.status === 401) {
          toast.error("Unauthorized access. Please login to continue.");
          localStorage.removeItem("token");
          navigate("/signin");
        }
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="min-h-screen w-full bg-background">
      <Navbar />
      <div className="flex justify-center items-center p-4 mt-8">
        {loading ? (
          <LoadingComp />
        ) : error ? (
          <ErrorMsgComp error={error!} />
        ) : (
          <Card className="w-full max-w-6xl overflow-hidden min-h-[600px]">
            <div className="flex flex-col md:flex-row">
              {/* Left half containing the image */}
              <div className="w-full md:w-3/5 p-8 bg-muted flex items-center justify-center">
                {data && (
                  <div className="relative w-full h-full max-h-[500px]">
                    <img
                      src={data.image}
                      alt={data.name}
                      className="w-full h-full object-contain rounded-xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  </div>
                )}
              </div>

              {/* Right half containing the content */}
              <CardContent className="w-full md:w-2/5 p-8 flex flex-col justify-between">
                {data && (
                  <div className="space-y-6 flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-5">
                      <h1 className="text-3xl font-bold text-foreground">{data.name}</h1>
                      <p className="text-muted-foreground text-lg">{data.description}</p>
                      <div className="space-y-2">
                        <p className="text-xl text-foreground">
                          Available quantity:{" "}
                          <span className="font-semibold">
                            {data.quantityAvailable} {data.quantityUnit}
                          </span>
                        </p>
                      </div>
                      <p className="text-xl text-foreground">
                        Price: Rs.{data.price}/- per {data.quantityUnit.slice(0, -1)}
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        navigate(`/bulk-waste/checkout/${data.id}`, {
                          state: { name: data.name, price: data.price },
                        })
                      }
                      size="lg"
                      className="w-full text-lg"
                    >
                      Order
                    </Button>
                  </div>
                )}
              </CardContent>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BulkWasteOverviewPage;
