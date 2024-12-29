import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

const MyCars = () => {
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCar, setEditCar] = useState(null);
  const [sortBy, setSortBy] = useState("date"); // Sort by default to date
  const { user } = useAuth(); // Get the logged-in user's details

  // Fetch the cars added by the logged-in user
  useEffect(() => {
    const fetchCars = async () => {
      if (!user?.email) return; // Ensure user is logged in

      try {
        const response = await fetch(`https://carvex-server.vercel.app/cars?email=${user.email}`);
        const data = await response.json();

        if (response.ok) {
          setCars(data);
        } else {
          toast.error("Failed to fetch your cars");
        }
      } catch (error) {
        toast.error("Error fetching cars");
        console.error("Fetch Cars Error:", error);
      }
    };

    fetchCars();
  }, [user?.email]);

  // Handle updating car data
  const handleUpdate = (car) => {
    setEditCar(car);
    setIsModalOpen(true);
  };

  // Handle deleting a car
  const handleDelete = async (carId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (confirmation) {
      try {
        const response = await fetch(`/api/cars/${carId}`, { method: "DELETE" });
        if (response.ok) {
          toast.success("Car deleted successfully");
          setCars(cars.filter((car) => car.id !== carId));
        } else {
          toast.error("Failed to delete car");
        }
      } catch (error) {
        toast.error("Error deleting car");
        console.error("Delete Car Error:", error);
      }
    }
  };

  // Sorting functionality
  const handleSort = (key) => {
    setSortBy(key);
    const sortedCars = [...cars];
    if (key === "date") {
      sortedCars.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (key === "price") {
      sortedCars.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
    }
    setCars(sortedCars);
  };

  return (
    <div>
      <Helmet>
        <title>My Cars - Carvex</title>
      </Helmet>

      {/* Page Banner */}
      <div className="relative w-full h-[300px] bg-black bg-cover bg-center bg-mycars">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
          <motion.h1
            className="font-antonio text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            My Cars
          </motion.h1>
        </div>
      </div>

      <div className="px-4 py-4 md:py-20">
        <div className="container mx-auto">
          {/* If no cars are added */}
          {cars.length === 0 && (
            <div className="text-center">
              <p>No cars added yet.</p>
              <a href="/add-car" className="btn btn-sm btn-secondary mt-4">
                Click here to add a car
              </a>
            </div>
          )}

          {/* Car Management Table */}
          <div className="mt-6 px-4">
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => handleSort("date")}
                className="btn btn-sm px-4 py-2 rounded-md"
              >
                Sort by Date
              </button>
              <button
                onClick={() => handleSort("price")}
                className="btn btn-sm px-4 py-2 rounded-md ml-2"
              >
                Sort by Price
              </button>
            </div>

            <table className="min-w-full bg-base-200 rounded-3xl p-6">
              <thead className="border border-accent">
                <tr className=" bg-base-300">
                  <th className="px-6 py-3 text-left ">Car Image</th>
                  <th className="px-6 py-3 text-left ">Car Model</th>
                  <th className="px-6 py-3 text-left ">Daily Rental Price</th>
                  <th className="px-6 py-3 text-left ">Booking Count</th>
                  <th className="px-6 py-3 text-left ">Availability</th>
                  <th className="px-6 py-3 text-left ">Date Added</th>
                  <th className="px-6 py-3 text-left ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id} className="border-y border-base-100 roynded-3xl  ">
                    <td className="px-6 py-4">
                      <img
                    src={
                      car.images.length > 0
                        ? `https://carvex-server.vercel.app/${car.images[0]}`
                        : car.imageUrl
                    }
                        alt={car.model}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">{car.model}</td>
                    <td className="px-6 py-4">${car.dailyRentalPrice}</td>
                    <td className="px-6 py-4">{car.bookingCount}</td>
                    <td className="px-6 py-4">{car.availability}</td>
                    <td className="px-6 py-4">
                      {new Date(car.dateAdded).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleUpdate(car)}
                        className="btn-primary btn btn-sm mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="btn-secondary btn btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCars;
