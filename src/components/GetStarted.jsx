import React from "react";
import { Link } from "react-router-dom";

function GetStarted() {
  return (
    <section className="get-started-bg py-10 px-10 flex items-center min-h-[85vh]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-start text-left max-w-3xl">
          <h2 className="text-6xl font-bold text-[#442D1D] font-montserrat mb-6">
            Start Your Collection
          </h2>

          <p className="text-3xl font-medium text-[#442D1D] mb-10">
            Sign in to begin building your personal digital gallery
          </p>

          <Link
            to="/login"
            className="bg-white text-[#442D1D] font-medium text-2xl py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2 font-montserrat"
          >
            {" "}
            Get Started <span className="text-3xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
