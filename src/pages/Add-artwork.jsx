import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "../components/ToastWithProgress";
import uploadIconPlaceholder from "../assets/ep_upload-filled.svg";

function AddArtwork() {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("Painting");
  const [description, setDescription] = useState("");

  // 1. TAMBAHKAN STATE INI (Agar tombol loading berfungsi)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const API_BASE_URL = "https://artzybackend.vercel.app";

  // --- LOGIKA PROTEKSI HALAMAN ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toastError("Please login to add artwork");
      navigate("/login");
    }
  }, [navigate]);
  // --------------------------------

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!imageFile || !title || !artist) {
      toastError("Please upload an image and fill in Title and Artist name.");
      return;
    }

    // 2. SET LOADING JADI TRUE SEBELUM FETCH
    setIsSubmitting(true);

    try {
      const base64Image = await convertToBase64(imageFile);
      const res = await fetch(`${API_BASE_URL}/api/artworks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          image: base64Image,
          title,
          artist,
          year,
          category,
          description,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save artwork");

      toastSuccess("Artwork saved successfully!");
      navigate("/gallery-walls");
    } catch (err) {
      toastError(err.message);
    } finally {
      // 3. KEMBALIKAN LOADING JADI FALSE (SELESAI ATAU ERROR)
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    {
      label: "Title",
      val: title,
      set: setTitle,
      placeholder: "example: Girl with a Pearl Earring",
      type: "text",
    },
    {
      label: "Artist Name",
      val: artist,
      set: setArtist,
      placeholder: "example: by Johannes Vermeer",
      type: "text",
    },
    {
      label: "Year Created",
      val: year,
      set: setYear,
      placeholder: "",
      type: "date",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-montserrat beranda-bg">
      <main className="flex-grow w-full px-4 py-6 md:px-16 md:py-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center mt-3 mb-8 md:mb-15 text-[#442D1D]">
          Add to Your Collection
        </h1>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 h-auto max-w-7xl mx-auto">
          {/* Bagian Upload Gambar (Tidak Berubah) */}
          <div
            className="w-full md:w-1/2 min-h-[300px] lg:h-auto rounded-3xl border-2 border-[#442D1D] bg-[#C5B49A]/60 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative hover:bg-black/5 transition"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-contain p-4"
              />
            ) : (
              <>
                <img
                  src={uploadIconPlaceholder}
                  alt="Upload Icon"
                  className="w-16 h-16 mb-2 opacity-70 text-[#442D1D] md:w-24 md:h-24 md:mb-4"
                />
                <p className="text-base font-semibold text-[#442D1D] md:text-xl">
                  Drag and Drop Image Files to Upload
                </p>
              </>
            )}
          </div>

          <form
            onSubmit={handleSave}
            className="w-full md:w-1/2 flex flex-col gap-4 font-medium text-[#442D1D]"
          >
            {inputFields.map((field, idx) => (
              <div key={idx} className="flex flex-col gap-1 md:gap-2">
                <label className="text-base md:text-lg font-bold">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={field.val}
                  onChange={(e) => field.set(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full font-medium px-4 py-2 md:px-6 md:py-3 rounded-2xl outline-none placeholder-[#442D1D]/50 text-[#442D1D] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/15 border border-white/20 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm md:text-base"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-base md:text-lg font-bold">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full font-medium px-4 py-2 md:px-6 md:py-3 rounded-2xl outline-none text-[#442D1D] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/15 border border-white/20 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent cursor-pointer appearance-none text-sm md:text-base"
              >
                <option value="Painting">Painting</option>
                <option value="Digital Art">Digital Art</option>
                <option value="Photography">Photography</option>
                <option value="Sketch">Sketch</option>
                <option value="Abstract">Abstract</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-base md:text-lg font-bold">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="optional"
                rows="4"
                className="w-full font-medium px-4 py-2 md:px-6 md:py-3 rounded-2xl outline-none resize-none text-[#442D1D] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/15 border border-white/20 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm md:text-base"
              />
            </div>

            <div className="flex justify-center md:justify-end gap-4 md:gap-6 mt-4 mb-5">
              {/* 4. MODIFIKASI TOMBOL SAVE AGAR DISABLE SAAT LOADING */}
              <button
                type="submit"
                disabled={isSubmitting} // Matikan tombol jika sedang submit
                className={`px-6 py-2 rounded-full text-white font-medium text-base md:text-lg transition bg-[#442D1D] cursor-pointer ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
              >
                {isSubmitting ? "Saving..." : "Save Artwork"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/gallery-walls")}
                disabled={isSubmitting} // Matikan tombol cancel juga
                className={`px-6 py-2 rounded-full text-white font-medium text-base md:text-lg transition bg-[#442D1D] cursor-pointer ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddArtwork;
