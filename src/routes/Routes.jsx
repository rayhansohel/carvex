import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import AvailableCars from "../pages/AvailableCars";
import PrivateRoute from "./PrivateRoute";
import AddCar from "../pages/AddCar";
import MyCars from "../pages/MyCars";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyBookings from "../pages/MyBookings";
import CarDetails from "../pages/CarDetails";
import AuthLayout from "../layouts/AuthLayout";

const Routes = createBrowserRouter([

  //Main route
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/available-cars",
        element: <AvailableCars />,
      },
      {
        path: "/add-car",
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-cars",
        element: (
          <PrivateRoute>
            <MyCars />
          </PrivateRoute>
        ),
      },
      {
        path: "/car-details/:id",
        element: (
            <PrivateRoute>
              <CarDetails />
            </PrivateRoute>
          ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
    ],
  },


]);

export default Routes;