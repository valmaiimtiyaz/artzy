import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 

function GalleryWalls() {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sliderRef = useRef(null);
  const API_BASE_URL = "https://artzybackend.vercel.app";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const fetchArtworks = async () => {
      setIsLoading(true);
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await fetch(`${API_BASE_URL}/api/artworks`, {
          headers: headers,
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

  const handleLike = async (e, artworkId) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to like artworks!");
      navigate("/login");
      return;
    }

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
      toast.error("Failed to like artwork"); 
    }
  };

  const filteredArtworks =
    selectedCategory === "All"
      ? artworks
      : artworks.filter((art) => art.category === selectedCategory);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.clientWidth,
        behavior: "smooth",
      });
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
      <header className="sticky top-0 z-50 bg-[#F4EFEB] shadow-md w-full border-b border-gray-300">
        <div className="max-w-full mx-auto flex justify-between items-center px-4 md:px-6 py-3 md:py-5">
          <div className="text-[25px] md:text-4xl font-extrabold text-[#442D1D] font-montserrat">
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
              to={isLoggedIn ? "/add-artwork" : "/login"}
              className="hover:text-amber-700 transition duration-150"
            >
              Add Artwork
            </Link>
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="font-semibold py-1.5 px-6 border border-gray-500 rounded-3xl hover:bg-[#442D1D] hover:text-white transition duration-200"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="font-semibold py-1.5 px-6 bg-[#442D1D] text-white border border-[#442D1D] rounded-3xl hover:bg-transparent hover:text-[#442D1D] transition duration-200"
              >
                Login
              </Link>
            )}
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

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#F4EFEB] shadow-lg flex flex-col px-6 py-4 space-y-3 animate-fadeIn z-40">
            <Link
              to="/beranda"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center py-3 bg-white shadow-sm rounded-xl text-[#442D1D] text-sm font-medium active:scale-95 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/gallery-walls"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center py-3 bg-white shadow-sm rounded-xl text-[#442D1D] text-sm font-medium active:scale-95 transition-all duration-200"
            >
              Gallery Walls
            </Link>
            <Link
              to={isLoggedIn ? "/add-artwork" : "/login"}
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center py-3 bg-white shadow-sm rounded-xl text-[#442D1D] text-sm font-medium active:scale-95 transition-all duration-200"
            >
              Add Artwork
            </Link>
            
            {isLoggedIn ? (
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center py-3 bg-[#442D1D] shadow-md rounded-xl text-[#E8D1A7] text-sm font-bold active:scale-95 transition-all duration-200 mt-2"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center py-3 bg-[#442D1D] shadow-md rounded-xl text-white text-sm font-bold active:scale-95 transition-all duration-200 mt-2"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </header>

      <main className="flex-grow w-full flex flex-col gallery-gradient-bg overflow-hidden bg-gradient-to-b from-[#F4EFEB] to-[#C5B49A]">
        <div className="relative mt-6 md:mt-10 px-4 max-w-7xl mx-auto w-full mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#442D1D] text-center mb-4">
            Gallery Walls
          </h1>
          <div className="flex justify-center md:justify-end w-full relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-[#442D1D] text-white px-4 py-2 rounded-full shadow hover:bg-[#5e3f2b] transition text-sm md:text-lg mb-[-20px]"
            >
              <span>
                {selectedCategory === "All"
                  ? "Filter Category"
                  : selectedCategory}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            {isFilterOpen && (
              <div className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-xl z-50 overflow-hidden text-left">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsFilterOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-[#442D1D] border-b border-gray-100 last:border-0"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex-grow flex items-center justify-center w-full px-4 h-96">
            <div className="w-full h-full max-w-sm bg-[#E8D1A7]/50 rounded-2xl animate-pulse"></div>
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
            <p className="text-xl text-[#442D1D] opacity-80 mb-4">
              No artworks found.
            </p>
            <button
              onClick={() => navigate(isLoggedIn ? "/add-artwork" : "/login")}
              className="bg-[#442D1D] text-white py-2 px-6 rounded-full"
            >
              + Add Artwork
            </button>
          </div>
        ) : (
          <div className="flex-grow flex flex-col justify-center w-full pb-10">
            <div className="relative w-full">
              <button
                onClick={scrollLeft}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/70 shadow-md hover:bg-[#442D1D]/10 transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="#442D1D"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <div
                ref={sliderRef}
                className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 md:px-12 py-8 no-scrollbar w-full max-w-7xl mx-auto items-stretch"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {filteredArtworks.map((art) => (
                  <div
                    key={art.id || art._id}
                    className="snap-center shrink-0 flex flex-col bg-[#E8D1A7] rounded-3xl shadow-lg overflow-hidden relative group cursor-pointer transform hover:scale-[1.02] transition-transform duration-300 min-w-full md:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(33.333%-1rem)]"
                    onClick={() => navigate(`/artwork/${art.id || art._id}`)}
                  >
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-[#442D1D] z-10 shadow-sm">
                      {art.category}
                    </div>
                    <div className="w-full aspect-square relative bg-gray-200">
                      <img
                        src={art.image || art.imageUrl}
                        alt={art.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 bg-[#E8D1A7] flex flex-col justify-between flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div className="max-w-[80%]">
                          <h3 className="text-xl md:text-2xl font-extrabold text-[#442D1D] leading-tight line-clamp-2">
                            {art.title}
                          </h3>
                          <p className="text-sm font-medium text-[#442D1D]/80 mt-1">
                            by {art.artist}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleLike(e, art.id)}
                          className="flex flex-col items-center justify-center ml-2 min-w-[40px] pt-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={art.is_liked ? "#DC2626" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke={art.is_liked ? "#DC2626" : "#442D1D"}
                            className="w-8 h-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                          </svg>
                          <span className="text-xs font-bold text-[#442D1D] mt-0.5">
                            {art.like_count || 0}
                          </span>
                        </button>
                      </div>
                      <div className="mt-3 pt-3 border-t border-[#442D1D]/20 flex justify-between items-center">
                        <span className="text-xs font-bold text-[#442D1D] uppercase tracking-wider">
                          Tap to view
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="#442D1D"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={scrollRight}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/70 shadow-md hover:bg-[#442D1D]/10 transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="#442D1D"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
}

export default GalleryWalls;