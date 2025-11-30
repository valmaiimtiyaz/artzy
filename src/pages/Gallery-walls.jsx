import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function GalleryWalls() {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  
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
        console.error("Gagal ambil artworks", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtworks();
  }, [navigate]);

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

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      <header className="sticky top-0 z-10 flex justify-between items-center px-10 py-6 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md">
        <div className="text-4xl font-extrabold text-[#442D1D] font-montserrat px-8">
          Artzy
        </div>
        <nav className="flex items-center font-medium text-[#442D1D] px-8 text-xl font-montserrat">
          <Link to="/beranda" className="hover:text-amber-700 transition duration-150 mr-8">Home</Link>
          <Link to="/gallery-walls" className="hover:text-amber-700 transition duration-150 mr-8">Gallery Walls</Link>
          <Link to="/add-artwork" className="hover:text-amber-700 transition duration-150 mr-8">Add Artwork</Link>
          <Link to="/profile" className="font-semibold py-1.5 border border-gray-500 rounded-3xl hover:bg-[#442D1D] hover:text-white transition duration-200 px-8">Profile</Link>
        </nav>
      </header>

      <main className="flex-grow w-full flex flex-col gallery-gradient-bg overflow-hidden bg-gradient-to-b from-[#F4EFEB] to-[#C5B49A]">
        <h1 className="text-4xl font-bold text-[#442D1D] text-center mt-10">
          Gallery Walls
        </h1>

        {isLoading ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-xl font-medium text-[#442D1D] animate-pulse">Loading your masterpiece...</p>
          </div>
        ) : artworks.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center px-4 -mt-20">
            <p className="text-2xl font-medium text-[#442D1D] mb-12 opacity-90">
              looks a little empty here.. start your collection
            </p>
            <button
              onClick={() => navigate("/add-artwork")}
              className="bg-[#442D1D] text-[#F4EFEB] text-xl font-medium py-3 px-12 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              + Add Artwork
            </button>
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center w-full px-10 relative pb-20">
            <button onClick={scrollLeft} className="absolute left-10 z-20 p-2 rounded-full hover:bg-[#442D1D]/10 transition cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#442D1D" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div
              ref={sliderRef}
              className="flex gap-12 overflow-x-auto scroll-smooth px-12 py-10 no-scrollbar w-full max-w-7xl items-center"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {artworks.map((art) => (
                <div key={art.id} className="flex-none w-[350px] bg-[#E8D1A7] text-center rounded-xl shadow-lg overflow-hidden flex flex-col justify-center transform hover:scale-105 transition-transform duration-300">
                  <div className="h-80 overflow-hidden flex justify-center mt-8 px-6">
                    <img src={art.image} alt={art.title} className="w-full h-full object-cover rounded-md shadow-sm" />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow mt-[-0.5rem]">
                    <div className="mb-4">
                      <p className="text-xl font-bold text-[#442D1D] mb-1 leading-tight">{art.title}</p>
                      <p className="text-base font-medium text-[#442D1D]">by {art.artist}</p>
                    </div>
                    <div
                      onClick={() => navigate(`/artwork/${art.id}`)}
                      className="text-sm font-medium italic text-[#442D1D] hover:text-[#6c4e3e] cursor-pointer mb-2"
                    >
                      View Details
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={scrollRight} className="absolute right-10 z-20 p-2 rounded-full hover:bg-[#442D1D]/10 transition cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#442D1D" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default GalleryWalls;
