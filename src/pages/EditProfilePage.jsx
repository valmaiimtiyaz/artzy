import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Save, User, Trash2 } from "lucide-react";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    profile_pic: "",
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL;

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
          setFormData({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            username: data.username || "",
            email: data.email || "",
            profile_pic: data.profile_pic || "",
          });
          if (data.profile_pic) setPhotoPreview(data.profile_pic);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size too large! Max 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData((prev) => ({ ...prev, profile_pic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove your profile photo?"
    );

    if (isConfirmed) {
      setPhotoPreview(null);
      setFormData((prev) => ({ ...prev, profile_pic: "" }));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile updated successfully!");
        navigate("/profile");
      } else {
        throw new Error(data.error || "Failed to update profile");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-[#442D1D]">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen gallery-gradient-bg font-montserrat relative overflow-hidden flex items-center justify-center py-12 px-4">
      <div className="absolute top-0 left-0 w-full h-64 rounded-b-[50px]"></div>

      <button
        onClick={() => navigate("/profile")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[#442D1D] hover:text-[#372517] transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-5 stroke-current"
        >
          <path
            d="M15.75 19.5 8.25 12l7.5-7.5"
            fill="none"
            strokeWidth="3.0"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-semibold cursor-pointer">Back to Profile</span>
      </button>

      <div className="relative z-10 w-full max-w-2xl bg-white/20 backdrop-blur-md border border-white/30 rounded-[20px] shadow-2xl pt-20 pb-10 px-8 sm:px-12 mt-10">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-[#F4EFEB] flex items-center justify-center">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-[#442D1D]/30" />
              )}
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-[#442D1D] text-white p-2.5 rounded-full shadow-md hover:bg-[#6c4e3e] transition hover:scale-110 z-20"
              title="Change Photo"
            >
              <Camera className="w-5 h-5 cursor-pointer" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            {photoPreview && (
              <button
                type="button"
                onClick={handleDeletePhoto}
                className="absolute bottom-0 -left-2 bg-red-500 text-white p-2.5 rounded-full shadow-md hover:bg-red-600 transition hover:scale-110 z-20"
                title="Remove Photo"
              >
                <Trash2 className="w-5 h-5 cursor-pointer" />
              </button>
            )}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#442D1D]">Edit Profile</h1>
          <p className="text-[#442D1D]/60 mt-1 text-sm">
            Update your personal information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#442D1D]/60 uppercase tracking-wide">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full bg-[#F4EFEB]/50 border border-gray-200 rounded-xl px-4 py-3 text-[#442D1D] font-medium focus:outline-none focus:border-[#442D1D] focus:ring-1 focus:ring-[#442D1D] transition"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#442D1D]/60 uppercase tracking-wide">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full bg-[#F4EFEB]/50 border border-gray-200 rounded-xl px-4 py-3 text-[#442D1D] font-medium focus:outline-none focus:border-[#442D1D] focus:ring-1 focus:ring-[#442D1D] transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#442D1D]/60 uppercase tracking-wide">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-[#442D1D]/40">
                @
              </span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-[#F4EFEB]/50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-[#442D1D] font-medium focus:outline-none focus:border-[#442D1D] focus:ring-1 focus:ring-[#442D1D] transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#442D1D]/60 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#F4EFEB]/50 border border-gray-200 rounded-xl px-4 py-3 text-[#442D1D] font-medium focus:outline-none focus:border-[#442D1D] focus:ring-1 focus:ring-[#442D1D] transition"
            />
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="text-[#442D1D]/70 font-semibold text-sm hover:text-[#442D1D] px-4 py-2 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#442D1D] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-[#2c1d13] hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
