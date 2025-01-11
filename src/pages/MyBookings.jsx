import { useState, useEffect } from "react";
import { differenceInDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/Loading.json";
import { useAuth } from "../contexts/AuthContext";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newBookingDates, setNewBookingDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [totalPrice, setTotalPrice] = useState(0); // State for storing updated price
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const pricePerDay = 50; // Set your price per day

  // Fetch user bookings
  useEffect(() => {
    if (!user) {
      toast.error("You need to be logged in to view your bookings");
      return;
    }

    fetch(`https://carvex-server.vercel.app/bookings/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error("Failed to load bookings:", error);
        toast.error("Error loading bookings");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  // Utility function to check if a date is valid
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  // Handle Date Picker Change and Recalculate Price
  const handleDateChange = (dates) => {
    const [startDate, endDate] = dates;
    if (startDate && endDate) {
      const days = differenceInDays(endDate, startDate);
      setTotalPrice(days * pricePerDay);
    }
    setNewBookingDates({ startDate, endDate });
  };

  // Function to handle deleting a booking
  const handleDeleteBooking = (bookingId) => {
    fetch(`https://carvex-server.vercel.app/bookings/${bookingId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== bookingId)
        );
        toast.success("Booking deleted successfully");
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
        toast.error("Failed to delete booking");
      });
  };

  const handleSaveChanges = () => {
    toast.success("Booking updated successfully");
    setIsModifyModalOpen(false);
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
        <title>My Bookings - Carvex</title>
      </Helmet>

      {/* Page Banner */}
      <div className="relative w-full h-[300px] bg-black bg-cover bg-center bg-mycars">
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative flex flex-col items-center justify-center h-full text-center text-white p-6">
          <h1 className="font-antonio text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg uppercase">
            My Bookings
          </h1>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="px-4 py-6 md:py-20">
        {bookings.length === 0 ? (
          <div className="text-center">
            <p className="mt-4">You have no bookings yet.</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="bg-base-300 rounded-3xl overflow-hidden">
              <table className="table w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th>Car Model</th>
                    <th className="hidden md:table-cell">Total Days</th>
                    <th className="hidden sm:table-cell">Total Price</th>
                    <th className="hidden lg:table-cell">Booking Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => {
                    const startDate = new Date(booking.startDate);
                    const endDate = new Date(booking.endDate);
                    const isValidStartDate = isValidDate(startDate);
                    const isValidEndDate = isValidDate(endDate);
                    const totalDays =
                      isValidStartDate && isValidEndDate
                        ? differenceInDays(endDate, startDate)
                        : null;

                    return (
                      <tr key={booking.id}>
                        <td>{booking.carModel}</td>
                        <td className="hidden md:table-cell">
                          {totalDays !== null
                            ? `${totalDays} days`
                            : "Invalid Dates"}
                        </td>
                        <td className="hidden sm:table-cell">{booking.totalPrice}</td>
                        <td className="hidden lg:table-cell">
                          {booking.bookingStatus === "Confirmed" ? (
                            <span className="badge badge-success">Confirmed</span>
                          ) : booking.bookingStatus === "Pending" ? (
                            <span className="badge badge-warning">Pending</span>
                          ) : (
                            <span className="badge badge-error">Cancelled</span>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setIsModifyModalOpen(true);
                            }}
                            className="btn btn-primary btn-sm"
                          >
                            Modify
                          </button>
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setIsDeleteModalOpen(true);
                            }}
                            className="btn btn-danger btn-sm ml-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modify Booking Modal */}
      {isModifyModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-base-100 p-6 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Modify Booking</h3>
            <p>
              <strong>Car Model:</strong> {selectedBooking.carModel}
            </p>
            <div className="mt-4">
              <label className="text-sm">Choose new dates</label>
              <DatePicker
                selected={newBookingDates.startDate}
                onChange={handleDateChange}
                startDate={newBookingDates.startDate}
                endDate={newBookingDates.endDate}
                selectsRange
                inline
                minDate={new Date()}
                className="input input-bordered"
              />
            </div>
            <p className="mt-4">
              <strong>Updated Total Price: </strong>${totalPrice}
            </p>
            <div className="mt-4 flex justify-between gap-4">
              <button
                onClick={() => setIsModifyModalOpen(false)}
                className="btn btn-accent btn-sm"
              >
                Cancel
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Booking Confirmation Modal */}
      {isDeleteModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-base-100 p-6 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Delete Booking</h3>
            <p>
              Are you sure you want to delete the booking for{" "}
              <strong>{selectedBooking.carModel}</strong>?
            </p>
            <div className="mt-4 flex justify-between gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="btn btn-accent btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBooking(selectedBooking.id)}
                className="btn btn-danger btn-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
