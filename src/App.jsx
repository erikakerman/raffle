import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Raffle
          </h1>
          <p className="mt-4 text-center text-gray-600">
            Welcome to our raffle platform! 🎉
          </p>
        </main>
      </div>
    </Router>
  );
}

export default App;
