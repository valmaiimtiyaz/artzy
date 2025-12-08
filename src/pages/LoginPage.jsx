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
    <div className="flex w-screen h-screen overflow-hidden bg-[#F4EFEB] font-montserrat">
      <div className="w-2/5 flex flex-col justify-center items-start px-24 gap-6 text-[#442D1D] relative">
        <div className="absolute top-8 left-8 text-xl">
          <Link
            to="/"
            className="flex items-center gap-1 hover:opacity-75 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-5 stroke-current"
            >
              <path
                d="M15.75 19.5 8.25 12l7.5-7.5"
                fill="none"
                strokeWidth="3.0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-lg font-medium">Back</span>
          </Link>
        </div>

        <div className="flex flex-col gap-2 mb-6 mt-20 w-full items-center text-center">
          <h1 className="text-4xl font-bold text-[#442D1D]">
            Welcome to Artzy
          </h1>
          <p className="text-lg text-[#442D1D] font-semibold">
            Log into your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-lg text-[#442D1D] font-semibold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/25 border border-white/50 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent"
              placeholder="user@gmail.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg text-[#442D1D] font-semibold">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/25 border border-white/50 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-5 flex items-center text-[#442D1D] cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
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
                    className="w-5 h-5"
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
            className="self-start text-sm hover:underline text-[#442D1D] font-medium cursor-pointer"
          >
            Forgot Password
          </button>

          {error && (
            <div
              className="text-sm text-red-600 font-medium p-2 rounded text-center"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="py-3 rounded-full font-medium text-lg shadow-md hover:scale-[1.02] transition w-full bg-[#442D1D] text-white cursor-pointer"
          >
            Login
          </button>

          <p className="text-sm mt-3 text-center text-[#442D1D]">
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

      <div className="w-3/5 h-full">
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
