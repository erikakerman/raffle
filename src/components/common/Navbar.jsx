// src/components/common/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/auth";

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow mb-4">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Raffle
          </Link>
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <Link
                  to="/create-raffle"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Create Raffle
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Profile ({user.email})
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
