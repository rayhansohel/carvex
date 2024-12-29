import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/Loading.json";
import moment from "moment";

const RecentCarListings = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("https://carvex-server.vercel.app/cars");
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        const sortedCars = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        setCars(sortedCars);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center mb-4">
        <Lottie animationData={loadingAnimation} className="w-32" />
      </div>
    );
  }

  if (error) {
    return <p className="text-lg text-red-500">Error: {error}</p>;
  }

  return (
    <section className="px-4 pb-4 md:pb-20">
      <div className="container mx-auto">
        <h2 className="font-antonio text-2xl md:text-3xl font-bold text-center mb-8">
          Recent Car Listings
        </h2>

        {cars.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No cars available at the moment.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cars.map((car, index) => {
              const isAvailable = car.availability;
              const datePosted = moment(car.createdAt).fromNow();

              return (
                <motion.div
                  key={car._id}
                  className="flex flex-col md:flex-row items-center bg-base-200 rounded-3xl hover:shadow-lg overflow-hidden"
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400 },
                  }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={
                      car.images.length > 0
                        ? `https://carvex-server.vercel.app/${car.images[0]}`
                        : car.imageUrl
                    }
                    alt={car.carModel}
                    className="w-full h-full md:w-1/2 object-cover"
                  />
                  <div className="p-6 flex flex-col justify-between w-full h-full md:w-1/2 gap-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {car.carModel}
                    </h3>
                    <p>${car.dailyRentalPrice}/day</p>
                    <p>Bookings: {car.bookingCount}</p>
                    <p>Published: {datePosted}</p>
                    <div className="flex items-center">
                      <span
                        className={`badge ${
                          isAvailable
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {isAvailable ? "Available" : "Not Available"}
                      </span>
                    </div>
                    <div className="flex">
                      <Link
                        to={`/cars/${car._id}`}
                        className="btn btn-sm btn-primary mt-4"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RecentCarListings;
