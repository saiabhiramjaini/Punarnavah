import bulkWasteImage from "../assets/images/bulkWaste.png";
import artisanImage from "../assets/images/artisan.png";
import contribution from "../assets/images/contribution.png";
import marketPlaceImage from "../assets/images/marketplace.png";
import logo from "../assets/images/logo.png";
import { BsTwitterX } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { SiFacebook } from "react-icons/si";
import { FeatureCard } from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="min-h-screen w-full overflow-x-hidden">
        {/* Hero component */}
        <div className="min-h-[30vh] sm:min-h-[40vh] md:min-h-[50vh] flex flex-col justify-center items-center px-4 bg-white">
          <div className="flex justify-between w-full md:w-2/3 mb-4 sm:mb-6 md:mb-10">
            <button onClick={() => navigate("/home")} className="text-sm sm:text-base">Home</button>
            <button onClick={() => navigate("/signup")} className="text-sm sm:text-base">Signup</button>
          </div>
          <div className="font-limeLight text-3xl sm:text-6xl md:text-7xl lg:text-9xl text-center">
            PUNARNAVAH
          </div>
        </div>

        {/* Welcome msg and lottie animation */}
        <div className="py-12 md:min-h-[50vh] bg-secondary flex flex-col md:flex-row justify-center gap-8 px-4 md:px-8">
          <div className="flex flex-col justify-center w-full md:w-1/3">
            <div className="font-limeLight mb-4 text-2xl md:text-4xl">
              Welcome to a Greener Global Future
            </div>
            <div className="text-white text-base md:text-lg">
              Meet Punarnavah—your friendly neighborhood waste processor with a
              twist: We don't just dispose of it, we spin it into gold! No
              really, we're transforming waste into an economic opportunity.
              Pioneers in shaking up the circular economy, we connect
              communities, artisans, and industries in the never-ending cycle of
              waste upcycling.
            </div>
          </div>
          <div className="flex flex-col justify-center items-center sm:items-end w-full md:w-1/3 min-h-[200px]">
            <img src={logo} alt=""  className="h-72 w-72"/>
          </div>
        </div>

        {/* Black bg section */}
        <div className="bg-black py-12 md:py-20">
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
              <button onClick={()=>navigate('/signup')}className="bg-white px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Join Now
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-6 md:gap-10 justify-center items-center mt-20 md:mt-40">
            <div className="flex gap-8 text-xl">
              <a
                href="#"
                className="text-[#E4E6C3] hover:text-white transition-colors"
              >
                <BsTwitterX />
              </a>
              <a
                href="#"
                className="text-[#E4E6C3] hover:text-white transition-colors"
              >
                <BsInstagram />
              </a>
              <a
                href="#"
                className="text-[#E4E6C3] hover:text-white transition-colors"
              >
                <SiFacebook />
              </a>
            </div>
            <div className="text-[#E4E6C3] text-sm text-center px-4">
              © 2024 Punarnavah. Eco-Warriors unite!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};