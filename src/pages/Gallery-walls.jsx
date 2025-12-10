import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function GalleryWalls() {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  }, [navigate]);

  const handleLike = async (e, artworkId) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    setArtworks((prev) =>
      prev.map((art) => {
        if (art.id === artworkId) {
          const isCurrentlyLiked = art.is_liked;
          return {
            ...art,
            is_liked: !isCurrentlyLiked,
            like_count: isCurrentlyLiked
              ? parseInt(art.like_count) - 1
              : parseInt(art.like_count) + 1,
          };
        }
        return art;
      })
    );

    try {
      await fetch(`${API_BASE_URL}/api/artworks/${artworkId}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const filteredArtworks =
    selectedCategory === "All"
      ? artworks
      : artworks.filter((art) => art.category === selectedCategory);

  const scrollLeft = () => {
    if (sliderRef.current) {
      // Scroll sebesar lebar kartu + gap
      const cardWidth =
        sliderRef.current.querySelector(".snap-center")?.offsetWidth || 300;
      sliderRef.current.scrollBy({
        left: -(cardWidth + 16),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      // Scroll sebesar lebar kartu + gap
      const cardWidth =
        sliderRef.current.querySelector(".snap-center")?.offsetWidth || 300;
      sliderRef.current.scrollBy({ left: cardWidth + 16, behavior: "smooth" });
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
      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#F4EFEB] shadow-md w-full border-b border-gray-300">
        <div className="max-w-full mx-auto flex justify-between items-center px-4 md:px-6 py-3 md:py-5">
          <div className="text-3xl md:text-4xl font-extrabold text-[#442D1D] font-montserrat">
            Artzy
          </div>

          <nav className="hidden md:flex items-center font-medium text-[#442D1D] text-lg font-montserrat gap-6">
            <Link
              to="/beranda"
              className="hover:text-amber-700 transition duration-150"
            >
              Home
            </Link>
            <Link
              to="/gallery-walls"
              className="hover:text-amber-700 transition duration-150"
            >
              Gallery Walls
            </Link>
            <Link
              to="/add-artwork"
              className="hover:text-amber-700 transition duration-150"
            >
              Add Artwork
            </Link>
            <Link
              to="/profile"
              className="font-semibold py-1.5 px-6 border border-gray-500 rounded-3xl hover:bg-[#442D1D] hover:text-white transition duration-200"
            >
              Profile
            </Link>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#442D1D] focus:outline-none"
            >
              {isMenuOpen ? (
                <svg
                  className="w-7 h-7"
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
                  className="w-7 h-7"
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

        {/* MOBILE DROPDOWN MENU */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#F4EFEB] shadow-lg flex flex-col px-6 py-4 space-y-3 animate-fadeIn z-40">
            <Link
              to="/beranda"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center py-3 bg-white shadow-sm rounded-xl text-[#442D1D] text-lg font-medium active:scale-95 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/gallery-walls"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center py-3 bg-white shadow-sm rounded-xl text-[#442D1D] text-lg font-medium active:scale-95 transition-all duration-200"
            >
              Gallery Walls
            </Link>
            <Link
              to="/add-artwork"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center py-3 bg-white shadow-sm rounded-xl text-[#442D1D] text-lg font-medium active:scale-95 transition-all duration-200"
            >
              Add Artwork
            </Link>
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center py-3 bg-[#442D1D] shadow-md rounded-xl text-[#E8D1A7] text-lg font-bold active:scale-95 transition-all duration-200 mt-2"
            >
              Profile
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow w-full flex flex-col gallery-gradient-bg overflow-hidden bg-gradient-to-b from-[#F4EFEB] to-[#C5B49A]">
        {/* JUDUL & FILTER CONTAINER */}
        <div className="relative mt-6 md:mt-10 px-4 md:px-10 pt-4 pb-0 md:py-4 max-w-7xl mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-[#442D1D] text-center mb-4 md:mb-0">
            Gallery Walls
          </h1>

          {/* FILTER BUTTON */}
          <div className="flex justify-end md:absolute md:right-10 md:top-1/2 md:-translate-y-1/2 w-full md:w-auto mt-4 px-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-[#442D1D] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow hover:bg-[#5e3f2b] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 md:w-5 md:h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                />
              </svg>
              <span className="text-xs md:text-sm font-medium">
                {selectedCategory === "All" ? "Filter" : selectedCategory}
              </span>
            </button>

            {isFilterOpen && (
              <div className="absolute top-full mt-2 w-40 md:w-48 bg-white rounded-xl shadow-xl z-50 border border-gray-200 overflow-hidden right-0">
                <div className="py-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#F4EFEB] transition ${
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

        {/* LOADING & EMPTY STATES */}
        {isLoading ? (
          <div className="flex-grow flex items-center justify-center w-full px-4 md:px-10 mt-[-1rem] md:mt-0">
            <div className="flex gap-6 overflow-hidden w-full max-w-7xl items-center">
              {[1].map((item) => (
                <div
                  key={item}
                  className="flex-none min-w-[90vw] h-[350px] md:h-[400px] bg-[#E8D1A7]/50 rounded-xl animate-pulse flex flex-col items-center justify-center p-6 gap-4"
                >
                  <div className="w-full h-48 bg-[#442D1D]/10 rounded-md"></div>
                  <div className="w-3/4 h-6 bg-[#442D1D]/10 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center px-4 -mt-10">
            <p className="text-lg md:text-2xl font-medium text-[#442D1D] mb-8 opacity-90">
              {artworks.length === 0
                ? "looks a little empty here.. start your collection"
                : `No artworks found in "${selectedCategory}" category.`}
            </p>
            {artworks.length === 0 && (
              <button
                onClick={() => navigate("/add-artwork")}
                className="bg-[#442D1D] text-[#F4EFEB] text-base md:text-xl font-medium py-3 px-8 md:px-12 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                + Add Artwork
              </button>
            )}
          </div>
        ) : (
          /* CAROUSEL UTAMA */
          <div className="flex-grow flex items-center justify-center w-full px-0 md:px-10 relative pb-10 mt-[-2rem] md:mt-0">
            {/* TOMBOL KIRI */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 md:left-10 z-20 p-1 md:p-2 rounded-full bg-white/70 md:bg-transparent shadow-md md:shadow-none hover:bg-[#442D1D]/10 transition cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="#442D1D"
                className="w-6 h-6 md:w-8 md:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* SLIDER AREA */}
            <div
              ref={sliderRef}
              className="flex gap-4 md:gap-12 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 md:px-12 py-8 md:py-10 no-scrollbar w-full max-w-7xl items-center"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredArtworks.map((art) => (
                <div
                  key={art.id || art._id}
                  // FIX 1: min-w-[90vw] supaya card lebar penuh di HP
                  // FIX 2: justify-between supaya konten (judul/footer) tidak saling tindih
                  className="flex-none min-w-[90vw] md:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1.5rem)] snap-center bg-[#E8D1A7] text-center rounded-xl shadow-lg overflow-hidden flex flex-col justify-between transform hover:scale-[1.02] transition-transform duration-300 relative group cursor-pointer"
                  onClick={() => navigate(`/artwork/${art.id || art._id}`)}
                >
                  <div className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-[#442D1D] shadow-sm z-10">
                    {art.category}
                  </div>

                  {/* FIX 3: Container Gambar dikunci tingginya */}
                  <div className="h-64 md:h-80 w-full overflow-hidden flex justify-center items-center mt-6 md:mt-8 px-4 md:px-6">
                    <img
                      src={art.image || art.imageUrl}
                      alt={art.title}
                      // FIX 4: object-cover + w-full h-full agar tidak gepeng dan memenuhi kotak
                      className="w-full h-full object-cover rounded-md shadow-sm"
                    />
                  </div>

                  <div className="p-4 md:p-6 flex flex-col justify-between flex-grow mt-[-0.5rem]">
                    <div className="mb-3 md:mb-4">
                      <p className="text-lg md:text-xl font-bold text-[#442D1D] mb-1 leading-tight">
                        {art.title}
                      </p>
                      <p className="text-sm md:text-base font-medium text-[#442D1D]">
                        by {art.artist}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-2 border-t border-[#442D1D]/10 pt-4">
                      <button
                        onClick={(e) => handleLike(e, art.id)}
                        className="flex items-center gap-1 group/like transition z-20 hover:bg-[#442D1D]/10 px-2 py-1 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={art.is_liked ? "#DC2626" : "none"}
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke={art.is_liked ? "#DC2626" : "#442D1D"}
                          className="w-5 h-5 transition transform group-active/like:scale-125"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                        <span className="text-sm font-semibold text-[#442D1D]">
                          {art.like_count || 0}
                        </span>
                      </button>

                      <div className="text-xs md:text-sm font-medium italic text-[#442D1D] hover:text-[#6c4e3e]">
                        View Details →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TOMBOL KANAN */}
            <button
              onClick={scrollRight}
              className="absolute right-0 md:right-10 z-20 p-1 md:p-2 rounded-full bg-white/70 md:bg-transparent shadow-md md:shadow-none hover:bg-[#442D1D]/10 transition cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="#442D1D"
                className="w-6 h-6 md:w-8 md:h-8"
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

        <style>{`
          .no-scrollbar::-webkit-scrollbar {
              display: none;
          }
        `}</style>
      </main>
    </div>
  );
}

export default GalleryWalls;
