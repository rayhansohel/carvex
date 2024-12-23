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
      <div>
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
