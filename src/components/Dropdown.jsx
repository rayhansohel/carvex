import { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import defaultAvatar from "../assets/others/default-avatar.png";
import { AuthContext } from "../contexts/AuthContext";
import Menu from "./Menu";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Close dropdown if click is outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="btn btn-sm btn-primary shadow-none h-9 w-9"
      >
        {isOpen ? (
          <span className="text-accent text-xl">
            <IoClose />
          </span>
        ) : (
          <span className="text-accent text-xl">
            <HiMenu />
          </span>
        )}
      </button>

      {isOpen && (
        <div className=" absolute top-12 left-0 min-w-40 max-w-[350px] shadow-lg">
          <div className="p-4 bg-base-200 rounded-2xl">
            <div className="space-y-2">
              {/* Pass closeDropdown to MenuItems */}
              <Menu closeDropdown={closeDropdown} />
            </div>
            <div className="border-t border-base-100 mt-3 mb-4"></div>
            <div className="flex items-center justify-center">
              <div className="space-y-2">
                {!user && (
                  <NavLink
                    to="/auth/register"
                    type="button"
                    onClick={closeDropdown}
                    className="btn btn-sm w-full bg-base-300 shadow-none"
                  >
                    <span>Register</span>
                  </NavLink>
                )}

                <div>
                  {user && user?.email ? (
                    <div>
                      <div className="flex flex-col items-center">
                        <div className="avatar mb-2">
                          <div className="w-20">
                            <img
                              src={user.photoURL || defaultAvatar}
                              alt="User Avatar"
                              className="rounded-full"
                            />
                          </div>
                        </div>

                        <NavLink
                          to="/"
                          onClick={() => {
                            logOut();
                            closeDropdown();
                          }}
                          type="button"
                          className="btn btn-sm w-full bg-base-300 shadow-none"
                        >
                          <span>Logout</span>
                        </NavLink>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to="/auth/login"
                      type="button"
                      onClick={closeDropdown}
                      className="btn btn-sm w-full bg-base-300 shadow-none"
                    >
                      <span>Login</span>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
