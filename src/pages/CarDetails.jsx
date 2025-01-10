import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  console.log("Car ID from URL:", id);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(
          `https://carvex-server.vercel.app/cars/${id}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch car details: ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log("Fetched car data:", data);
        setCar(data);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
  };

  const handleConfirmBooking = () => {
    // Placeholder for booking logic
    setShowBookingModal(false);
    navigate("/booking-confirmation");
  };

  if (loading) {
    return (
      <div className="flex justify-center mb-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex justify-center">
        <p className="text-lg">Car not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{car.carModel} - Carvex</title>
      </Helmet>

      {/* Page Banner */}
      <div className="relative w-full h-[300px] bg-black bg-cover bg-center bg-cardetails">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
          <motion.h1
            className="font-antonio text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {car.carModel}
          </motion.h1>
        </div>
      </div>

      <section className="px-4 py-4 md:py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-base-200 ">
            <div>
              {car.images && car.images.length > 0 ? (
                car.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={`https://carvex-server.vercel.app/${image}`}
                      alt={`${car.carModel} - Image ${index + 1}`}
                      className="w-full max-h-[400px] object-cover rounded-l-3xl"
                    />
                  </div>
                ))
              ) : car.imageUrl ? (
                <div>
                  <img
                    src={car.imageUrl}
                    alt={`${car.carModel} - Default Image`}
                    className="w-full max-h-[400px] object-cover rounded-l-3xl"
                  />
                </div>
              ) : (
                <div>
                  <p className="text-center">No images available</p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {car.carModel}
              </h2>
              <p className="text-xl text-secondary font-semibold mb-2">
                ${car.dailyRentalPrice}/day
              </p>
              <p className="mb-4">
                <span
                  className={`badge ${
                    car.availability
                      ? "bg-green-500 text-white"
                      : "bg-secondary text-white"
                  }`}
                >
                  {car.availability ? "Available" : "Not Available"}
                </span>
              </p>
              <h3 className="text-xl font-bold mb-2">Features</h3>
              <p className="mb-4">{car.features}</p>
              <h3 className="text-xl font-bold mb-2">Description</h3>
              <p className="mb-4">{car.description}</p>
              <button
                className="btn btn-sm btn-primary"
                onClick={handleBookNow}
                disabled={!car.availability}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-base-200 p-8  shadow-lg w-full max-w-md">
            <h3 className="text-center text-2xl font-bold mb-4">
              Booking Confirmation
            </h3>
            <p className="text-center mb-4">
              You are about to book the {car.carModel} for $
              {car.dailyRentalPrice}
              /day.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="btn btn-sm btn-accent"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
