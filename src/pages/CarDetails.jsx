import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import loadingAnimation from "../assets/animations/Loading.json";
import Lottie from "lottie-react";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`https://carvex-server.vercel.app/cars/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }
        const data = await response.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

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

  if (!car) {
    return <p className="text-lg text-gray-500">Car details not found.</p>;
  }

  return (
    <div>
      <Helmet>
        <title>{car.carModel} - Car Details</title>
      </Helmet>

      {/* Page Banner */}
      <div className="relative w-full h-[300px] bg-black bg-cover bg-center bg-car-details">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
          <h1 className="font-antonio text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg uppercase">
            {car.carModel}
          </h1>
        </div>
      </div>

      <section className="px-4 py-10 md:py-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Car Images */}
            <div className="w-full md:w-1/2 max-h-[500px] rounded-3xl overflow-hidden">
              <img
                src={
                  car.images?.length > 0
                    ? `https://carvex-server.vercel.app/${car.images[0]}`
                    : car.imageUrl
                }
                alt={car.carModel}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Car Details */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <h2 className="text-5xl font-bold">{car.carModel}</h2>
              <p>
                <span
                  className={`badge ${
                    car.availability
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {car.availability ? "Available" : "Not Available"}
                </span>
              </p>
              <p >
                <strong>Location:</strong> {car.location}
              </p>
              <p>
                <strong>Price Per Day:</strong> ${car.dailyRentalPrice}/day
              </p>
              <p>
                <strong>Features:</strong>{" "}
                {Array.isArray(car.features)
                  ? car.features.join(", ")
                  : typeof car.features === "string"
                  ? car.features
                  : "No features available."}
              </p>
              <p>
                <strong>Description:</strong> {car.description || "No description provided."}
              </p>
              <p>
                <strong>Published:</strong> {moment(car.createdAt).fromNow()}
              </p>

              {/* Book Now Button */}
              {car.availability && (
                <button
                  onClick={toggleModal}
                  className="btn btn-sm btn-primary mt-4 w-fit"
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-base-100 rounded-3xl p-8 text-center w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
            <p>
              <strong>Model:</strong> {car.carModel}
            </p>
            <p>
              <strong>Price Per Day:</strong> ${car.dailyRentalPrice}
            </p>
            <p>
              <strong>Location:</strong> {car.location}
            </p>
            <p>
              <strong>Features:</strong>{" "}
              {Array.isArray(car.features)
                ? car.features.join(", ")
                : typeof car.features === "string"
                ? car.features
                : "No features available."}
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={toggleModal}
                className="btn btn-sm btn-secondary"
              >
                Cancel
              </button>
              <button className="btn btn-sm btn-primary">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
