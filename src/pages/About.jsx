import { Helmet } from "react-helmet-async";
import WhyChooseUs from "../components/WhyChooseUs";

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About - Carvex</title>
      </Helmet>

      {/* Page Banner */}
      <div className="relative w-full h-[300px] bg-black bg-cover bg-center bg-aboutus">
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
          {/* Motivational Heading */}
          <h1 className="font-antonio text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg uppercase">
            About Carvex
          </h1>
        </div>
      </div>

      <div className="px-4 py-6 md:py-20">
        {/* Our Mission */}
        <div className="bg-base-200 p-8 rounded-3xl container mx-auto">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Our Mission
          </h2>
          <p>
            At Carvex, we believe that every journey should be seamless,
            exciting, and hassle-free. Our mission is to provide reliable and
            affordable car rental services that allow you to explore the world
            on your terms. Whether you're heading on a business trip or a
            spontaneous adventure, we ensure a smooth and comfortable ride every
            time.
          </p>
        </div>

        {/* Why Choose Carvex? */}
        <div className="pt-6 md:pt-20">
          <WhyChooseUs />
        </div>

        {/* Our Fleet */}
        <div className="bg-base-200 p-8 rounded-3xl py-6 md:py-20 container mx-auto">
          <h2 className="text-2xl font-semibold text-primary mb-4 text-center">
            Our Fleet
          </h2>
          <p>
            Our diverse fleet includes economy cars for budget-conscious
            travelers, spacious SUVs for family trips, and premium luxury cars
            for those who seek style and comfort. Every vehicle is
            well-maintained, ensuring a safe and enjoyable driving experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
