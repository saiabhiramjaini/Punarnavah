interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
}

export const FeatureCard = ({
  title,
  description,
  image,
}: FeatureCardProps) => {
  return (
    <div className="bg-gray-200 rounded-3xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between flex-col h-full">
        <div>
          <div className="text-[#562C2C] text-xl sm:text-2xl md:text-3xl font-medium">
            {title}
          </div>
          <div className="text-[#562C2C] text-xs sm:text-sm md:text-base mt-2 sm:mt-3 md:mt-4">
            {description}
          </div>
        </div>
      
      <div className="flex justify-center items-center mt-4 sm:mt-6">
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-contain max-w-[200px] sm:max-w-[250px] md:max-w-[300px]"
        />
      </div>
      </div>
    </div>
  );
};
