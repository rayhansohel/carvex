import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";

const MainLayout = () => {
  return (
    <div>
      <div>
        {/* load navvar here*/}
        <Navbar />
      </div>
      <div className="min-h-[calc(100vh-126px)] flex justify-center">
        {/* load pages here */}
        <Outlet />
      </div>
      <div className="text-center bg-base-100 p-5 border-t border-base-300">
        {/* load footer footer*/}
        <Footer />
      </div>
      {/* Theme Toggle buttons */}
      <div className="fixed bottom-2 right-2">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default MainLayout;
