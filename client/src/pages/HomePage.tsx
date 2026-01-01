import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { HomeFeatureCard } from "../components/HomeFeatureCard";
import { Recycle, Warehouse, Upload, ShoppingBag, Lightbulb } from "lucide-react";

// Feature metadata configuration
const browseFeatures = [
  {
    id: "waste-requests",
    title: "Waste Requests",
    description: "Discover what waste materials are in demand. Connect with artisans and industries looking for materials.",
    route: "/waste-req",
    iconName: "recycle",
  },
  {
    id: "marketplace",
    title: "Marketplace",
    description: "Explore unique handcrafted products made from upcycled materials by talented artisans.",
    route: "/innovative-prods",
    iconName: "shopping-bag",
  },
  {
    id: "bulk-waste",
    title: "Bulk Waste",
    description: "Access municipal solid waste in bulk. Perfect for industries and large-scale artisan operations.",
    route: "/bulk-waste",
    iconName: "warehouse",
  },
];

const actionFeatures = [
  {
    id: "post-request",
    title: "Post a Waste Request",
    description: "Looking for specific waste materials? Create a request and let contributors come to you.",
    route: "/upload-req",
    iconName: "upload",
  },
  {
    id: "sell-creation",
    title: "Sell Your Creation",
    description: "Are you an artisan? Showcase and sell your innovative upcycled products to a wider audience.",
    route: "/upload-innovative-prod",
    iconName: "lightbulb",
  },
];

// Icon mapping
const getIcon = (iconName: string, accent: boolean = false) => {
  const className = `w-6 h-6 ${accent ? "text-primary-foreground" : "text-primary"}`;

  switch (iconName) {
    case "recycle":
      return <Recycle className={className} />;
    case "shopping-bag":
      return <ShoppingBag className={className} />;
    case "warehouse":
      return <Warehouse className={className} />;
    case "upload":
      return <Upload className={className} />;
    case "lightbulb":
      return <Lightbulb className={className} />;
    default:
      return <Recycle className={className} />;
  }
};

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What would you like to do?
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Choose an option below to start your journey towards sustainable living
          </p>
        </div>

        {/* Feature Cards - 2 Rows: 3 + 2 */}
        <div className="space-y-6">
          {/* First Row - Browse Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {browseFeatures.map((feature) => (
              <HomeFeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={getIcon(feature.iconName)}
                onClick={() => navigate(feature.route)}
              />
            ))}
          </div>

          {/* Second Row - Action Features (Accent Cards, Centered) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {actionFeatures.map((feature) => (
              <HomeFeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={getIcon(feature.iconName, true)}
                onClick={() => navigate(feature.route)}
                accent
              />
            ))}
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mt-12 py-6 border-t border-border">
          <p className="text-muted-foreground text-sm">
            One person's waste, another's masterpiece
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;