import { Helmet } from "react-helmet-async";

const AvailableCars = () => {
  return (
    <div className="text-sm  flex justify-center items-center gap-4 flex-col">
      <Helmet>
        <title>Available Cars- Carvex</title>
      </Helmet>
      <h1 className="text-7xl uppercase font-extrabold font-antonio">
        Available Cars
      </h1>
    </div>
  );
};

export default AvailableCars;
