import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../assets/Rumah Fantasi 2.png";
import { toastSuccess, toastError } from "../components/ToastWithProgress";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = "https://artzybackend.vercel.app";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/beranda");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password must be filled in");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("token", data.token);
      toastSuccess("Login success!");
      navigate("/beranda");
    } catch (err) {
      toastError(err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-screen min-h-screen md:h-screen overflow-auto md:overflow-hidden bg-[#F4EFEB] font-montserrat">
      <div className="w-full md:w-2/5 flex flex-col justify-center items-center md:items-start px-6 md:px-24 py-10 gap-4 md:gap-6 text-[#442D1D] relative min-h-screen md:min-h-0">
        {/* --- BAGIAN YANG DIUBAH --- */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 text-xl">
          <Link
            to="/beranda" // Sebelumnya "/", sekarang ke "/beranda"
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
        {/* ------------------------- */}

        <div className="flex flex-col gap-1 md:gap-2 mb-4 md:mb-6 mt-0 md:mt-20 w-full items-center text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-[#442D1D]">
            Welcome to Artzy
          </h1>
          <p className="text-sm md:text-lg text-[#442D1D] font-semibold">
            Log into your account
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
              className="w-full px-5 py-2 md:py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/25 border border-white/50 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent"
              placeholder="user@gmail.com"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm md:text-lg text-[#442D1D] font-semibold">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-2 md:py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/25 border border-white/50 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-5 flex items-center text-[#442D1D] cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
              >
                {showPassword ? (
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2.25 12s2.25-6 9.75-6 9.75 6 9.75 6-2.25 6-9.75 6-9.75-6-9.75-6z" />
                    <path d="M2.25 2.25l19.5 19.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2.25 12s2.25-6 9.75-6 9.75 6 9.75 6-2.25 6-9.75 6-9.75-6-9.75-6z" />
                    <circle cx="12" cy="12" r="2.25" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="self-start text-xs md:text-sm hover:underline text-[#442D1D] font-medium cursor-pointer"
          >
            Forgot Password
          </button>

          {error && (
            <div
              className="text-xs md:text-sm text-red-600 font-medium p-2 rounded text-center"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="py-2 md:py-3 rounded-full font-medium text-base md:text-lg shadow-md hover:scale-[1.02] transition w-full bg-[#442D1D] text-white cursor-pointer"
          >
            Login
          </button>

          <p className="text-xs md:text-sm mt-3 text-center text-[#442D1D]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold hover:underline text-[#442D1D]"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-3/5 h-full">
        <div className="w-full h-full overflow-hidden">
          <img
            src={loginBg}
            alt="Login Side Art"
            className="block w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
