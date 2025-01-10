import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { IoGridOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("https://carvex-server.vercel.app/cars");
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const searchRegex = new RegExp(searchTerm, "i");
    return (
      searchRegex.test(car.carModel) || // Filter by car model
      searchRegex.test(car.location) // Filter by location
    );
  });

  const sortedCars = filteredCars.sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === "priceAsc") {
      return a.dailyRentalPrice - b.dailyRentalPrice;
    } else {
      return b.dailyRentalPrice - a.dailyRentalPrice;
    }
  });

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
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-lg text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <Helmet>
        <title>Available Cars - Carvex</title>
      </Helmet>
      {/* Page Banner */}
      <div className="relative w-full h-[300px] bg-black bg-cover bg-center bg-availablecar">
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
          {/* Motivational Heading with Framer Motion */}
          <motion.h1
            className="font-antonio text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Available Cars
          </motion.h1>
        </div>
      </div>

      <section className="px-4 py-4 md:py-20">
        <div className="container mx-auto">
          <h2 className="font-antonio text-2xl md:text-3xl font-bold text-center mb-8">
            Available Cars
          </h2>

          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center justify-between gap-4 w-full">
              <div>
                <input
                  type="text"
                  placeholder="Search by Car Model or Location..."
                  className="input input-sm input-bordered w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* Clear Search Button */}
                {searchTerm && (
                  <button
                    className="btn btn-sm btn-accent ml-2"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex gap-4">
                <select
                  className="select select-sm select-bordered"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                </select>

                <div className="flex gap-2">
                  <button
                    className={`btn btn-sm ${
                      viewMode === "grid" ? "btn-active" : ""
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <IoGridOutline />
                  </button>
                  <button
                    className={`btn btn-sm ${
                      viewMode === "list" ? "btn-active" : ""
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <FaList />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {sortedCars.length === 0 ? (
            <p className="text-center text-lg text-gray-500">
              No cars available at the moment.
            </p>
          ) : (
            <motion.div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 lg:grid-cols-3"
                  : "grid-cols-1 gap-8"
              } gap-8 w-full`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sortedCars.map((car) => (
                <motion.div
                  key={car._id}
                  className={`flex flex-col md:flex-row items-center bg-base-200  hover:shadow-lg overflow-hidden max-h-72 ${
                    viewMode === "list" ? "flex-row" : ""
                  }`}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400 },
                  }}
                >
                  <img
                    src={
                      car.images.length > 0
                        ? `https://carvex-server.vercel.app/${car.images[0]}`
                        : car.imageUrl
                    }
                    alt={car.carModel}
                    className={`w-full h-full md:w-1/2 object-cover ${
                      viewMode === "list" ? "w-1/3" : ""
                    }`}
                  />
                  <div
                    className={`p-6 flex flex-col justify-between w-full h-full md:w-1/2 gap-1 ${
                      viewMode === "list" ? "w-2/3" : ""
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {car.carModel}
                    </h3>
                    <p>${car.dailyRentalPrice}/day</p>
                    <p>Bookings: {car.bookingCount}</p>
                    <p>Location: {car.location}</p>
                    <p>Published: {moment(car.createdAt).fromNow()}</p>
                    <div className="flex items-center">
                      <span
                        className={`badge ${
                          car.availability
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {car.availability ? "Available" : "Not Available"}
                      </span>
                    </div>
                    <div className="flex">
                      <Link
                        to={`/cars/${car._id}`}
                        className="btn btn-sm btn-primary mt-4"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AvailableCars;
