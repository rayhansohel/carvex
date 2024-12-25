import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const AddCar = () => {
  return (
    <div>
      <Helmet>
        <title>Add Car- Carvex</title>
      </Helmet>
      {/* Page Banner*/}
      <div className="relative w-full h-[300px] bg-black bg-cover bg-center bg-addcar">
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
          {/* Motivational Heading with Framer Motion */}
          <motion.h1
            className="font-antonio text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Add Car
          </motion.h1>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
