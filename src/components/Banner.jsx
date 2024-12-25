import { Link } from "react-router-dom";
import BrandLogoLight from "../assets/carvex-logo/caevex-text-logo-light.png";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="relative w-full h-[650px] bg-black bg-cover bg-center bg-hero">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
        {/* Motivational Heading with Framer Motion */}
        <motion.h1
          className="font-antonio text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Drive Your Dreams Today!
        </motion.h1>

        {/* Brand Logo with Framer Motion */}
        <motion.div
          className="flex items-center my-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Link to="/">
            <div className="flex items-center justify-center">
              <img src={BrandLogoLight} alt="Brand Logo" className="w-40 md:w-60" />
            </div>
          </Link>
        </motion.div>

        {/* Call-to-Action Button with Framer Motion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Link
            to="/available-cars"
            className="btn btn-sm btn-secondary"
          >
            View Available Cars
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
