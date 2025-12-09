import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Beranda() {
  const [username, setUsername] = useState("User");
  const [searchQuery, setSearchQuery] = useState("");
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
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      <header className="sticky top-0 z-50 flex justify-between items-center px-10 py-5 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md gap-4">
        <div className="text-4xl font-extrabold text-[#442D1D] font-montserrat px-4">
          Artzy
        </div>
        <div className="flex-grow max-w-xl mx-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-[#442D1D] opacity-50"
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
              className="w-full py-2 pl-10 pr-4 bg-transparent border border-[#442D1D]/30 rounded-full focus:outline-none focus:border-[#442D1D] focus:ring-1 focus:ring-[#442D1D] text-[#442D1D] placeholder-[#442D1D]/50 transition-all"
              placeholder="Search artist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
        <nav className="flex items-center font-medium text-[#442D1D] text-lg font-montserrat gap-6">
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
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-center w-full beranda-bg px-4 mt-[-40px]">
        <h1 className="text-[70px] font-extrabold text-[#442D1D] mb-2 tracking-tight">
          Welcome back, {username} !
        </h1>

        <p className="text-3xl font-medium text-[#442D1D] mb-12 opacity-90">
          All your creations, beautifully organized
        </p>

        <Link
          to="/add-artwork"
          className="bg-[#442D1D] text-[#F4EFEB] text-xl font-medium py-3 px-12 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2"
        >
          + Add Artwork
        </Link>
      </main>
    </div>
  );
}

export default Beranda;
