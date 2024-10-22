import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import { UserType } from "@abhiram2k03/punarnavah-common";
import { backendUrl } from "../utils/config";
import Navbar from "../components/Navbar";
import { Button } from "../components/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/loading.json";

type Section =
  | "wasteRequests"
  | "contributions"
  | "innovativeProducts"
  | "wasteReqOrders"
  | "innovativeProdOrders"
  | "bulkWasteOrders";

export const ProfilePage = () => {
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openSections, setOpenSections] = useState<Record<Section, boolean>>({
    wasteRequests: false,
    contributions: false,
    innovativeProducts: false,
    wasteReqOrders: false,
    innovativeProdOrders: false,
    bulkWasteOrders: false,
  });

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/user`);
        setUserData(response.data.validatedUserData);
      } catch (err: any) {
        if(err.response.status === 401) {
          toast.error("Unauthorized access. Please login to continue.");
          localStorage.removeItem("token");
          navigate("/signin")
        }
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const toggleSection = (section: Section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const renderTable = (data: any[], columns: string[]) => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr key={item.id || index}>
            {columns.map((column) => (
              <td key={column} className="px-6 py-4 whitespace-nowrap">
                {column.toLowerCase() === "image" ? (
                  <img
                    src={item[column.toLowerCase()]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                ) : (
                  <div className="text-sm text-gray-900">
                    {item[column.toLowerCase()]}
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderSection = (
    title: string,
    section: Section,
    columns: string[]
  ) => (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-4">
      <div
        className="px-4 py-5 sm:px-6 flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection(section)}
      >
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        {openSections[section] ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </div>
      {openSections[section] && (
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <div className="sm:px-6 sm:py-5">
            {renderTable(userData?.[section] || [], columns)}
          </div>
        </div>
      )}
    </div>
  );

  if (loading) return <p className="text-center mt-8 w-screen h-screen flex justify-center items-center"> <Lottie animationData={loadingAnimation} className="h-24 w-24"/> </p>;
  if (error) return <p className="text-center mt-8 text-red-600 w-screen h-screen">{error}</p>;

  return (
    <>
      <Navbar />

      <div className="w-screen flex justify-center items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="flex  flex-col mb-6">
              <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
              <div className="mt-3">
                <p>{userData!.email}</p>
                <p>{userData!.username}</p>
              </div>
            </div>
            <Button text={"Logout"} onClick={handleLogout} />
          </div>
          {renderSection("Waste Requests", "wasteRequests", [
            "Image",
            "Name",
            "Description",
            "Required Quantity",
            "Remaining Quantity",
            "Price",
          ])}
          {renderSection("Contributions", "contributions", [
            "Mobile",
            "Address",
            "City",
            "State",
            "Pincode",
            "Quantity",
          ])}
          {renderSection("Innovative Products", "innovativeProducts", [
            "Image",
            "Name",
            "Description",
            "Price",
            "Quantity",
          ])}
          {renderSection("Waste Request Orders", "wasteReqOrders", [
            "Amount",
            "Mobile",
            "Address",
            "Status",
          ])}
          {renderSection("Innovative Product Orders", "innovativeProdOrders", [
            "Amount",
            "Mobile",
            "Address",
            "Status",
          ])}
          {renderSection("Bulk Waste Orders", "bulkWasteOrders", [
            "Amount",
            "Mobile",
            "Address",
            "Status",
          ])}
        </div>
      </div>
    </>
  );
};
