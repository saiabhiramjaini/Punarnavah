import { useEffect, useState } from "react";
import { InnovativeProductType } from "../utils/schema";
import axios from "axios";
import { backendUrl } from "../utils/config";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export const InnovativeProdOverview = () => {
  const [data, setData] = useState<InnovativeProductType | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/innovative-prod/${id}`);
        setData(response.data.validatedProducts);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="w-screen h-screen">
      <Navbar/>
      <div className="flex justify-center items-center h-[89.5vh] bg-gradient-to-br from-[#e0e5dd] to-[#f5f7f3] p-4">
        <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Left half containing the image */}
          <div className="w-full md:w-3/5 p-8 relative bg-gray-100">
            {data && (
              <img
                src={data.image}
                alt={data.name}
                className="w-full h-full object-cover rounded-xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            )}
            {/* Decorative elements */}

          </div>

          {/* Right half containing the content */}
          <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-white">
            {data ? (
              <div className="space-y-6">
                <h1 className="text-5xl font-bold uppercase text-[#333333]">{data.name}</h1>
                <p className="text-[#555555] text-lg">{data.description}</p>
                <div className="space-y-2">
                  <p className="text-xl">
                    Required quantity: <span className="font-semibold">{data.quantity} {data.materialsUsed}</span>
                  </p>
                </div>
                <p className="text-2xl font-bold ">Price: ${data.price}</p>
                <button className="w-full bg-[#899878] text-white px-6 py-3 rounded-xl text-xl font-semibold hover:bg-[#7a8968] transition-colors duration-300 transform hover:scale-105">
                  BUY
                </button>
              </div>
            ) : (
              <div className="flex justify-end items-center h-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#899878]"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovativeProdOverview;  