import { useEffect, useState } from 'react';
import { InnovativeProductType } from '../utils/schema';
import axios from 'axios';
import { backendUrl } from '../utils/config';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

export const InnovativeProds = () => {
  const [data, setData] = useState<InnovativeProductType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/innovative-prod`);
        setData(response.data.validatedProducts);

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleCardClick = (id : string) => {
    navigate(`/innovative-prod-overview/${id}`);
  };

  const filteredData = data.filter((data) =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="z-10 relative">
        <Navbar />
      </div>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div
        className="flex flex-col" 
      >
        <div className="grid grid-cols-4 gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <Card
                key={index}
                id={item.id}
                name={item.name}
                description={item.description}
                image={item.image}
                linkText="View More"
                handleCardClick={()=>{handleCardClick(item.id)}}
              />
            ))
          ) : searchQuery ? ( 
            <div className="text-center col-span-4">No data found</div>
          ) : (
            data.map((item, index) => (
              <Card
                key={index}
                id={item.id}
                name={item.name}
                description={item.description}
                image={item.image}
                linkText="View More"
                handleCardClick={()=>{handleCardClick(item.id)}}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};