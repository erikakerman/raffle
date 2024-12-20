// src/pages/CreateRafflePage.jsx
import { useState } from "react";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreateRafflePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    duration: "7", // Default 7 days
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + parseInt(formData.duration));

      const docRef = await addDoc(collection(db, "raffles"), {
        ...formData,
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
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Raffle
        </button>
      </form>
    </div>
  );
}
