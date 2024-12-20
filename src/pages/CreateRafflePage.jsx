// src/pages/CreateRafflePage.jsx
import { useState } from "react";
import { db, storage } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function CreateRafflePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "7", // Default 7 days
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }

      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null;

    const storageRef = ref(storage, `raffle-images/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    setIsLoading(true);

    try {
      // Upload image first
      const imageUrl = await uploadImage(imageFile);

      const endDate = new Date();
      endDate.setDate(endDate.getDate() + parseInt(formData.duration));

      const docRef = await addDoc(collection(db, "raffles"), {
        ...formData,
        imageUrl,
        createdBy: user.uid,
        createdAt: new Date().toISOString(),
        endDate: endDate.toISOString(),
        status: "active",
        participants: [],
      });

      console.log("Raffle created with ID:", docRef.id);
      navigate("/");
    } catch (error) {
      console.error("Error creating raffle:", error);
      alert("Failed to create raffle");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        Please log in to create a raffle.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Raffle</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
            <div className="space-y-2 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-48 w-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload an image</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium mb-1">
            Duration (days)
          </label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="1">1 day</option>
            <option value="3">3 days</option>
            <option value="7">7 days</option>
            <option value="14">14 days</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {isLoading ? "Creating..." : "Create Raffle"}
        </button>
      </form>
    </div>
  );
}
