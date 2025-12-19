import React from "react";
import { Link } from "react-router-dom";

function GetStarted() {
  return (
    <section className="get-started-bg py-16 px-6 md:py-10 md:px-10 flex items-center min-h-[80vh] md:min-h-[85vh]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-start text-left max-w-3xl">
          <h2 className="text-3xl md:text-6xl font-bold text-[#442D1D] font-montserrat mb-2 md:mb-4 leading-tight">
            Start Your Collection
          </h2>

          <p className="text-[18px] md:text-3xl font-medium text-[#442D1D] mb-8 md:mb-10 leading-relaxed pr-10 md:pr-0">
            Sign in to begin building your personal digital gallery
          </p>

          <Link
            to="/beranda"
            className="bg-white text-[#442D1D] font-medium text-lg md:text-2xl py-3 px-8 md:py-4 md:px-10 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2 font-montserrat"
          >
            Get Started
            <span className="text-xl md:text-3xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
