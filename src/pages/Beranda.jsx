import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Beranda() {
  const [username, setUsername] = useState("User");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = "https://artzybackend.vercel.app";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setUsername(data.username || "User");
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/user/${searchQuery.trim()}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      <header className="sticky top-0 z-50 bg-[#F4EFEB] shadow-md w-full border-b border-gray-300">
        <div className="max-w-full mx-auto flex justify-between items-center px-3 md:px-6 py-3 md:py-5">
          <div className="text-[25px] md:text-4xl font-extrabold text-[#442D1D] font-montserrat flex-shrink-0">
            Artzy
          </div>

          <div className="flex-grow flex items-center mx-5 max-w-sm md:max-w-xl md:mx-5">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-[#442D1D] opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </span>
              <input
                type="text"
                className="w-full py-1 pl-10 pr-4 bg-transparent border border-[#442D1D]/30 rounded-full focus:outline-none focus:border-[#442D1D] focus:ring-1 focus:ring-[#442D1D] text-[#442D1D] placeholder-[#442D1D]/50 transition-all text-sm md:text-base"
                placeholder="Search artist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>

          <div className="flex items-center flex-shrink-0">
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

            <div className="md:hidden ml-2">
              {" "}
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
        </div>

        {/* MOBILE DROPDOWN MENU */}
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
              to="/add-artwork"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center py-3 bg-white shadow-sm rounded-xl text-[#442D1D] text-sm font-medium active:scale-95 transition-all duration-200"
            >
              Add Artwork
            </Link>
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center py-3 bg-[#442D1D] shadow-md rounded-xl text-[#E8D1A7] text-sm font-bold active:scale-95 transition-all duration-200 mt-2"
            >
              Profile
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center w-full beranda-bg px-4 py-16 md:py-32">
        <h1 className="text-3xl md:text-[70px] font-extrabold text-[#442D1D] mb-2 tracking-tight leading-tight">
          Welcome back, {username} !
        </h1>

        <p className="text-base md:text-3xl font-medium text-[#442D1D] mb-10 md:mb-12 opacity-90">
          All your creations, beautifully organized
        </p>

        <Link
          to="/add-artwork"
          className="bg-[#442D1D] text-[#F4EFEB] text-base md:text-xl font-medium py-3 px-8 md:px-12 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2"
        >
          + Add Artwork
        </Link>
      </main>
    </div>
  );
}

export default Beranda;
