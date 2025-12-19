import React, { useState, useEffect } from "react";
import { User, Edit3 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toastSuccess } from "../components/ToastWithProgress";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", { month: "long", year: "numeric" });
};

function Profile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [artworkCount, setArtworkCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = true;

  const API_BASE_URL = "https://artzybackend.vercel.app";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const profilePromise = fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const artworkPromise = fetch(`${API_BASE_URL}/api/artworks`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const [profileRes, artworkRes] = await Promise.all([
          profilePromise,
          artworkPromise,
        ]);

        const profileData = await profileRes.json();
        if (profileRes.ok) {
          setProfileData(profileData);
        }

        const artworkData = await artworkRes.json();
        if (artworkRes.ok && Array.isArray(artworkData)) {
          setArtworkCount(artworkData.length);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [navigate, API_BASE_URL]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toastSuccess("Logout Success!");
    navigate("/login");
  };

  if (isLoading || !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EFEB] font-montserrat">
        <div className="text-xl text-[#442D1D]">
          {isLoading ? "Loading..." : "Failed to load profile data."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-montserrat bg-gradient-to-b from-[#F4EFEB] to-[#C5B49A]/50">
      <header className="sticky top-0 z-50 bg-[#F4EFEB] shadow-md w-full border-b border-gray-300">
        <div className="max-w-full mx-auto flex justify-between items-center px-4 md:px-10 py-3 md:py-5">
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

      {/* ... SISA KONTEN PROFILE (Main, Detail Info, Logout) TIDAK PERLU DIUBAH KARENA SUDAH BENAR ... */}
      <main className="flex-grow flex flex-col items-center p-4 sm:p-8 md:p-12 font-montserrat gallery-gradient-bg">
        {/* Konten tetap sama seperti kodemu sebelumnya */}
        <div className="w-full max-w-4xl space-y-6 md:space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold text-[#442D1D] mb-4 md:mb-8 text-center md:text-left mt-3">
            My Profile
          </h1>

          {/* Section Foto & Nama */}
          <div className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row justify-between items-center md:items-start shadow-lg gap-4">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full md:w-auto">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white/50 shadow-sm overflow-hidden bg-[#442D1D]/10 flex items-center justify-center flex-shrink-0">
                {profileData.profile_pic ? (
                  <img
                    src={profileData.profile_pic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User
                    className="w-8 h-8 md:w-10 md:h-10 text-[#442D1D]"
                    strokeWidth={1.5}
                  />
                )}
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xl md:text-2xl font-bold text-[#442D1D]">
                  {profileData.first_name} {profileData.last_name}
                </p>
                <p className="text-base md:text-lg text-[#442D1D]/70">
                  {profileData.handle || `@${profileData.username}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/edit-profile")}
              className="flex items-center space-x-2 bg-[#442D1D] text-white text-sm md:text-base font-semibold py-2 px-4 md:px-6 rounded-full shadow-md hover:bg-[#6c4e3e] transition duration-200 cursor-pointer flex-shrink-0 w-full sm:w-auto mt-4 md:mt-0"
            >
              <Edit3 className="w-4 h-4" /> <span>Edit Profile</span>
            </button>
          </div>

          {/* Personal Info */}
          <div className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-[20px] p-6 md:p-10 shadow-lg">
            <h3 className="text-lg md:text-xl font-bold text-[#442D1D] mb-4 md:mb-6 border-b border-[#442D1D]/20 pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 md:gap-6">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-[#442D1D]/70 mb-1">
                  First Name
                </label>
                <p className="text-base md:text-lg font-medium text-[#442D1D]">
                  {profileData.first_name || "-"}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-[#442D1D]/70 mb-1">
                  Last Name
                </label>
                <p className="text-base md:text-lg font-medium text-[#442D1D]">
                  {profileData.last_name || "-"}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-[#442D1D]/70 mb-1">
                  Email Address
                </label>
                <p className="text-base md:text-lg font-medium text-[#442D1D] truncate">
                  {profileData.email || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-[20px] p-6 md:p-10 shadow-lg">
            <h3 className="text-lg md:text-xl font-bold text-[#442D1D] mb-4 md:mb-6 border-b border-[#442D1D]/20 pb-2">
              Profile Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-[#442D1D]/70 mb-1">
                  Artworks Uploaded
                </label>
                <p className="text-xl md:text-2xl font-bold text-[#442D1D]">
                  {artworkCount}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-[#442D1D]/70 mb-1">
                  Joined
                </label>
                <p className="text-base md:text-lg font-medium text-[#442D1D]">
                  {formatDate(profileData.join_date)}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end md:justify-end mt-4 md:mt-8 mb-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#442D1D] text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold hover:bg-[#2c1d13] transition shadow-lg cursor-pointer text-sm md:text-base"
            >
              Log Out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
