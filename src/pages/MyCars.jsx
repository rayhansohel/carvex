import { Helmet } from "react-helmet-async";

const MyCars = () => {
  return (
    <div className="text-sm flex justify-center items-center gap-4 flex-col">
      <Helmet>
        <title>My Cars- Carvex</title>
      </Helmet>
      <h1 className="text-7xl uppercase font-extrabold font-antonio">My Cars</h1>
    </div>
  );
};

export default MyCars;
