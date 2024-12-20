/* eslint-disable react/prop-types */
// src/components/raffles/RaffleCard.jsx
import { Link } from "react-router-dom";

export default function RaffleCard({ raffle }) {
  // Safely format the end date
  const endDate = raffle.endDate
    ? new Date(raffle.endDate).toLocaleDateString()
    : "No end date";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image with fallback */}
      {raffle.imageUrl && (
        <img
          src={raffle.imageUrl}
          alt={raffle.title || "Raffle"}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">
          {raffle.title || "Untitled Raffle"}
        </h2>

        {raffle.description && (
          <p className="text-gray-600 mb-4">
            {raffle.description.slice(0, 100)}
            {raffle.description.length > 100 ? "..." : ""}
          </p>
        )}

        <div className="text-sm text-gray-500">
          <p>Ends: {endDate}</p>
        </div>

        <Link
          to={`/raffle/${raffle.id}`}
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Raffle
        </Link>
      </div>
    </div>
  );
}
