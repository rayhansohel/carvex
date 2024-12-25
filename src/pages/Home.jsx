import { Helmet } from "react-helmet-async";
import Banner from './../components/Banner';

const Home = () => {
  return (
    <div className="text-sm  flex justify-center items-center gap-4 flex-col">
      <Helmet>
        <title>Carvex</title>
      </Helmet>
      <Banner/>
    </div>
  );
};

export default Home;
