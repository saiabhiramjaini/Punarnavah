import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl md:text-3xl text-primary">
          {title}
        </CardTitle>
        <CardDescription className="text-sm md:text-base mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-contain max-w-[200px] sm:max-w-[250px] md:max-w-[300px]"
        />
      </CardContent>
    </Card>
  );
};
