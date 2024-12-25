/* eslint-disable react/prop-types */
import Lottie from "lottie-react";
import loginAnimation from "../assets/animations/login-animation.json";

const AuthLoginModal = ({ isOpen, onClose, onRedirect }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-base-300 px-6 py-10 rounded-[40px] max-w-sm w-full flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl text-center font-bold ">Please Login</h2>
        <Lottie animationData={loginAnimation} className="w-24" />
        <p className="mt-2  text-center">
          You need to log in to access this page.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <button className="btn btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-sm btn-primary" onClick={onRedirect}>
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthLoginModal;
