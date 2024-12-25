import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-center p-5 bg-accent">
      <p className="">
        © {new Date().getFullYear()}{" "}
        <Link to="/" className="text-secondary font-semibold">
          Carvex
        </Link>
        . All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
