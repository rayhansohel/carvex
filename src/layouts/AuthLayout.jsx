import { Outlet } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const AuthLayout = () => {
  return (
    <div>
      {/* load auth pages here */}
      <Outlet />
      {/* Theme Toggle buttons */}
      <div className="fixed bottom-2 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default AuthLayout;
