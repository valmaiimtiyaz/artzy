import React, { useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/Rumah Fantasi 1.svg";
import About from "../components/About";
import Gallery from "../components/Gallery";
import HowItWorks from "../components/HowItWorks";
import GetStarted from "../components/GetStarted";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#F4EFEB] min-h-screen flex flex-col scroll-smooth">
      <header className="sticky top-0 z-50 bg-[#F4EFEB] shadow-md w-full border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-3 py-5 flex justify-between items-center">
          <div className="text-[25px] md:text-4xl font-extrabold text-[#442D1D] font-montserrat">
            Artzy
          </div>
          <nav className="hidden md:flex items-center font-medium text-[#442D1D] text-lg font-montserrat gap-7">
            <a
              href="#about"
              className="hover:text-amber-700 transition duration-150"
            >
              About
            </a>
            <a
              href="#gallery"
              className="hover:text-amber-700 transition duration-150"
            >
              Gallery
            </a>
            <a
              href="#howitworks"
              className="hover:text-amber-700 transition duration-150"
            >
              How It Works
            </a>
            <Link
              to="/login"
              className="font-semibold py-2 px-6 border border-gray-500 rounded-3xl hover:bg-[#442D1D] hover:text-white transition duration-200"
            >
              Login
            </Link>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#442D1D] focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-[#F4EFEB] absolute w-full left-0 top-full flex flex-col px-6 py-6 space-y-4 shadow-lg animate-fadeIn z-40">
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 bg-white shadow-sm rounded-xl text-[#442D1D] text-sm font-medium active:scale-95 transition-all duration-200"
            >
              About
            </a>
            <a
              href="#gallery"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 bg-white shadow-sm rounded-xl text-[#442D1D] text-sm font-medium active:scale-95 transition-all duration-200"
            >
              Gallery
            </a>
            <a
              href="#howitworks"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 bg-white shadow-sm rounded-xl text-[#442D1D] text-sm font-medium active:scale-95 transition-all duration-200"
            >
              How It Works
            </a>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 bg-[#442D1D] shadow-md rounded-xl text-[#E8D1A7] text-sm font-bold active:scale-95 transition-all duration-200"
            >
              Login
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow w-full py-10 md:py-20 px-6">
        <div className="mt-2 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          <div className="w-full md:w-2/3 flex justify-center md:justify-end">
            <img
              src={heroImage}
              alt="Lukisan pemandangan sungai"
              className="w-full max-w-md md:max-w-full h-auto object-cover rounded-xl"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="mt-[-20px] text-[28px] sm:text-4xl md:text-[50px] font-bold leading-tight md:leading-snug text-[#442D1D] font-montserrat w-full">
              The Modern Way to Experience Art
            </h1>
            <a
              href="#about"
              className="mt-6 md:mt-8 px-8 py-3 md:py-4 bg-[#442D1D] text-[#E8D1A7] font-medium rounded-full shadow-lg hover:bg-[#886757] transition duration-200 flex items-center font-montserrat text-lg md:text-[24px]"
            >
              Explore More
              <span className="ml-2 text-xl md:text-2xl">→</span>
            </a>
          </div>
        </div>
      </main>

      <About />
      <Gallery />
      <HowItWorks />
      <GetStarted />

      <footer className="bg-[#9D9167] py-4 text-center w-full mt-auto">
        <p className="text-white text-sm md:text-base font-medium font-montserrat tracking-wide px-4">
          © 2025 Artzy. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
