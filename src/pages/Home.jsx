import { Helmet } from "react-helmet-async";
import Banner from './../components/Banner';
import WhyChooseUs from "../components/WhyChooseUs";
import SpecialOffers from "../components/SpecialOffers";

const Home = () => {
  return (
    <div className="flex justify-center items-center gap-4 flex-col">
      <Helmet>
        <title>Carvex</title>
      </Helmet>
      <Banner/>
      <WhyChooseUs/>
      <SpecialOffers/>
    </div>
  );
};

export default Home;
