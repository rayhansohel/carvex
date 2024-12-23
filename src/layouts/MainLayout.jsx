import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <div>
        {/* load navvar here*/}
        <Navbar />
      </div>
      <div className="min-h-[calc(100vh-136px)] flex justify-center">
        {/* load pages here */}
        <Outlet />
      </div>
      <div className="text-center bg-base-200 p-4">
        {/* load footer footer*/}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
