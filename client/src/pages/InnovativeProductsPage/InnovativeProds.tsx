import { useEffect, useState } from 'react';
import { InnovativeProductType } from '@abhiram2k03/punarnavah-common';
import axios from 'axios';
import { backendUrl } from '../../utils/config';
import Card from '../../components/Card';
import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { LoadingComp } from '../../components/LoadingComp';
import { ErrorMsgComp } from '../../components/ErrorMsgComp';

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

  const filteredData = data.filter((data) =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="container mx-auto px-2 sm:px-4 max-w-7xl">
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <LoadingComp/>
          </div>
        ) : error ? (
          <ErrorMsgComp error={error!} />
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