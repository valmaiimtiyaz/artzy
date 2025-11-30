import React from "react";
import uploadIcon from "../assets/gambar_upload.svg";
import organizeIcon from "../assets/gambar_organizer.svg";
import saveIcon from "../assets/gambar_save.svg";

const steps = [
  {
    id: 1,
    title: "Upload your artwork",
    description:
      "Share your creations by uploading your artworks into your personal digital gallery",
    icon: uploadIcon,
  },
  {
    id: 2,
    title: "Organize your gallery",
    description:
      "Keep your art in one simple, beautiful place, view details, revisit, and reflect on your creative journey.",
    icon: organizeIcon,
  },
  {
    id: 3,
    title: "Save your personal collection",
    description:
      "Create your own space to collect and cherish your artworks over time.",
    icon: saveIcon,
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works-bg py-32 px-10">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h2
          id="howitworks"
          className="text-5xl font-bold text-[#442D1D] font-montserrat mb-14 text-center"
        >
          How It Works
        </h2>

        <div className="flex flex-col gap-8 w-full">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-[#F9F4EF] rounded-[10rem] p-10 px-16 shadow-lg flex items-center gap-10 w-full h-35 mb-3 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex-shrink-0">
                <img src={step.icon} alt={step.title} className="w-20 h-20" />
              </div>

              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-[#442D1D] mb-2 font-montserrat">
                  {step.title}
                </h3>
                <p className="text-lg text-[#5A4030] font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
