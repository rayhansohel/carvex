import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        {/* load navvar here*/}
        <Navbar />
      </div>
      <div className="min-h-[calc(100vh-126px)] flex justify-center">
        {/* load pages here */}
        <Outlet />
      </div>
      <div>
        {/* load footer footer*/}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
