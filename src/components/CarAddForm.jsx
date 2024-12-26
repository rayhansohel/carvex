import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./../contexts/AuthContext";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/Loading.json";
import { useDropzone } from "react-dropzone";

const CarAddForm = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    carModel: "",
    vehicleRegistrationNumber: "",
    dailyRentalPrice: "",
    availability: true,
    features: "",
    location: "",
    description: "",
    email: user?.email || "",
    name: user?.displayName || "",
    createdAt: new Date().toISOString(),
    bookingCount: 0, // Added bookingCount with default value 0
    images: [], // Added images array for storing uploaded files
  });

  const [loading, setLoading] = useState(false);

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image drop using react-dropzone
  const onDrop = (acceptedFiles) => {
    setFormData((prevData) => ({
      ...prevData,
      images: acceptedFiles, // Store the selected files
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Only accept image files
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("carModel", formData.carModel);
    formDataToSend.append(
      "vehicleRegistrationNumber",
      formData.vehicleRegistrationNumber
    );
    formDataToSend.append("dailyRentalPrice", formData.dailyRentalPrice);
    formDataToSend.append("availability", formData.availability);
    formDataToSend.append("features", formData.features);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("createdAt", formData.createdAt);
    formDataToSend.append("bookingCount", formData.bookingCount);

    // Append the images to form data
    formData.images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      const response = await fetch("http://localhost:5000/cars", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success("Car added successfully!");
        setFormData({
          carModel: "",
          vehicleRegistrationNumber: "",
          dailyRentalPrice: "",
          availability: true,
          features: "",
          location: "",
          description: "",
          email: user?.email || "",
          name: user?.displayName || "",
          createdAt: new Date().toISOString(),
          bookingCount: 0,
          images: [],
        });
      } else {
        throw new Error("Failed to add car");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 md:py-20">
      {loading ? (
        <div className="flex justify-center mb-4">
          <Lottie animationData={loadingAnimation} className="w-32" />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-base-200 rounded-3xl p-6">
          <h2 className="text-center font-antonio text-2xl mb-4">
            Give Your Car the Care It Deserves!
          </h2>
          <p className="text-center mb-10 text-primary/70">
            Add your car details to get started with CARVEX! Our experts are
            ready to provide top-notch service, ensuring your car runs smoothly
            and safely. Let’s take care of your ride!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="w-full sm:w-1/2">
                <label className="block font-medium mb-2">Car Model</label>
                <input
                  type="text"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleInputChange}
                  className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-accent"
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block font-medium mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="vehicleRegistrationNumber"
                  value={formData.vehicleRegistrationNumber}
                  onChange={handleInputChange}
                  className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-accent"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="w-full sm:w-1/2">
                <label className="block font-medium mb-2">
                  Daily Rental Price
                </label>
                <input
                  type="number"
                  name="dailyRentalPrice"
                  value={formData.dailyRentalPrice}
                  onChange={handleInputChange}
                  className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-accent"
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block font-medium mb-2">Availability</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-accent"
                >
                  <option value={true}>Available</option>
                  <option value={false}>Unavailable</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="w-full sm:w-1/2">
                <label className="block font-medium mb-2">Features</label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-accent"
                  placeholder="GPS, AC, Sunroof, etc"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block font-medium mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input input-sm input-bordered w-full rounded-[6px] font-semibold focus:outline-none border-none bg-accent"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full rounded-xl font-semibold focus:outline-none border-none bg-accent"
                rows="4"
              ></textarea>
            </div>

            {/* React Dropzone for Image Upload */}
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Upload Car Images
              </label>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-accent p-6 rounded-md cursor-pointer text-center"
              >
                <input {...getInputProps()} />
                <p>Drag & Drop or Click to Select Images</p>
              </div>
              {formData.images.length > 0 && (
                <div className="mt-4">
                  <h4>Selected Images:</h4>
                  {formData.images.map((image, index) => (
                    <div key={index}>
                      <p>{image.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="btn btn-sm btn-primary w-40 mt-4"
              >
                Add Car
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CarAddForm;
