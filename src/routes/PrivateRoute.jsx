/* eslint-disable react/prop-types */
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/Loading.json";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      sessionStorage.setItem("redirectPath", location.pathname);
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate, location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Lottie animationData={loadingAnimation} className="w-32" />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return null;
};

export default PrivateRoute;

