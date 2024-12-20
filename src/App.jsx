// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/HomePage";
import CreateRafflePage from "./pages/CreateRafflePage";
import ProfilePage from "./pages/ProfilePage";
import RaffleDetailsPage from "./pages/RaffleDetailsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-raffle" element={<CreateRafflePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/raffle/:id" element={<RaffleDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
