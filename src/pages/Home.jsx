import { Helmet } from "react-helmet-async";
import WhyChooseUs from "../components/WhyChooseUs";
import SpecialOffers from "../components/SpecialOffers";
import RecentCarListings from "../components/RecentCarListings";
import Banner from "../components/Banner";
import Newsletter from './../components/Newsletter';


const Home = () => {
  return (
    <div className="flex justify-center items-center gap-4 flex-col">
      <Helmet>
        <title>Carvex</title>
      </Helmet>
      <Banner/>
      <RecentCarListings/>
      <WhyChooseUs/>
      <SpecialOffers/>
      <Newsletter/>
    </div>
  );
};

export default Home;
