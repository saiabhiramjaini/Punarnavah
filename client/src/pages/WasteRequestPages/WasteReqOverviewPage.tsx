import { useEffect, useState } from "react";
import { WasteRequestType } from "@abhiram2k03/punarnavah-common";
import axios from "axios";
import { backendUrl } from "../../utils/config";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { ErrorMsgComp } from "../../components/ErrorMsgComp";
import { LoadingComp } from "../../components/LoadingComp";

export const WasteReqOverviewPage = () => {
  const [data, setData] = useState<WasteRequestType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/v1/waste-req/${id}`
        );
        setData(response.data.wasteRequest);
      } catch (error: any) {
        if (error.response.status === 401) {
          toast.error("Unauthorized access. Please login to continue.");
          localStorage.removeItem("token");
          navigate("/signin");
        }
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching waste request:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="flex justify-center items-center p-4 mt-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <LoadingComp />
          </div>
        ) : error ? (
          <ErrorMsgComp error={error!} />
        ) : (
          <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[600px]">
            {/* Left half containing the image */}
            <div className="w-full md:w-3/5 p-8 bg-gray-100 flex items-center justify-center">
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
            <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-white">
              {data && (
                <div className="space-y-6 flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-bold">{data.name}</h1>
                    <p className="text-[#555555] text-lg">{data.description}</p>
                    <div className="space-y-2">
                      <p className="text-xl">
                        Required quantity:{" "}
                        <span className="font-semibold">
                          {data.remainingQuantity} {data.quantityUnit}{" "}
                          <span className="text-sm">
                            from {data.requiredQuantity}
                          </span>
                        </span>
                      </p>
                    </div>
                    <p className="text-xl">
                      Price: Rs. {data.price}/- per{" "}
                      {data.quantityUnit.slice(0, -1)}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/contribution/${data.id}`)}
                    className="w-full bg-secondary text-white px-6 py-3 rounded-xl text-xl font-semibold hover:bg-[#7a8968] transition-colors duration-300 transform hover:scale-105"
                  >
                    Contribute
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WasteReqOverviewPage;
