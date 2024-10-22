import { motion } from "framer-motion";
import homeImage from "../assets/images/home1.png";
import Navbar from "../components/Navbar";
import Image1 from "../assets/images/1.png";
import Image2 from "../assets/images/2.png";
import Image3 from "../assets/images/3.png";
import Image4 from "../assets/images/4.png";
import Image5 from "../assets/images/5.png";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const hoverEffect = {
    rest: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <>
      <div className="h-screen w-screen bg-white">
        <Navbar />
        <div className="flex m-8 justify-center items-end bg-white">
          <div className="w-full h-full flex">
            <div className="flex flex-col items-center justify-between space-y-4 w-1/3">
              <motion.div
                className="text-center flex items-center justify-center relative"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <motion.button
                  onClick={() => {
                    navigate("/waste-req");
                  }}
                  variants={hoverEffect}
                >
                  <img src={Image1} alt=""/>
                </motion.button>
              </motion.div>

              <motion.div
                className="text-center flex items-center justify-center relative"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                whileHover="hover"
              >
                <motion.button
                  onClick={() => {
                    navigate("/innovative-prods");
                  }}
                  variants={hoverEffect}
                >
                  <img src={Image2} alt="" />
                </motion.button>
              </motion.div>

              <motion.div
                className="text-center flex items-center justify-center relative"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                whileHover="hover"
              >
                <motion.button
                  onClick={() => {
                    navigate("/bulk-waste");
                  }}
                  variants={hoverEffect}
                >
                  <img src={Image3} alt="" />
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              className="flex items-center justify-center relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 1 } }}
            >
              <img src={homeImage} alt="home" className="w-full h-auto p-2" />
            </motion.div>

            <div className="flex flex-col items-center justify-between space-y-4 w-1/3">
              <motion.div
                className="text-center flex items-center justify-center relative"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
                whileHover="hover"
              >
                <motion.button
                  onClick={() => {
                    navigate("/upload-req");
                  }}
                  variants={hoverEffect}
                >
                  <img src={Image4} alt="" />
                </motion.button>
              </motion.div>

              <motion.div
                className="text-center flex items-center justify-center relative"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
                whileHover="hover"
              >
                <motion.button
                  onClick={() => {
                    navigate("/upload-innovative-prod");
                  }}
                  variants={hoverEffect}
                >
                  <img src={Image5} alt="" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
