import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastSuccess, toastError } from "../components/ToastWithProgress";
import uploadIconPlaceholder from "../assets/ep_upload-filled.svg";

function EditArtworkPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    year: "",
    category: "Painting",
    description: "",
    image: "",
  });

  const API_BASE_URL = "https://artzybackend.vercel.app";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchArtwork = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/artworks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setFormData({
            title: data.title || "",
            artist: data.artist || "",
            year: data.year ? data.year.split("T")[0] : "",
            category: data.category || "Painting",
            description: data.description || "",
            image: data.image || "",
          });
          setImagePreview(data.image || null);
        } else {
          throw new Error(data.error || "Artwork not found!");
        }
      } catch (err) {
        toastError("Failed to load artwork data: " + err.message);
        navigate("/gallery-walls");
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtwork();
  }, [id, navigate]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      const base64Image = await convertToBase64(file);
      setFormData((prev) => ({ ...prev, image: base64Image }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { image, title, artist } = formData;

    if (!image || !title || !artist) {
      toastError("Please ensure Image, Title, and Artist name are filled.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/artworks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update artwork");
      toastSuccess("Artwork updated successfully!");
      navigate(`/artwork/${id}`, { replace: true });
    } catch (err) {
      toastError(err.message);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-[#442D1D]">
        Loading...
      </div>
    );

  const inputFields = [
    {
      label: "Title",
      name: "title",
      val: formData.title,
      placeholder: "example: Girl with a Pearl Earring",
      type: "text",
    },
    {
      label: "Artist Name",
      name: "artist",
      val: formData.artist,
      placeholder: "example: by Johannes Vermeer",
      type: "text",
    },
    {
      label: "Year Created",
      name: "year",
      val: formData.year,
      placeholder: "",
      type: "date",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-montserrat beranda-bg">
      <main className="flex-grow w-full px-4 py-6 md:px-16 md:py-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center mt-3 mb-8 md:mb-15 text-[#442D1D]">
          Edit Artwork: {formData.title}
        </h1>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 h-auto max-w-7xl mx-auto">
          <div
            className="w-full md:w-1/2 min-h-[300px] md:min-h-[400px] lg:h-auto rounded-3xl border-2 border-[#442D1D] bg-[#C5B49A]/60 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative hover:bg-black/5 transition"
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
                  Click to Change Image
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
                  name={field.name}
                  value={field.val}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full font-medium px-4 py-2 md:px-6 md:py-3 rounded-2xl outline-none placeholder-[#442D1D]/50 text-[#442D1D] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/15 border border-white/20 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm md:text-base"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-base md:text-lg font-bold">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
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
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="optional"
                rows="4"
                className="w-full font-medium px-4 py-2 md:px-6 md:py-3 rounded-2xl outline-none resize-none text-[#442D1D] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/15 border border-white/20 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm md:text-base"
              />
            </div>

            <div className="flex justify-center md:justify-end gap-4 md:gap-6 mt-4">
              <button
                type="submit"
                className="px-6 py-2 rounded-full text-white font-medium text-base md:text-lg hover:scale-105 transition bg-[#442D1D] cursor-pointer"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 rounded-full text-[#442D1D] font-medium text-base md:text-lg hover:scale-105 transition bg-[#F4EFEB] cursor-pointer"
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

export default EditArtworkPage;
