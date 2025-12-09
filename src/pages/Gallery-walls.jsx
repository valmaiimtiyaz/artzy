import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function GalleryWalls() {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sliderRef = useRef(null);
  const API_BASE_URL = "https://artzybackend.vercel.app";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchArtworks = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/artworks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setArtworks(data);
        }
      } catch (err) {
        console.error("Failed to fetch artworks", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  const filteredArtworks =
    selectedCategory === "All"
      ? artworks
      : artworks.filter((art) => art.category === selectedCategory);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  const categories = [
    "All",
    "Painting",
    "Digital Art",
    "Photography",
    "Sketch",
    "Abstract",
    "Sculpture",
    "Other",
  ];

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      <header className="sticky top-0 z-50 flex justify-between items-center px-10 py-6 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md">
        <div className="text-4xl font-extrabold text-[#442D1D] font-montserrat px-8">
          Artzy
        </div>
        <nav className="flex items-center font-medium text-[#442D1D] px-8 text-xl font-montserrat">
          <Link
            to="/beranda"
            className="hover:text-amber-700 transition duration-150 mr-8"
          >
            Home
          </Link>
          <Link
            to="/gallery-walls"
            className="hover:text-amber-700 transition duration-150 mr-8"
          >
            Gallery Walls
          </Link>
          <Link
            to="/add-artwork"
            className="hover:text-amber-700 transition duration-150 mr-8"
          >
            Add Artwork
          </Link>
          <Link
            to="/profile"
            className="font-semibold py-1.5 border border-gray-500 rounded-3xl hover:bg-[#442D1D] hover:text-white transition duration-200 px-8"
          >
            Profile
          </Link>
        </nav>
      </header>

      <main className="flex-grow w-full flex flex-col gallery-gradient-bg overflow-hidden bg-gradient-to-b from-[#F4EFEB] to-[#C5B49A]">
        <div className="relative flex justify-center items-center mt-10 px-10"> 
          <h1 className="text-4xl font-bold text-[#442D1D]">Gallery Walls</h1>

          <div className="absolute right-10 lg:right-20">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-[#442D1D] text-white px-4 py-2 rounded-full shadow hover:bg-[#5e3f2b] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                />
              </svg>
              <span className="text-sm font-medium">
                {selectedCategory === "All" ? "Filter" : selectedCategory}
              </span>
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-50 border border-gray-200 overflow-hidden">
                <div className="py-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-3 text-sm hover:bg-[#F4EFEB] transition ${
                        selectedCategory === cat
                          ? "font-bold text-[#442D1D] bg-[#F4EFEB]"
                          : "text-gray-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {isLoading ? (
          <div className="flex-grow flex items-center justify-center w-full px-10">
            <div className="flex gap-12 overflow-hidden w-full max-w-7xl items-center px-12">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex-none w-95 h-[400px] bg-[#E8D1A7]/50 rounded-xl animate-pulse flex flex-col items-center justify-center p-6 gap-4"
                >
                  <div className="w-full h-64 bg-[#442D1D]/10 rounded-md"></div>
                  <div className="w-3/4 h-6 bg-[#442D1D]/10 rounded-full"></div>
                  <div className="w-1/2 h-4 bg-[#442D1D]/10 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center px-4 -mt-10">
            <p className="text-2xl font-medium text-[#442D1D] mb-8 opacity-90">
              {artworks.length === 0
                ? "looks a little empty here.. start your collection"
                : `No artworks found in "${selectedCategory}" category.`}
            </p>
            {artworks.length === 0 && (
              <button
                onClick={() => navigate("/add-artwork")}
                className="bg-[#442D1D] text-[#F4EFEB] text-xl font-medium py-3 px-12 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                + Add Artwork
              </button>
            )}
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center w-full px-10 relative pb-20">
            <button
              onClick={scrollLeft}
              className="absolute left-10 z-20 p-2 rounded-full hover:bg-[#442D1D]/10 transition cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="#442D1D"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <div
              ref={sliderRef}
              className="flex gap-12 overflow-x-auto scroll-smooth px-12 py-10 no-scrollbar w-full max-w-7xl items-center"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredArtworks.map((art) => (
                <div
                  key={art.id || art._id}
                  className="flex-none w-95 bg-[#E8D1A7] text-center rounded-xl shadow-lg overflow-hidden flex flex-col justify-center transform hover:scale-105 transition-transform duration-300 relative group"
                >
                  <div className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-[#442D1D] shadow-sm z-10">
                    {art.category}
                  </div>

                  <div className="h-80 overflow-hidden flex justify-center mt-8 px-6">
                    <img
                      src={art.image || art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover rounded-md shadow-sm"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow mt-[-0.5rem]">
                    <div className="mb-4">
                      <p className="text-xl font-bold text-[#442D1D] mb-1 leading-tight">
                        {art.title}
                      </p>
                      <p className="text-base font-medium text-[#442D1D]">
                        by {art.artist}
                      </p>
                    </div>
                    <div
                      onClick={() => navigate(`/artwork/${art.id || art._id}`)}
                      className="text-sm font-medium italic text-[#442D1D] hover:text-[#6c4e3e] cursor-pointer mb-2"
                    >
                      View Details
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="absolute right-10 z-20 p-2 rounded-full hover:bg-[#442D1D]/10 transition cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="#442D1D"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default GalleryWalls;
