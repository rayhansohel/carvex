import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarAddForm = () => {
  const [formData, setFormData] = useState({
    carModel: "",
    vehicleRegistrationNumber: "",
    dailyRentalPrice: "",
    availability: true,
    features: "",
    location: "",
    description: "",
  });

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Form data being sent:", formData);

    try {
      const response = await fetch("http://localhost:5000/add-car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit the form.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-20 bg-base-200 rounded-3xl p-6">
      <h2 className="text-center font-antonio text-2xl mb-4">
        Give Your Car the Care It Deserves!
      </h2>
      <p className="text-center mb-8 text-primary/70">
        Add your car details to get started with CARVEX! Our experts are ready
        to provide top-notch service, ensuring your car runs smoothly and
        safely. Let’s take care of your ride!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block font-medium">Car Model</label>
            <input
              type="text"
              name="carModel"
              value={formData.carModel}
              onChange={handleInputChange}
              className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-accent "
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block font-medium">Registration Number</label>
            <input
              type="text"
              name="vehicleRegistrationNumber"
              value={formData.vehicleRegistrationNumber}
              onChange={handleInputChange}
              className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-accent "
              required
            />
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block font-medium">Daily Rental Price</label>
            <input
              type="number"
              name="dailyRentalPrice"
              value={formData.dailyRentalPrice}
              onChange={handleInputChange}
              className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-accent "
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block font-medium">Availability</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-accent "
            >
              <option value={true}>Available</option>
              <option value={false}>Unavailable</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block font-medium">Features</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-accent "
              placeholder="GPS, AC, Sunroof, etc "
            />
          </div>
          <div className="w-1/2">
            <label className="block font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-accent "
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full rounded-xl font-semibold focus:outline-none border-none bg-accent "
            rows="6"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-sm btn-primary w-40">
          Add Car
        </button>
      </form>
    </div>
  );
};

export default CarAddForm;
