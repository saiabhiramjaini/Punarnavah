import { useState } from "react";

interface CardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  linkText: string;
  handleCardClick: (e : string)=> void
}

const Card = ({ id, name, description, image, linkText, handleCardClick }: CardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-lg my-4 mx-2 sm:my-6 sm:mx-4 md:my-8 md:mx-5 relative max-w-xs w-full bg-white border-2 border-black p-2 overflow-hidden shadow-left-bottom cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => handleCardClick(id)}
    >
      {/* Image container with scaling on hover */}
      <div
        className={`rounded-lg w-full border-2 border-black mb-2 overflow-hidden transition-all duration-300 ${hovered ? "h-52 sm:h-56" : "h-64 sm:h-72"
          }`}
      >
        <img
          src={image}
          alt="Card Image"
          className={`w-full h-full object-cover transition-transform duration-300 ${hovered ? "scale-95" : "scale-100"
            }`}
        />
      </div>

      {/* Title moves up with transition */}
      <h2
        className={`text-lg sm:text-xl font-bold mb-2 mt-5 transition-all duration-300 ${hovered ? "-translate-y-4" : "translate-y-0"
          }`}
      >
        {name}
      </h2>

      {/* Description and link text slide up on hover */}
      <div
        className={`transition-transform duration-300 ${hovered
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
          } absolute bottom-0 left-0 w-full p-2 bg-white`}
      >
        <div className="overflow-hidden max-h-20">
          <p className="text-sm mb-2 line-clamp-2">{description}</p>
        </div>
        <span className="font-bold text-md flex items-center mt-2">
          {linkText} <span className="ml-2 text-lg">→</span>
        </span>
      </div>
    </div>
  );
};

export default Card;
