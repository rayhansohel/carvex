import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Menu = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* Common Menu Items */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `btn btn-sm w-full bg-transparent border-none shadow-none ${
            isActive ? "text-[#ff0055]" : "transition"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/available-cars"
        className={({ isActive }) =>
          `btn btn-sm w-full bg-transparent border-none shadow-none ${
            isActive ? "text-[#ff0055]" : "transition"
          }`
        }
      >
        Available Cars
      </NavLink>

      {/* Conditional Menu Items */}
      {user && user.email ? (
        <>
          <NavLink
            to="/add-car"
            className={({ isActive }) =>
              `btn btn-sm w-full bg-transparent border-none shadow-none ${
                isActive ? "text-[#ff0055]" : "transition"
              }`
            }
          >
            Add Car
          </NavLink>

          <NavLink
            to="/my-cars"
            className={({ isActive }) =>
              `btn btn-sm w-full bg-transparent border-none shadow-none ${
                isActive ? "text-[#ff0055]" : "transition"
              }`
            }
          >
            My Cars
          </NavLink>

          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              `btn btn-sm w-full bg-transparent border-none shadow-none ${
                isActive ? "text-[#ff0055]" : "transition"
              }`
            }
          >
            My Bookings
          </NavLink>
        </>
      ) : null}
    </>
  );
};

export default Menu;
