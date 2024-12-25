import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import defaultAvatar from "../assets/others/default-avatar.png";
import { AuthContext } from "../contexts/AuthContext";
import ThemeContext from "../contexts/ThemeContext";
import BrandLogoLight from "../assets/carvex-logo/caevex-text-logo-light.png";
import BrandLogoDark from "../assets/carvex-logo/caevex-text-logo-dark.png";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/Loading.json";
import Menu from "./Menu";
import Dropdown from "./Dropdown";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <div className="navbar">
        <Lottie animationData={loadingAnimation} className="w-32" />
      </div>
    );
  }

  return (
    <div className="backdrop-blur-sm border-b bg-accent/80 border-accent">
      {/* Mobile Dropdown Menu */}
      <div className="lg:hidden fixed top-4 left-4">
        <Dropdown />
      </div>
      <div className="navbar w-10/12 m-auto flex justify-center">
        {/* Brand Logo */}
        <div className="lg:navbar-start flex items-center">
          <Link to="/">
            <div className="flex items-center justify-center">
              <img
                src={theme === "dark" ? BrandLogoLight : BrandLogoDark}
                alt="Brand Logo"
                className="w-28"
              />
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="navbar-center hidden lg:grid grid-flow-col-dense gap-2">
          <Menu />
        </div>

        {/* Login or register buttons */}
        <div className="hidden lg:flex navbar-end space-x-2 items-center">
          {!user && (
            <NavLink to="/auth/register" type="button" className="btn btn-sm">
              <span>Register</span>
            </NavLink>
          )}

          {user && user?.email && (
            <div className="flex items-center gap-2">
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                type="button"
                className="btn btn-sm"
              >
                Logout
              </button>

              {/* Avatar and Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <div className="avatar cursor-pointer flex items-center justify-center">
                  <div className="w-9">
                    <img
                      src={user.photoURL || defaultAvatar}
                      alt="User Avatar"
                      className="rounded-full"
                    />
                  </div>
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute top-8 right-0 mt-2 w-80 bg-base-200 shadow-lg rounded-xl p-6 z-50">
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={user.photoURL || defaultAvatar}
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="text-lg font-semibold">
                          {user.displayName || "User Name"}
                        </p>
                        <p className="text-sm -mt-1 text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!user && (
            <NavLink
              to="/auth/login"
              type="button"
              className="btn btn-sm btn-primary"
            >
              <span>Login</span>
            </NavLink>
          )}
        </div>
      </div>
      {/* Theme Toggle buttons */}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
