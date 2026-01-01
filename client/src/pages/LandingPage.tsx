import bulkWasteImage from "../assets/images/bulkWaste.png";
import artisanImage from "../assets/images/artisan.png";
import contribution from "../assets/images/contribution.png";
import marketPlaceImage from "../assets/images/marketplace.png";
import logo from "../assets/images/logo.png";
import { FeatureCard } from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export const LandingPage = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="min-h-screen w-full overflow-x-hidden">
        {/* Hero - Minimal Split Layout */}
        <div className="min-h-screen flex flex-col lg:flex-row">
          {/* Left - Logo Section */}
          <div className="lg:w-2/5 min-h-[35vh] lg:min-h-screen bg-muted/30 flex items-center justify-center p-8 lg:p-12 relative">
            {/* Decorative accent line */}
            <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary hidden lg:block" />

            <div className="relative">
              <img
                src={logo}
                alt="Punarnavah"
                className="h-40 w-40 sm:h-56 sm:w-56 lg:h-72 lg:w-72 object-contain drop-shadow-sm"
              />
            </div>
          </div>

          {/* Right - Content Section */}
          <div className="lg:w-3/5 min-h-[65vh] lg:min-h-screen bg-background flex flex-col justify-center p-8 sm:p-12 lg:p-20">
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-primary" />
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
                  Circular Economy
                </span>
              </div>

              {/* Title */}
              <h1 className="font-limeLight text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-[0.9] mb-6">
                PUNARNAVAH
              </h1>

              {/* Description */}
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10 max-w-md">
                Where waste becomes wealth. <br /> Connecting communities, artisans, and industries in the cycle of sustainable upcycling.
              </p>

              {/* CTA Group */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate("/signup")}
                  size="lg"
                  className="px-8"
                >
                  Get Started
                </Button>
                <Button
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="outline"
                  size="lg"
                  className="px-8"
                >
                  Explore
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Black bg section */}
        <div id="features" className="bg-black py-12 md:py-20">
          {/* Feature Highlights */}
          <div className="flex justify-center items-center my-5 px-4">
            <div className="w-full md:w-2/3">
              <div className="font-limeLight text-white text-3xl md:text-4xl mb-2">
                Feature Highlights
              </div>
              <div className="text-[#E4E6C3]">
                Connecting dots in the circular economy, here's how we turn
                waste into wonders:
              </div>
            </div>
          </div>

          {/* Features cards */}
          <div className="flex justify-center items-center px-4">
            <div className="bg-white w-full md:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-20 p-6 lg:p-20">
              <FeatureCard
                title="Artisans' Hub"
                description="A platform that enables artisans to source sustainable raw materials for their creations and showcase their unique, often overlooked skills by crafting innovative items."
                image={artisanImage}
              />
              <FeatureCard
                title="Waste Contribution"
                description="A space for contributing waste materials to support up-cycling and eco-friendly practices."
                image={contribution}
              />
              <FeatureCard
                title="Marketplace"
                description="A marketplace for innovative, handcrafted products by artisans using waste materials to support the circular economy."
                image={marketPlaceImage}
              />
              <FeatureCard
                title="Bulk Waste"
                description="Facilitating access to municipal solid waste and managing it in bulk, either supplying raw materials to industries or providing resources to artisans for creative upcycling."
                image={bulkWasteImage}
              />
            </div>
          </div>

          {/* Profitability cycle */}
          <div className="flex flex-col gap-6 md:gap-10 mt-16 md:mt-20 justify-center items-center px-4">
            <div className="text-[#E4E6C3] font-limeLight text-3xl md:text-4xl text-center">
              The Cycle of Profitable Sustainability
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-20 w-full md:w-2/3">
              <div className="text-white text-sm">
                We believe waste isn't waste until we waste it! Join us to see how each element of our platform gears
                towards a sustainable, waste-free future.
              </div>
              <div className="text-white text-sm">
                Untangle the complex cycle of waste management and understand
                your role in it. Together, let's build a world where we convert
                our waste into wealth — one disposed item at a time!
              </div>
            </div>
          </div>

          {/* Ready to Transform Trash? */}
          <div className="flex flex-col gap-6 md:gap-10 mt-16 md:mt-20 justify-center items-center px-4">
            <div className="text-[#E4E6C3] font-limeLight text-3xl md:text-4xl text-center">
              Ready to Transform Trash?
            </div>
            <div className="text-[#E4E6C3] text-sm w-full md:w-1/3 text-center">
              Whether you're a household, an artisan, or an industry, Punarnavah
              has something for everyone. Join us now and make your contribution
              to our green cause. Sign up below and get your garbage goals
              going!
            </div>
            <div>
              <Button onClick={() => navigate('/signup')} className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Join Now
              </Button>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};