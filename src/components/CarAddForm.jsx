import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const CarAddForm = () => {
  const [formData, setFormData] = useState({
    carModel: "",
    dailyRentalPrice: "",
    availability: true,
    vehicleRegistrationNumber: "",
    features: "",
    description: "",
    bookingCount: 0,
    location: "",
    images: [],
  });
  const { isAuthenticated, userId } = useAuth(); // Get user ID from context
  const navigate = useNavigate(); // Use navigate instead of history

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    console.log("Updated car data:", updatedFormData); // Log each time input changes
  };

  // Handle file drop or selection
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const updatedFormData = {
        ...formData,
        images: acceptedFiles,
      };
      setFormData(updatedFormData);
      console.log("Updated car data with images:", updatedFormData); // Log after files are added
    },
  });

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    const carData = {
      ...formData,
      userId,
      dateAdded: new Date(),
    };

    console.log("Submitting car data:", carData); // Log before submission

    try {
      // Save car data to the database
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        alert("Car added successfully!");
        navigate("/dashboard"); // Use navigate to redirect
      } else {
        alert("Error adding car");
      }
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Error adding car");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-20">
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
              onChange={handleChange}
              className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-base-300 "
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block font-medium">Registration Number</label>
            <input
              type="text"
              name="vehicleRegistrationNumber"
              value={formData.vehicleRegistrationNumber}
              onChange={handleChange}
              className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-base-300 "
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
              onChange={handleChange}
              className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-base-300 "
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block font-medium">Availability</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-base-300 "
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
              onChange={handleChange}
              className="input input-sm input-bordered w-full  rounded-[6px] font-semibold focus:outline-none border-none bg-base-300 "
              placeholder="GPS, AC, Sunroof, etc "
            />
          </div>
          <div className="w-1/2">
            <label className="block font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input input-sm input-bordered w-full  rounded-[6px] font-semibold focus:outline-none border-none bg-base-300 "
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full  rounded-xl font-semibold focus:outline-none border-none bg-base-300 "
            rows="6"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-medium">Images</label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-base-300 bg-accent rounded-lg p-4 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <p>Drag & drop files here, or click to select files</p>
          </div>
          <div className="flex gap-2 mt-2">
            {formData.images.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-sm btn-primary w-40">
          Add Car
        </button>
      </form>
    </div>
  );
};

export default CarAddForm;
