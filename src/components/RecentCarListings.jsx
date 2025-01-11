import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/Loading.json";

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

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Lottie animationData={loadingAnimation} className="w-32" />
      </div>
    );
  }

  if (error) {
    return <p className="text-lg text-red-500">Error: {error}</p>;
  }

  return (
    <section className="px-4 py-4 md:py-20">
      <div className="container mx-auto">
        <h2 className="font-antonio text-2xl md:text-3xl font-bold text-center mb-8">
          Recent Car Listings
        </h2>

        {cars.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No cars available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 w-full">
            {cars.map((car) => {
              const isAvailable = car.availability;

              return (
                <div
                  key={car._id}
                  className="flex flex-col bg-base-200 rounded-3xl hover:shadow-lg overflow-hidden"
                >
                  <div className="max-h-40 object-cover">
                    <img
                      src={
                        car.images.length > 0
                          ? `https://carvex-server.vercel.app/${car.images[0]}`
                          : car.imageUrl
                      }
                      alt={car.carModel}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between w-full gap-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {car.carModel}
                    </h3>
                    <p>${car.dailyRentalPrice}/day</p>
                    <p>Bookings: {car.bookingCount}</p>
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
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentCarListings;
