import React from "react";
import windowImage from "../assets/jendela.svg";

function About() {
  return (
    <section className="bg-[#F4EFEB] py-32 px-10 min-h-[100vh]">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">  
        <div className="w-1/2 pr-20">
          <h2
            id="about"
            className="text-5xl font-bold text-[#442D1D] font-montserrat mb-8 "
          >
            About
          </h2>

          <p className="text-2xl font-medium text-[#442D1D] leading-relaxed mb-6">
            Artzy is a minimalist digital gallery designed for artists who value
            clarity and creativity. It allows you to store, organize, and
            reflect on your artworks in one beautiful space.
          </p>

          <p className="text-2xl font-medium text-[#442D1D] leading-relaxed">
            Whether you're a beginner or an experienced creator, Artzy gives
            your creations a quiet place to live and grow, a timeless archive
            where every piece tells your story and every canvas finds its home.
          </p>
        </div>

        <div className="w-1/2 flex justify-end">
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
