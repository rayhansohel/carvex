import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/Loading.json";
import { Helmet } from "react-helmet-async";
import UpdateCarModal from "../components/UpdateCarModal";

const MyCarsPage = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("dateNewest");
  const [selectedCar, setSelectedCar] = useState(null);

  // Fetch cars added by the user
  useEffect(() => {
    const fetchCars = async () => {
      if (!user?.email) {
        toast.error("User not authenticated!");
        return;
      }

      try {
        const response = await fetch(
          `https://carvex-server.vercel.app/cars/user/${user.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.email) {
      fetchCars();
    }
  }, [user]);

  // Handle car deletion
  const handleDelete = async (carId) => {
    const confirm = window.confirm("Are you sure you want to delete this car?");
    if (!confirm) return;

    try {
      const response = await fetch(
        `https://carvex-server.vercel.app/cars/${carId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete car");
      }

      setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
      toast.success("Car deleted successfully!");
    } catch (error) {
      console.error("Failed to delete car", error);
      toast.error("Failed to delete car. Please try again.");
    }
  };

  // Handle sorting
  const handleSort = (option) => {
    setSortOption(option);
    const sortedCars = [...cars];
    if (option === "dateNewest") {
      sortedCars.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (option === "dateOldest") {
      sortedCars.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (option === "priceLowest") {
      sortedCars.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
    } else if (option === "priceHighest") {
      sortedCars.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
    }
    setCars(sortedCars);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Lottie animationData={loadingAnimation} className="w-40" />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>My Cars - Carvex</title>
      </Helmet>

      {/* Page Banner*/}
      <div className="relative w-full h-[300px] bg-black bg-cover bg-center bg-mycars">
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
          {/* Motivational Heading with Framer Motion */}
          <h1 className="font-antonio text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg uppercase">
            My Cars
          </h1>
        </div>
      </div>

      <div className="px-4 py-6 md:py-20">
        {cars.length === 0 ? (
          <div className="text-center">
            <p className="mt-4">You haven't added any cars yet.</p>
            <a href="/add-car" className="btn btn-sm btn-primary mt-4">
              Add Your First Car
            </a>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-end mb-4">
              <select
                value={sortOption}
                onChange={(e) => handleSort(e.target.value)}
                className="select select-sm rounded-full select-bordered bg-base-200"
              >
                <option value="dateNewest">Date Added (Newest First)</option>
                <option value="dateOldest">Date Added (Oldest First)</option>
                <option value="priceLowest">Price (Lowest First)</option>
                <option value="priceHighest">Price (Highest First)</option>
              </select>
            </div>
            <div className="bg-base-300 rounded-3xl overflow-hidden">
              <table className="table w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th>Car Model</th>
                    <th className="hidden lg:table-cell">Daily Rental</th>
                    <th className="hidden lg:table-cell">Booking Count</th>
                    <th>Availability</th>
                    <th className="hidden lg:table-cell">Date Added</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car._id}>
                      <td>{car.carModel}</td>
                      <td className="hidden lg:table-cell">
                        ${car.dailyRentalPrice}
                      </td>
                      <td className="hidden lg:table-cell">
                        {car.bookingCount}
                      </td>
                      <td>
                        {car.availability ? (
                          <span className="badge badge-success">Available</span>
                        ) : (
                          <span className="badge badge-error">Unavailable</span>
                        )}
                      </td>
                      <td className="hidden lg:table-cell">
                        {new Date(car.createdAt).toLocaleDateString()}
                      </td>
                      <td className="flex gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => setSelectedCar(car)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-sm btn-accent"
                          onClick={() => handleDelete(car._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Update Modal */}
            <UpdateCarModal
              car={selectedCar}
              onClose={() => setSelectedCar(null)}
              onCarUpdated={(updatedCar) => {
                setCars((prevCars) =>
                  prevCars.map((car) =>
                    car._id === updatedCar._id ? updatedCar : car
                  )
                );
                setSelectedCar(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCarsPage;
