import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="text-sm  flex justify-center items-center gap-4 flex-col">
      <Helmet>
        <title>Carvex</title>
      </Helmet>
      <h1 className="text-7xl uppercase font-extrabold font-antonio">Home</h1>
    </div>
  );
};

export default Home;
