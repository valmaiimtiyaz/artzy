import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadIconPlaceholder from "../assets/ep_upload-filled.svg";

function AddArtwork() {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL;

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

    if (!imageFile || !title || !artist) {
      alert("Please upload an image and fill in Title and Artist name.");
      return;
    }

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

      alert("Artwork saved successfully!");
      navigate("/gallery-walls");
    } catch (err) {
      alert(err.message);
    }
  };

  const inputFields = [
    { label: "Title", val: title, set: setTitle, placeholder: "example: Girl with a Pearl Earring", type: "text" },
    { label: "Artist Name", val: artist, set: setArtist, placeholder: "example: by Johannes Vermeer", type: "text" },
    { label: "Year Created", val: year, set: setYear, placeholder: "", type: "date" },
    { label: "Category", val: category, set: setCategory, placeholder: "painting, photography, digital art, etc", type: "text" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      <main className="flex-grow w-full px-16 py-8 beranda-bg">
        <h1 className="text-4xl font-bold text-center mt-10 mb-15 text-[#442D1D]">
          Add to Your Collection
        </h1>

        <div className="flex flex-row gap-12 h-[600px]">
          <div
            className="w-1/2 h-full rounded-3xl border-2 border-[#442D1D] bg-[#C5B49A]/60 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative hover:bg-black/5 transition"
            onClick={() => fileInputRef.current.click()}
          >
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-4" />
            ) : (
              <>
                <img src={uploadIconPlaceholder} alt="Upload Icon" className="w-24 h-24 mb-4 opacity-70 text-[#442D1D]" />
                <p className="text-xl font-semibold text-[#442D1D]">Drag and Drop Image Files to Upload</p>
              </>
            )}
          </div>

          <form onSubmit={handleSave} className="w-1/2 flex flex-col justify-between font-medium text-[#442D1D]">
            {inputFields.map((field, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <label className="text-lg font-bold">{field.label}</label>
                <input
                  type={field.type}
                  value={field.val}
                  onChange={(e) => field.set(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full font-medium px-6 py-3 rounded-2xl outline-none placeholder-[#442D1D]/50 text-[#442D1D] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/15 border border-white/20 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent"
                />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label className="text-lg font-bold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="optional"
                rows="4"
                className="w-full font-medium px-6 py-3 rounded-2xl outline-none resize-none text-[#442D1D] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/15 border border-white/20 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent"
              />
            </div>
            <div className="flex justify-end gap-6 mt-4">
              <button type="submit" className="px-10 py-3 rounded-full text-white font-medium text-lg hover:scale-105 transition bg-[#442D1D] cursor-pointer">Save Artwork</button>
              <button type="button" onClick={() => navigate("/gallery-walls")} className="px-10 py-3 rounded-full text-white font-medium text-lg hover:scale-105 transition bg-[#442D1D] cursor-pointer">Cancel</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddArtwork;
