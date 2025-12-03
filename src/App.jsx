import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AnimeDetails from "./pages/AnimeDetails";
import Category from "./pages/Category";
import Seasonal from "./pages/Seasonal";
import TopRated from "./pages/TopRated";
import Popular from "./pages/Popular";
import Trending from "./pages/Trending";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main content stretches to fill available space */}
      <main className="grow">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Anime Details Page */}
          <Route path="/anime/:id" element={<AnimeDetails />} />

          {/* Category Page using genreId */}
          <Route path="/category/:genreName/:genreId" element={<Category />} />

          {/* Seasonal Page */}
          <Route path="/seasonal" element={<Seasonal />} />

          {/* Top Rated Page */}
          <Route path="/top-rated" element={<TopRated />} />

          {/* Popular Page */}
          <Route path="/popular" element={<Popular />} />

          {/* Trending Anime */}
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
