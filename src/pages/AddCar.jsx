import { Helmet } from "react-helmet-async";
import CarAddForm from "../components/CarAddForm";

const AddCar = () => {
  return (
    <div>
      <Helmet>
        <title>Add Car - Carvex</title>
      </Helmet>

      {/* Page Banner */}
      <div className="relative w-full h-[300px] bg-black bg-cover bg-center bg-addcar">
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
          {/* Motivational Heading */}
          <h1 className="font-antonio text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg uppercase">
            Add Car
          </h1>
        </div>
      </div>

      {/* Car Add Form */}
      <div>
        <CarAddForm />
      </div>
    </div>
  );
};

export default AddCar;
