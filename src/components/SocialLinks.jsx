import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { PiGithubLogoBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const SocialLinks = () => {
  return (
    <div className="mt-4">
      {/* social icons  */}
      <div className="flex gap-4">
        <Link
          href="https://www.facebook.com/RayhanSohel"
          target="_blank"
          className="w-8 h-8 bg-base-200 flex items-center justify-center rounded-md hover:text-[#ff0055]"
        >
          <FiFacebook className="text-lg"/>
        </Link>
        <Link
          href="https://x.com/rrayhanSohel"
          target="_blank"
          className="w-8 h-8 bg-base-200 flex items-center justify-center rounded-md hover:text-[#ff0055]"
        >
          <FaXTwitter className="text-lg"/>
        </Link>
        <Link
          href="https://www.instagram.com/arayhansohel/"
          target="_blank"
          className="w-8 h-8 bg-base-200 flex items-center justify-center rounded-md hover:text-[#ff0055]"
        >
          {" "}
          <FaInstagram className="text-lg"/>
        </Link>
        <Link
          href="https://github.com/RayhanSohel"
          target="_blank"
          className="w-8 h-8 bg-base-200 flex items-center justify-center rounded-md hover:text-[#ff0055]"
        >
          {" "}
          <PiGithubLogoBold className="text-lg"/>
        </Link>
        <Link
          href="https://www.youtube.com/@arayhansohel"
          target="_blank"
          className="w-8 h-8 bg-base-200 flex items-center justify-center rounded-md hover:text-[#ff0055]"
        >
          {" "}
          <AiOutlineYoutube className="text-lg" />
        </Link>
      </div>
    </div>
  );
};

export default SocialLinks;
