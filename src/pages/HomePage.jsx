import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import GetStarted from "../components/GetStarted";
import HowItWorks from "../components/HowItWorks";
import About from "../components/About";
import Gallery from "../components/Gallery";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/beranda");
    }
  }, [navigate]);

  return (
    <div className="font-montserrat bg-[#F4EFEB]">
      <header className="flex justify-between items-center px-10 py-6">
        <div className="text-2xl font-bold text-[#442D1D]">Artzy</div>
        <div className="space-x-4">
          <Link to="/login" className="px-6 py-2 border border-[#442D1D] rounded-full text-[#442D1D] font-semibold hover:bg-[#442D1D] hover:text-white transition">
            Sign In
          </Link>
          <Link to="/register" className="px-6 py-2 bg-[#442D1D] rounded-full text-white font-semibold hover:bg-[#2c1d13] transition">
            Sign Up
          </Link>
        </div>
      </header>
      <GetStarted />
      <HowItWorks />
      <About />
      <Gallery />
    </div>
  );
}

export default HomePage;
