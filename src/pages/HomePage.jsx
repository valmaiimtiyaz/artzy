import React from "react";
import heroImage from "../assets/Rumah Fantasi 1.svg";
import About from "../components/About";
import Gallery from "../components/Gallery";
import HowItWorks from "../components/HowItWorks";
import GetStarted from "../components/GetStarted";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-[#F4EFEB] min-h-screen flex flex-col scroll-smooth">
      <header className="sticky top-0 z-50 flex justify-between items-center px-10 py-5 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md gap-4">
        <div className="text-4xl font-extrabold text-[#442D1D] font-montserrat px-4">
          Artzy
        </div>

        <nav className="flex items-center font-medium text-[#442D1D] text-lg font-montserrat gap-6">
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
            className="font-semibold py-1.5 px-6 border border-gray-500 rounded-3xl hover:bg-[#442D1D] hover:text-white transition duration-200"
          >
            Login
          </Link>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center w-full py-16">
        <div className="flex items-center justify-start max-w-7xl w-full ml-30 mr-auto gap-10 px-10 mt-5">
          <div className="w-4/3 flex justify-end">
            <img
              src={heroImage}
              alt="Lukisan pemandangan sungai"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>

          <div className="w-2/3 flex flex-col item-start text-left">
            <h1 className="text-[50px] font-bold leading-snug text-[#442D1D] font-montserrat w-full">
              The Modern Way to Experience Art
            </h1>

            <a
              href="#about"
              className="mt-8 px-8 py-4 bg-[#442D1D] text-[#E8D1A7] font-medium rounded-full shadow-lg hover:bg-[#886757] transition duration-200 flex items-center font-montserrat text-[24px] self-start"
            >
              Explore More
              <span className="ml-3 text-2xl">→</span>
            </a>
          </div>
        </div>
      </main>

      <About />
      <Gallery />
      <HowItWorks />
      <GetStarted />
      <footer className="bg-[#9D9167] py-4 text-center w-full">
        <p className="text-white text-sm font-medium font-montserrat tracking-wide">
          © 2025 Artzy. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
