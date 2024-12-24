import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <p className="text-sm">
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
