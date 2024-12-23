/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const Menu = ({ closeDropdown }) => {
  return (
    <>
      <NavLink
        to="/"
        onClick={closeDropdown}
        className={({ isActive }) =>
          `btn btn-sm w-full bg-transparent border-none  ${
            isActive ? "text-[#ff0055]" : "transition"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/available-cars"
        onClick={closeDropdown}
        className={({ isActive }) =>
          `btn btn-sm w-full bg-transparent border-none  ${
            isActive ? "text-[#ff0055]" : "transition"
          }`
        }
      >
        Available Cars
      </NavLink>
    </>
  );
};

export default Menu;
