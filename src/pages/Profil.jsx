import React, { useState, useEffect } from "react";
import { User, Edit3 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", { month: "long", year: "numeric" });
};

function Profile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [artworkCount, setArtworkCount] = useState(0);
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
        if (res.ok) {
          setProfileData(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchArtworks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/artworks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setArtworkCount(data.length);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
    fetchArtworks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout Success!");
    navigate("/login");
  };

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EFEB] font-montserrat">
        <div className="text-xl text-[#442D1D]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-montserrat bg-gradient-to-b from-[#F4EFEB] to-[#C5B49A]/50">
      <header className="sticky top-0 z-10 flex justify-between items-center px-10 py-6 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md">
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
            className="font-semibold py-1.5 border border-gray-500 rounded-3xl bg-[#442D1D] text-white transition duration-200 px-8"
          >
            Profile
          </Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center p-8 sm:p-12 font-montserrat gallery-gradient-bg">
        <div className="w-full max-w-4xl space-y-8">
          <h1 className="text-4xl font-bold text-[#442D1D] mb-8">My Profile</h1>

          <div className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-[30px] p-8 flex justify-between items-center shadow-lg">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full border-4 border-white/50 shadow-sm overflow-hidden bg-[#442D1D]/10 flex items-center justify-center">
                {profileData.profile_pic ? (
                  <img
                    src={profileData.profile_pic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User
                    className="w-10 h-10 text-[#442D1D]"
                    strokeWidth={1.5}
                  />
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-[#442D1D]">
                  {profileData.first_name} {profileData.last_name}
                </p>
                <p className="text-lg text-[#442D1D]/70">
                  {profileData.handle}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/edit-profile")}
              className="flex items-center space-x-2 bg-[#442D1D] text-white text-base font-semibold py-2 px-6 rounded-full shadow-md hover:bg-[#6c4e3e] transition duration-200 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-[30px] p-10 shadow-lg relative">
            <h3 className="text-xl font-bold text-[#442D1D] mb-6 border-b border-[#442D1D]/20 pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#442D1D]/70 mb-1">
                  First Name
                </label>
                <p className="text-lg font-medium text-[#442D1D]">
                  {profileData.first_name || "-"}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#442D1D]/70 mb-1">
                  Last Name
                </label>
                <p className="text-lg font-medium text-[#442D1D]">
                  {profileData.last_name || "-"}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#442D1D]/70 mb-1">
                  Email Address
                </label>
                <p className="text-lg font-medium text-[#442D1D] truncate">
                  {profileData.email || "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-[30px] p-10 shadow-lg relative">
            <h3 className="text-xl font-bold text-[#442D1D] mb-6 border-b border-[#442D1D]/20 pb-2">
              Profile Summary
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#442D1D]/70 mb-1">
                  Artworks Uploaded
                </label>
                <p className="text-2xl font-bold text-[#442D1D]">
                  {artworkCount}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#442D1D]/70 mb-1">
                  Joined
                </label>
                <p className="text-lg font-medium text-[#442D1D]">
                  {formatDate(profileData.join_date)}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end mt-8 mb-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#442D1D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#2c1d13] transition shadow-lg cursor-pointer"
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

