import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
    {/* load auth pages here */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
