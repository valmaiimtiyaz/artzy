import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import loginBg from "../assets/Rumah Fantasi 2.png";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  const API_BASE_URL = "https://artzybackend.vercel.app";

  const token = localStorage.getItem("token");
  const backPath = location.state?.from || (token ? "/beranda" : "/");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);
    if (!email.trim()) {
      setError("Please enter your email address.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset link");
      }
      setSuccessMessage("Reset link has been sent to your email!");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-screen min-h-screen md:h-screen overflow-auto md:overflow-hidden bg-[#F4EFEB] font-montserrat">
      <div className="w-full md:w-2/5 flex flex-col justify-center items-center md:items-start px-6 md:px-24 py-10 gap-4 md:gap-6 text-[#442D1D] relative min-h-screen md:min-h-0">
        <div className="absolute top-6 left-6 md:top-8 md:left-8 text-xl">
          <Link
            to={backPath}
            className="flex items-center gap-1 hover:opacity-75 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 md:w-6 md:h-5 stroke-current"
            >
              <path
                d="M15.75 19.5 8.25 12l7.5-7.5"
                fill="none"
                strokeWidth="3.0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-base md:text-lg font-medium">Back</span>
          </Link>
        </div>

        <div className="flex flex-col gap-1 md:gap-2 mb-4 md:mb-6 mt-0 md:mt-20 w-full items-center text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-[#442D1D]">
            Forgot Password?
          </h1>
          <p className="text-sm md:text-lg text-[#442D1D] font-semibold opacity-80">
            Enter your email to reset your password
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col gap-4 md:gap-5"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm md:text-lg text-[#442D1D] font-semibold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-2 md:py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 backdrop-blur-xl bg-[#442D1D]/25 border border-white/50 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent"
              placeholder="user@gmail.com"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-xs md:text-sm text-red-600 font-medium p-2 rounded text-center bg-red-100 border border-red-200">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="text-xs md:text-sm text-green-700 font-medium p-2 rounded text-center bg-green-100 border border-green-200">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="py-2 md:py-3 rounded-full font-medium text-base md:text-lg shadow-md hover:scale-[1.02] transition w-full bg-[#442D1D] text-white mt-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-xs md:text-sm mt-4 text-center text-[#442D1D]">
            Remember your password?{" "}
            <Link
              to="/login"
              state={{ from: location.state?.from }}
              className="font-bold hover:underline text-[#442D1D]"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w-3/5 h-full">
        <div className="w-full h-full overflow-hidden">
          <img
            src={loginBg}
            alt="Forgot Password Art"
            className="block w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
