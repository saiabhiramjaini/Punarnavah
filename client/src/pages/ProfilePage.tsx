import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import { UserType } from "@abhiram2k03/punarnavah-common";
import { backendUrl } from "../utils/config";
import Navbar from "../components/Navbar";
import { Button } from "../components/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoadingComp } from "../components/LoadingComp";
import { ErrorMsgComp } from "../components/ErrorMsgComp";

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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/user`);
        setUserData(response.data.validatedUserData);
      } catch (err: any) {
        if (err.response.status === 401) {
          toast.error("Unauthorized access. Please login to continue.");
          localStorage.removeItem("token");
          navigate("/signin");
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

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/v1/auth/logout`);
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/signin");
      }
    } catch (err: any) {
      if (err.response.status === 401) {
        toast.error("Unauthorized access. Please login to continue.");
        localStorage.removeItem("token");
        navigate("/signin");
      }
      toast.error("Failed to logout. Please try again later.");
    }
  };

  const renderTable = (data: any[], columns: string[], sectionType: string) => (
    <div className="overflow-x-auto">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
            {/* Conditionally add the Action column only for Waste Requests */}
            {sectionType === "Waste Requests" && (
              <th
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={item.id || index}>
              {columns.map((column) => {
                const key = column;
                return (
                  <td key={column} className="px-3 py-2 whitespace-nowrap">
                    {column.toLowerCase() === "image" ? (
                      <img
                        src={item[key] || item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <div className="text-xs sm:text-sm text-gray-900">
                        {item[key] !== undefined ? item[key] : item[column]}
                      </div>
                    )}
                  </td>
                );
              })}
              {/* Conditionally render the Pay button only for Waste Requests and when remainingQuantity is 0 */}
              {sectionType === "Waste Requests" && (
                <td className="px-3 py-2 whitespace-nowrap">
                  {item.remainingQuantity === 0 ? (
                    <button
                    className="bg-secondary text-white px-3 py-1 rounded text-sm hover:bg-white hover:text-secondary border border-secondary"
                    onClick={() => navigate(`/satisfied-waste/checkout/${item.id}`, { 
                      state: { 
                        name: item.name, 
                        quantity: item.requiredQuantity, 
                        price: item.price 
                      } 
                    })}
                  >
                    Pay
                  </button>
                  
                  ) : (
                    <span className="text-gray-400 text-xs">Not eligible</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSection = (
    title: string,
    section: Section,
    columns: string[]
  ) => (
    <div className="bg-white shadow overflow-hidden rounded-lg mt-4">
      <div
        className="px-3 py-3 sm:px-4 flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection(section)}
      >
        <h3 className="text-base sm:text-lg font-medium text-gray-900 text-center">
          {title}
        </h3>
        {openSections[section] ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </div>
      {openSections[section] && (
        <div className="border-t border-gray-200">
          {renderTable(userData?.[section] || [], columns, title)}
        </div>
      )}
    </div>
  );

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingComp />
      </div>
    );
  if (error)
    return (
      <ErrorMsgComp error={error!} />
    );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                User Profile
              </h1>
              <div className="mt-2">
                <p className="text-sm">{userData!.email}</p>
                <p className="text-sm">{userData!.username}</p>
              </div>
            </div>
            <Button text="Logout" onClick={handleLogout} />
          </div>

          <div className="mt-6 space-y-4">
            {renderSection("Waste Requests", "wasteRequests", [
              "image",
              "name",
              "price",
              "requiredQuantity",
              "remainingQuantity",
            ])}
            {renderSection("Contributions", "contributions", [
              "mobile",
              "address",
              "city",
              "state",
              "pincode",
              "quantity",
            ])}
            {renderSection("Innovative Products", "innovativeProducts", [
              "image",
              "name",
              "description",
              "price",
              "quantity",
            ])}
            {renderSection("Waste Request Orders", "wasteReqOrders", [
              "amount",
              "mobile",
              "address",
              "status",
            ])}
            {renderSection(
              "Innovative Product Orders",
              "innovativeProdOrders",
              ["amount", "mobile", "address", "status"]
            )}
            {renderSection("Bulk Waste Orders", "bulkWasteOrders", [
              "amount",
              "mobile",
              "address",
              "status",
            ])}
          </div>
        </div>
      </div>
    </div>
  );
};
