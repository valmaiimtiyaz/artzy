import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerBg from "../assets/Rumah Fantasi 2.png";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("All fields must be filled in");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to Register");

      alert("Register success! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden font-montserrat bg-[#F4EFEB]">
      <div className="w-2/5 flex flex-col justify-center items-start px-24 gap-6 relative text-[#442D1D]">
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

        <div className="flex flex-col gap-2 mb-4 mt-10 w-full items-center text-center">
          <h1 className="text-4xl font-bold">Create an account</h1>
          <p className="text-sm font-medium">
            Already have an account?{" "}
            <Link to="/login" className="font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-base font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 
               backdrop-blur-lg bg-[#442D1D]/20 border border-white/60 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent"
              placeholder="LoremKece25"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 
               backdrop-blur-lg bg-[#442D1D]/20 border border-white/60 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent"
              placeholder="user@gmail.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base font-semibold">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 
                 backdrop-blur-lg bg-[#442D1D]/20 border border-white/60 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-5 flex items-center text-[#442D1D] cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-none stroke-current"
                >
                  {showPassword ? (
                    // Mata terbuka → ketutup (ada garis slash)
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
                    // Mata tertutup → terbuka
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
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base font-semibold">Confirm Password</label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 
                 backdrop-blur-lg bg-[#442D1D]/20 border border-white/60 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-5 flex items-center text-[#442D1D] cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-none stroke-current"
                >
                  {showConfirmPassword ? (
                    // Mata terbuka → ketutup (ada garis slash)
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
                    // Mata tertutup → terbuka
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
                </svg>
              </button>
            </div>
          </div>

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
            className="py-3 rounded-full font-medium text-lg shadow-md hover:scale-[1.02] transition w-full text-white bg-[#442D1D] cursor-pointer"
          >
            Create an account
          </button>
        </form>
      </div>

      <div className="w-3/5 h-full">
        <div className="w-full h-full overflow-hidden">
          <img
            src={registerBg}
            alt="Register Side Art"
            className="block w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
