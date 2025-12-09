import React from "react";
import { Link } from "react-router-dom";
import girlWithPearl from "../assets/image 6.png";
import theScream from "../assets/image 8.png";
import monaLisa from "../assets/image 7.png";

export const galleryItems = [
  {
    id: 1,
    image: girlWithPearl,
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
  },
  {
    id: 2,
    image: theScream,
    title: "The Scream",
    artist: "Edvard Munch",
  },
  {
    id: 3,
    image: monaLisa,
    title: "Mona Lisa",
    artist: "Leonardo Da Vinci",
  },
];

const GalleryCard = ({ item }) => (
  <div className="bg-[#E8D1A7] text-center rounded-xl shadow-lg overflow-hidden flex flex-col w-full max-w-sm mx-auto justify-center transform hover:scale-105 transition-transform duration-300 h-full">
    <div className="h-80 overflow-hidden flex justify-center mt-6 px-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover rounded-md"
      />
    </div>

    <div className="p-4 flex flex-col justify-between flex-grow">
      <div>
        <p className="text-lg font-bold text-[#442D1D]">{item.title}</p>
        <p className="text-sm font-medium text-[#442D1D] mb-4">
          by {item.artist}
        </p>
      </div>
      <Link
        to="/login"
        className="text-sm font-medium italic text-[#442D1D] hover:text-[#6c4e3e] mb-3"
      >
        View Details
      </Link>
    </div>
  </div>
);

function Gallery() {
  return (
    <section className="gallery-gradient-bg py-16 px-6 md:py-32 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2
          id="gallery"
          className="text-3xl md:text-5xl font-bold text-[#442D1D] font-montserrat mb-3 text-center"
        >
          Collect What You Create
        </h2>
        <p className="text-lg md:text-2xl font-medium text-[#442D1D] mb-10 text-center px-4">
          store, organize, and revisit your artworks anytime
        </p>

        <div className="w-full">
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10 px-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center flex justify-center"
              >
                <GalleryCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

export default Gallery;
