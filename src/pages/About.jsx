const About = () => {
    return (
      <div className="px-6 py-16 container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary">About Carvex</h1>
          <p className="text-lg text-gray-600 mt-2">The Road is Open, Let’s Go</p>
        </div>
  
        {/* Our Mission */}
        <div className="bg-base-200 p-8 rounded-xl shadow-lg mb-10">
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
          <p className="text-gray-700">
            At Carvex, we believe that every journey should be seamless, exciting, and hassle-free. Our mission is to
            provide reliable and affordable car rental services that allow you to explore the world on your terms.
            Whether you're heading on a business trip or a spontaneous adventure, we ensure a smooth and comfortable ride
            every time.
          </p>
        </div>
  
        {/* Why Choose Carvex? */}
        <div className="bg-base-100 p-8 rounded-xl shadow-lg mb-10">
          <h2 className="text-2xl font-semibold text-primary mb-4">Why Choose Carvex?</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li><strong>Wide Range of Vehicles:</strong> From economy to luxury, we have the perfect car for every trip.</li>
            <li><strong>Transparent Pricing:</strong> No hidden fees, just straightforward and affordable rates.</li>
            <li><strong>24/7 Customer Support:</strong> We're here to assist you anytime, anywhere.</li>
            <li><strong>Easy Booking Process:</strong> A hassle-free online reservation system for your convenience.</li>
          </ul>
        </div>
  
        {/* Our Fleet */}
        <div className="bg-base-200 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Fleet</h2>
          <p className="text-gray-700">
            Our diverse fleet includes economy cars for budget-conscious travelers, spacious SUVs for family trips, and
            premium luxury cars for those who seek style and comfort. Every vehicle is well-maintained, ensuring a safe and
            enjoyable driving experience.
          </p>
        </div>
      </div>
    );
  };
  
  export default About;
  