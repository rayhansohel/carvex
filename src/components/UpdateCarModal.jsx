import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateCarModal = ({ car, onClose, onCarUpdated }) => {
  const [formData, setFormData] = useState({
    carModel: "",
    dailyRentalPrice: "",
    availability: true,
    vehicleRegistrationNumber: "",
    features: "",
    description: "",
    imageUrl: "",
    location: "",
  });

  useEffect(() => {
    if (car) {
      // Populate the form fields with the current car data
      setFormData({
        carModel: car.carModel || "",
        dailyRentalPrice: car.dailyRentalPrice || "",
        availability: car.availability || true,
        vehicleRegistrationNumber: car.vehicleRegistrationNumber || "",
        features: Array.isArray(car.features) ? car.features.join(", ") : car.features || "",
        description: car.description || "",
        imageUrl: car.imageUrl || "",
        location: car.location || "",
      });
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://carvex-server.vercel.app/cars/${car._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            features: formData.features.split(",").map((f) => f.trim()),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update car");
      }

      const updatedCar = await response.json();
      onCarUpdated(updatedCar);
      toast.success("Car updated successfully!");
    } catch (error) {
      console.error("Failed to update car:", error);
      toast.error("Failed to update car. Please try again.");
    }
  };

  if (!car) {
    return null;
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box rounded-3xl bg-base-200">
        <h3 className="font-bold text-xl font-antonio text-center">Update Car</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">Car Model</label>
            <input
              type="text"
              name="carModel"
              value={formData.carModel}
              onChange={handleChange}
              className="input input-sm input-bordered w-full rounded-lg font-semibold focus:outline-none border-none bg-Secondary"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Daily Rental Price</label>
            <input
              type="number"
              name="dailyRentalPrice"
              value={formData.dailyRentalPrice}
              onChange={handleChange}
              className="input input-sm input-bordered w-full rounded-lg font-semibold focus:outline-none border-none bg-Secondary"
              required
            />
          </div>
          <div className="form-control">
          <label className="block font-medium mb-2">Availability</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="input input-sm input-bordered w-full rounded-lg font-semibold focus:outline-none border-none bg-Secondary"
                >
                  <option value={true}>Available</option>
                  <option value={false}>Unavailable</option>
                </select>
          </div>
          <div className="form-control">
            <label className="label">Vehicle Registration Number</label>
            <input
              type="text"
              name="vehicleRegistrationNumber"
              value={formData.vehicleRegistrationNumber}
              onChange={handleChange}
              className="input input-sm input-bordered w-full rounded-lg font-semibold focus:outline-none border-none bg-Secondary"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Features (comma-separated)</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="input input-sm input-bordered w-full rounded-lg font-semibold focus:outline-none border-none bg-Secondary"
            />
          </div>
          <div className="form-control">
            <label className="label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="input input-sm input-bordered w-full rounded-lg font-semibold focus:outline-none border-none bg-Secondary"
            />
          </div>
          <div className="form-control">
            <label className="label">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input input-sm input-bordered w-full rounded-lg font-semibold focus:outline-none border-none bg-Secondary"
              required
            />
          </div>
          <div className="modal-action">
            <button type="button" className="btn btn-sm btn-accent" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCarModal;
