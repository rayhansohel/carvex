import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialLinks = () => {
  return (
    <div className="mt-4">
      {/* social icons  */}
      <div className="flex gap-4">
        <a
          href="https://www.facebook.com/RayhanSohel"
          target="_blank"
          className="w-8 h-8 bg-base-200 flex items-center justify-center rounded-full hover:text-[#ff0055]"
        >
          <FaFacebook />
        </a>
        <a
          href="https://x.com/rrayhanSohel"
          target="_blank"
          className="w-8 h-8 bg-base-200 flex items-center justify-center rounded-full hover:text-[#ff0055]"
        >
          <FaXTwitter/>
        </a>
        <a
          href="https://www.instagram.com/arayhansohel/"
          target="_blank"
          className="w-8 h-8 bg-base-200 flex items-center justify-center rounded-full hover:text-[#ff0055]"
        >
          {" "}
          <FaInstagram />
        </a>
        <a
          href="https://github.com/RayhanSohel"
          target="_blank"
          className="w-8 h-8 bg-base-200 flex items-center justify-center rounded-full hover:text-[#ff0055]"
        >
          {" "}
          <FaGithub />
        </a>
        <a
          href="https://www.youtube.com/@arayhansohel"
          target="_blank"
          className="w-8 h-8 bg-base-200 flex items-center justify-center rounded-full hover:text-[#ff0055]"
        >
          {" "}
          <FaYoutube />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
