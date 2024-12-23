import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import defaultAvatar from "../assets/default-avatar.png";
import { AuthContext } from "../contexts/AuthContext";
import BrandLogo from "../assets/carvex-logo/caevex-text-logo-light.png";
import { Tooltip } from "react-tooltip";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/Loading.json";
import Menu from "./Menu";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="navbar">
        <Lottie animationData={loadingAnimation} className="w-32" />
      </div>
    );
  }

  return (
    <div className=" backdrop-blur-sm">
      <div className="bg-base-100 mt-5">
        <div className="navbar w-10/12 m-auto flex justify-center">
          {/* Brand Logo */}
          <div className="lg:navbar-start flex items-center">
            <Link to="/">
              <div className="flex items-center justify-center">
                <img src={BrandLogo} alt="Brand Logo" className="w-24" />
              </div>
            </Link>
          </div>

          {/* Menu Items */}
          <div className="navbar-center hidden lg:grid grid-flow-col-dense gap-2">
            <Menu />
          </div>

          {/* Login or register buttons */}
          <div className="hidden lg:flex navbar-end space-x-2">
            {/* Conditionally hide Register button if user is logged in */}
            {!user && (
              <NavLink to="/auth/register" type="button" className="btn btn-sm">
                <span>Register</span>
              </NavLink>
            )}

            <div>
              {user && user?.email ? (
                <>
                  <div className="flex items-center gap-2">
                    <NavLink
                      to="/"
                      onClick={logOut}
                      type="button"
                      className="btn btn-sm"
                    >
                      <span>Logout</span>
                    </NavLink>
                    <div className="avatar cursor-pointer">
                      <div className="w-9">
                        <img
                          src={user.photoURL || defaultAvatar}
                          alt="User Avatar"
                          className="rounded-full"
                          data-tooltip-id="theme-tooltip"
                          data-tooltip-content={`${user.displayName}`}
                        />
                      </div>
                      {/* Tooltip Component */}
                      <Tooltip />
                    </div>
                  </div>
                </>
              ) : (
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
