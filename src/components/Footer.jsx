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
    <div className="text-center bg-base-300 px-4">
      <div className="space-y-4">
        <div className="container mx-auto lg:flex lg:pt-10 pb-4 items-center justify-between">
          <div className="p-6 flex-[0.3]">
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
          </div>

          <div className="flex-[0] mx-12 border-b lg:border-l border-base-200 lg:h-32"></div>

          <div className="flex-[0.4] p-6">
            <div>
              <h2 className="text-xl font-semibold pb-3">Usefull links</h2>
              {/* Menu Items */}
              <div>
                <Menu />
              </div>
            </div>
          </div>

          <div className="flex-[0.0] mx-12 border-b lg:border-l border-base-200 lg:h-32"></div>

          <div className="p-6 flex-[0.3]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-2">Social links</h2>

              <div className="flex items-center justify-center">
                <div className="flex justify-center items-center">
                  <SocialLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto border-t border-base-200">
          <p className="p-4">
            © {new Date().getFullYear()}{" "}
            <Link to="/" className="text-accent font-semibold">
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
