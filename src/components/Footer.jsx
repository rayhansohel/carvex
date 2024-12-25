import { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import BrandLogoLight from "../assets/carvex-logo/caevex-text-logo-light.png";
import BrandLogoDark from "../assets/carvex-logo/caevex-text-logo-dark.png";
import SocialLinks from "./SocialLinks";
import Menu from "./Menu";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="text-center bg-accent">
      <div className="space-y-4">
        <div className="container mx-auto lg:flex lg:pt-10 pb-4 items-center justify-between">
          <div className="p-6">
            <div className="flex items-center justify-center">
              <Link to="/">
                <div className="flex items-center justify-center col-span-2">
                  <Link to="/">
                    <div className="flex items-center justify-center">
                      <img
                        src={theme === "dark" ? BrandLogoLight : BrandLogoDark}
                        alt="Brand Logo"
                        className="w-44"
                      />
                    </div>
                  </Link>
                </div>
              </Link>
            </div>
            <div>
              <h4>The Road is Open, Let’s Go</h4>
            </div>
            <div className="flex justify-center items-center">
              <SocialLinks />
            </div>
          </div>

          <div className="mx-12 border-b lg:border-l border-base-200 lg:h-32"></div>

          <div className="p-6">
            <div>
              <h2 className="text-xl font-semibold pb-3">Page links</h2>
              {/* Menu Items */}
              <div className="2xl:grid grid-flow-col-dense">
                <Menu />
              </div>
            </div>
          </div>

          <div className="mx-12 border-b lg:border-l border-base-200 lg:h-32"></div>

          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">
                Subscribe Newsletter
              </h2>

              <div className="flex items-center justify-center">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 rounded-l-md focus:outline-none bg-base-200"
                  />
                  <button className="bg-[#ff0055] hover:bg-[#ff0055c5] text-black font-semibold px-6 py-2 rounded-r-md">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-base-200">
          <p className="p-4">
            © {new Date().getFullYear()}{" "}
            <Link to="/" className="text-secondary font-semibold">
              Carvex
            </Link>
            . All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
