import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Edit3 } from "lucide-react";
import { toastSuccess, toastError } from "../components/ToastWithProgress";
import ConfirmModal from "../components/ConfirmModal";
import { jwtDecode } from "jwt-decode"; 

function ViewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null); 

  const API_BASE_URL = "https://artzybackend.vercel.app";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.id);
      } catch (e) {
        console.error("Invalid token");
      }
    }

    const fetchArtwork = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/public/artworks/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const data = await res.json();

        if (res.ok) {
          setArtwork(data);
        } else {
          throw new Error(data.error || "Artwork not found!");
        }
      } catch (err) {
        setError(err.message);
        console.error("Unable to view detail artwork!", err);
      }
    };
    fetchArtwork();
  }, [id]);

  const handleDelete = async () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/api/artworks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toastSuccess("Artwork succesfully deleted!");
        navigate("/gallery-walls");
      } else {
        const data = await res.json();
        toastError(data.error || "Failed to delete artwork!");
      }
    } catch (err) {
      toastError("Failed to delete artwork!");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EFEB] text-[#bfa28e]">
        {error} - Try refreshing!
      </div>
    );
  }

  if (!artwork)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EFEB] text-[#442D1D]">
        Loading...
      </div>
    );

  const isOwner = currentUserId && artwork.user_id === currentUserId;

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      <main className="flex-grow w-full px-8 py-12 gallery-gradient-bg flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl relative flex items-center justify-center mb-8">
          <button
            onClick={() => navigate(-1)} 
            className="absolute left-0 p-3 text-[#442D1D] hover:bg-[#442D1D]/10 rounded-full transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3.0}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>

        <div className="bg-[#E8D1A7] rounded-[15px] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-10 w-full max-w-4xl items-stretch min-h-[450px]">
          <div className="w-full md:w-1/2 flex items-center justify-center rounded-3xl p-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white/40 w-full max-h-[600px]">
              <img
                src={artwork.image || artwork.imageUrl} 
                alt={artwork.title}
                className="w-full h-full object-contain "
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center text-[#442D1D]">
            <div className="border-b border-[#442D1D]/20 pb-4 mb-4">
              <h2 className="text-4xl md:text-4xl font-bold leading-tight mb-1">
                {artwork.title}
              </h2>
              <p className="text-xl italic opacity-80">by {artwork.artist}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-1">
                  Year Created
                </span>
                <p className="text-lg font-semibold">
                  {artwork.year
                    ? new Date(artwork.year).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </p>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-1">
                  Category
                </span>
                <p className="text-lg font-semibold capitalize">
                  {artwork.category}
                </p>
              </div>
            </div>

            <div className="mb-6 flex-grow">
              <span className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">
                Description
              </span>
              <p className="text-base leading-relaxed opacity-90">
                {artwork.description || "No description provided."}
              </p>
            </div>

            <div className="pt-4 mt-auto border-t border-[#442D1D]/10">
              {isOwner ? (
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => navigate(`/edit-artwork/${artwork.id}`)}
                    className="group flex items-center gap-3 text-[#442D1D] font-bold text-base hover:text-[#2c1d13] transition w-fit cursor-pointer"
                  >
                    <div className="p-2 bg-[#442D1D]/10 rounded-full group-hover:bg-[#442D1D]/20 transition">
                      <Edit3 className="w-4 h-4" />
                    </div>
                    <span>Edit Artwork</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="group flex items-center gap-3 text-red-800 font-bold text-base hover:text-red-600 transition w-fit cursor-pointer"
                  >
                    <div className="p-2 bg-red-800/10 rounded-full group-hover:bg-red-800/20 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                    <span>Delete Artwork</span>
                  </button>
                </div>
              ) : (
                <div
                  className="flex items-center gap-4 cursor-pointer hover:bg-[#442D1D]/5 p-2 rounded-xl transition"
                  onClick={() => navigate(`/user/${artwork.artist_username}`)} 
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#442D1D] shadow-sm flex-shrink-0">
                    {artwork.artist_profile_pic ? (
                      <img
                        src={artwork.artist_profile_pic}
                        alt="Artist"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#442D1D] flex items-center justify-center text-[#E8D1A7] font-bold text-lg">
                        {artwork.artist_username
                          ? artwork.artist_username.charAt(0).toUpperCase()
                          : "?"}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">
                      Posted by
                    </p>
                    <p className="text-lg font-bold text-[#442D1D]">
                      @{artwork.artist_username || "Unknown"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Artwork?"
          message="This artwork will be permanently deleted. Are you sure?"
          confirmText="Delete"
          cancelText="Cancel"
        />
      </main>
    </div>
  );
}

export default ViewDetail;
