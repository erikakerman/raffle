// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import RaffleCard from "../components/raffles/RaffleCard";

export default function HomePage() {
  const [raffles, setRaffles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRaffles() {
      try {
        const rafflesCollection = collection(db, "raffles");
        const raffleSnapshot = await getDocs(rafflesCollection);
        const raffleList = raffleSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched raffles:", raffleList); // Debug log
        setRaffles(raffleList);
      } catch (error) {
        console.error("Error fetching raffles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRaffles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading raffles...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Available Raffles</h1>

      {raffles.length === 0 ? (
        <p>No raffles available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {raffles.map((raffle) => (
            <RaffleCard
              key={raffle.id}
              raffle={raffle} // Make sure we're passing the raffle object correctly
            />
          ))}
        </div>
      )}
    </div>
  );
}
