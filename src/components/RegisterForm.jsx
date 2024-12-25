import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../contexts/AuthContext";

const RegisterForm = () => {
  const { registerWithEmailPassword, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const minLength = password.length >= 6;

    if (!uppercase.test(password)) {
      return "Password must have at least one uppercase letter!";
    }
    if (!lowercase.test(password)) {
      return "Password must have at least one lowercase letter!";
    }
    if (!minLength) {
      return "Password must be at least 6 characters long!";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address!";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const displayName = form.get("displayName");
    const email = form.get("email");
    const photoURL = form.get("photoURL") || "";
    const password = form.get("password");

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    setEmailError("");

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    setPasswordError("");
    toast.dismiss();

    try {
      // Call the manual registration function
      await registerWithEmailPassword(email, password, displayName, photoURL);
      toast.success("Registration successful! Please log in.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
      });
      navigate("/auth/login"); // Redirect to login after registration

    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email is already in use. Try a different one.", {
          position: "bottom-right",
          hideProgressBar: true,
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "bottom-right",
          hideProgressBar: true,
        });
      }
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("Login with Google successful!", {
          position: "bottom-right",
          hideProgressBar: true,
        });
        const redirectTo = localStorage.getItem("redirectTo");
        setTimeout(() => {
          if (redirectTo) {
            localStorage.removeItem("redirectTo");
            navigate(redirectTo);
          } else {
            navigate("/");
          }
          window.location.reload();
        }, 1000);
      })
      .catch(() => {
        toast.error("Google sign-in failed. Try again!", {
          position: "bottom-right",
          hideProgressBar: true,
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96">
      <div>
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="btn btn-sm bg-base-100 shadow-none"
        >
          <FcGoogle className="text-lg" />
          <span>Sign-In with Google</span>
        </button>
      </div>
      <div className="flex w-full flex-col px-9 mt-4 -mb-4">
        <div className="divider">OR</div>
      </div>
      <form onSubmit={handleSubmit} className="card-body w-full space-y-2">
        <div>
          <h1 className="text-center">Register Here</h1>
        </div>
        <div className="form-control">
          <input
            type="text"
            name="displayName"
            placeholder="Your Name"
            className="input input-sm input-bordered text-xs rounded-[6px] font-semibold focus:outline-none border-none bg-base-300"
            required
          />
        </div>
        <div className="form-control">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="input input-sm input-bordered text-xs rounded-[6px] font-semibold focus:outline-none border-none bg-base-300"
            required
          />
          {emailError && (
            <div className="text-sm text-[#ff0055] mt-2 ml-4">{emailError}</div>
          )}
        </div>
        <div className="form-control relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="input input-sm input-bordered text-xs rounded-[6px] font-semibold focus:outline-none border-none bg-base-300"
            required
          />
          <span
            className="absolute right-2 top-[7px] cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={20} />
            ) : (
              <AiFillEye size={20} />
            )}
          </span>
          {passwordError && (
            <div className="text-sm text-[#ff0055] mt-2 ml-4">
              {passwordError}
            </div>
          )}
        </div>
        <div className="form-control">
          <input
            type="text"
            name="photoURL"
            placeholder="Profile Picture URL"
            className="input input-sm input-bordered text-xs rounded-[6px] font-semibold focus:outline-none border-none bg-base-300"
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-sm btn-primary">
            Register
          </button>
        </div>
        <div className="text-sm text-center">
          <p>
            Already have an account?{" "}
            <Link to="/auth/login" className="font-semibold text-[#ff0055]">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
