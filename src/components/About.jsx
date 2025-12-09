import React from "react";
import windowImage from "../assets/jendela.svg";

function About() {
  return (
    <section className="bg-[#F4EFEB] py-16 px-6 md:py-32 md:px-10 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full gap-12 md:gap-0">
        <div className="w-full md:w-1/2 md:pr-20 text-center md:text-left">
          <h2
            id="about"
            className="text-3xl md:text-5xl font-bold text-[#442D1D] font-montserrat mb-6 md:mb-8"
          >
            About
          </h2>

          <p className="text-lg md:text-2xl font-medium text-[#442D1D] leading-relaxed mb-6 text-start">
            Artzy is a minimalist digital gallery designed for artists who value
            clarity and creativity. It allows you to store, organize, and
            reflect on your artworks in one beautiful space.
          </p>

          <div className=" md:hidden w-full flex justify-center mb-6">
            <img
              src={windowImage}
              alt="Lukisan jendela dengan bunga"
              className="w-full max-w-xs h-auto object-cover rounded-xl shadow-2xl"
            />
          </div>

          <p className="text-right md:text-left text-lg md:text-2xl font-medium text-[#442D1D] leading-relaxed">
            Whether you're a beginner or an experienced creator, Artzy gives
            your creations a quiet place to live and grow, a timeless archive
            where every piece tells your story and every canvas finds its home.
          </p>
        </div>
        
        <div className="hidden md:flex w-1/2 justify-end">
          <img
            src={windowImage}
            alt="Lukisan jendela dengan bunga"
            className="w-full max-w-sm h-auto object-cover rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
