import { useEffect, useState } from "react";
import { InnovativeProductType } from "@abhiram2k03/punarnavah-common";
import axios from "axios";
import { backendUrl } from "../../utils/config";
import Navbar from "../../components/Navbar";
import { ProductCard } from "../../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { LoadingComp } from "../../components/LoadingComp";
import { Search, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";

export const InnovativeProds = () => {
  const [data, setData] = useState<InnovativeProductType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/v1/innovative-prod`);
        setData(response.data.validatedProducts);
      } catch (error) {
        setError("An error occurred. Cannot fetch data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/innovative-prod-overview/${id}`);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayData = filteredData.length > 0 ? filteredData : (!searchQuery ? data : []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header Section */}
      <div className="bg-primary/80 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary-foreground/20 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-secondary-foreground">
                  Marketplace
                </h1>
                <p className="text-secondary-foreground/70 text-sm">
                  Innovative products made from upcycled materials
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="w-full sm:w-72">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-11 bg-background border-none shadow-lg rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <LoadingComp />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-destructive">{error}</p>
          </div>
        ) : displayData.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try a different search term" : "Check back later for new products"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayData.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                image={item.image}
                price={item.price}
                onClick={() => handleCardClick(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InnovativeProds;