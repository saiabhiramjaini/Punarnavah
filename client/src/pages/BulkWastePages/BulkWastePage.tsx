import { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../../utils/config';
import Card from '../../components/Card';
import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { BulkWasteType } from '@abhiram2k03/punarnavah-common';
import loadingAnimation from '../../assets/lottie/loading.json';
import Lottie from 'lottie-react';

export const BulkWastePage = () => {
  const [data, setData] = useState<BulkWasteType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/v1/bulk-waste`);
        setData(response.data.validatedWaste);
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
    navigate(`/bulk-waste-overview/${id}`);
  };

  const filteredData = data.filter((data) =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="container mx-auto px-2 sm:px-4 max-w-7xl">
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Lottie animationData={loadingAnimation} className="h-24 w-24"/> 
          </div>
        ) : error ? (
          <div className="text-center text-red-500 flex justify-center items-center min-h-[60vh]">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <div key={index} className="flex justify-center">
                  <Card
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    image={item.image}
                    linkText="View More"
                    handleCardClick={() => handleCardClick(item.id)}
                  />
                </div>
              ))
            ) : searchQuery ? (
              <div className="text-center col-span-full">No data found</div>
            ) : (
              data.map((item, index) => (
                <div key={index} className="flex justify-center">
                  <Card
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    image={item.image}
                    linkText="View More"
                    handleCardClick={() => handleCardClick(item.id)}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};