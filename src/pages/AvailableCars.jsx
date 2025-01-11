import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { IoGridOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import loadingAnimation from "../assets/animations/Loading.json";
import Lottie from "lottie-react";

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
    return searchRegex.test(car.carModel) || searchRegex.test(car.location);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Lottie animationData={loadingAnimation} className="w-32" />
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
          <h1 className="font-antonio text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg uppercase">
            Available Cars
          </h1>
        </div>
      </div>

      <section className="px-4 py-6 md:py-20">
        <div className="container mx-auto">
          <div className="mb-8 lg:flex justify-between items-center">
            <div className="md:flex items-center  justify-between gap-4 w-full">
              <div className="flex items-center w-full mb-4">
                <input
                  type="text"
                  placeholder="Search by Car Model or Location..."
                  className="input input-sm input-bordered w-full md:w-80 rounded-full"
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

              <div className="flex items-center justify-between md:justify-end gap-2 w-full mb-4">
                <select
                  className="select select-sm select-bordered rounded-full"
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
                    className={`btn btn-sm w-8 p-0 ${
                      viewMode === "grid" ? "btn-active" : ""
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <IoGridOutline className="text-md" />
                  </button>
                  <button
                    className={`btn btn-sm w-8 p-0 ${
                      viewMode === "list" ? "btn-active" : ""
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <FaList className="text-md" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {sortedCars.length === 0 ? (
            <p className="text-center text-lg text-gray-500">
              No cars available.
            </p>
          ) : (
            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 gap-8"
              } gap-8 w-full`}
            >
              {sortedCars.map((car) => (
                <div
                  key={car._id}
                  className={`flex ${
                    viewMode === "list" ? "flex-row  md:gap-10" : "flex-col bg-base-200 rounded-3xl hover:shadow-lg"
                  } overflow-hidden`}
                >
                  {/* Image Section */}
                  <div
                    className={`${
                      viewMode === "list" ? "w-1/2 md:w1/3 max-h-72 rounded-3xl overflow-hidden" : "w-full max-h-60"
                    } object-cover`}
                  >
                    <img
                      src={
                        car.images.length > 0
                          ? `https://carvex-server.vercel.app/${car.images[0]}`
                          : car.imageUrl
                      }
                      alt={car.carModel}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div
                    className={`p-6 flex flex-col justify-between ${
                      viewMode === "list" ? "w-1/2 md:w-2/3 border-y border-base-300" : "w-full"
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {car.carModel}
                    </h3>
                    <div className="flex items-center mb-2">
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
                    <p>${car.dailyRentalPrice}/day</p>
                    <p>Bookings: {car.bookingCount}</p>
                    <p>Location: {car.location}</p>
                    <p>Published: {moment(car.createdAt).fromNow()}</p>
                    <div className="flex">
                      <Link
                        to={`/cars/${car._id}`} 
                        className="btn btn-sm btn-primary mt-4"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AvailableCars;
