import { Helmet } from "react-helmet-async";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import BrandLogoLight from "../assets/carvex-logo/caevex-text-logo-light.png";

const Login = () => {
  return (
    <div className="min-h-[calc(100vh-192px)] flex justify-center items-center">
      <Helmet>
        <title>Login - Carvex</title>
      </Helmet>
      <div className="grid grid-cols-2 w-full">
        <div className="text-sm bg-hero w-full h-screen bg-cover bg-center flex justify-center items-center gap-4 flex-col">
          <div className="w-full bg-[#09090b8f] backdrop-blur-sm h-full flex flex-col items-center justify-center gap-4">
            {/* Brand Logo */}
            <div className="flex items-center">
              <Link to="/">
                <div className="flex items-center justify-center">
                  <img src={BrandLogoLight} alt="Brand Logo" className="w-60" />
                </div>
              </Link>
            </div>
            <div>
              <p className="max-w-xl text-center text-lg text-white">
                Carvex offers reliable car rentals with a variety of vehicles,
                transparent pricing, and 24/7 support for a hassle-free journey.
              </p>
            </div>
            <div>
              <Link to="/">
                <button className="btn btn-sm btn-secondary text-white">
                  Go to Homepage
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
