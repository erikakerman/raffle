// src/pages/LoginPage.jsx
import { useState } from "react";
import { loginUser, createUser } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      alert("User created successfully!");
    } catch (error) {
      alert("Error creating user: " + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      alert("Logged in successfully!");
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Login/Signup Test</h2>
      {user ? (
        <div>
          <p>Logged in as: {user.email}</p>
        </div>
      ) : (
        <form>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSignup}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Sign Up
            </button>
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
