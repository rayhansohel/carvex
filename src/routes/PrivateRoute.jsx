/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      //loading spinner
      return;
    }

    if (!user) {
      sessionStorage.setItem("redirectPath", window.location.pathname);
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    //loading spinner
    return;
  }

  if (user) {
    return children;
  }

  return null; // Or return a placeholder like a loading spinner
};

export default PrivateRoute;
