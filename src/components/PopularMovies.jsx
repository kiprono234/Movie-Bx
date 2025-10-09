import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { motion } from "framer-motion"; // For a smooth spinner animation

const API_BASE = "https://api.themoviedb.org/3";

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);

  // 🧠 Fetch popular movies initially
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (searchTerm = "") => {
    setLoading(true);
    const endpoint = searchTerm
      ? `${API_BASE}/search/movie?query=${encodeURIComponent(
          searchTerm
        )}&language=en-US&page=1`
      : `${API_BASE}/movie/popular?language=en-US&page=1`;

    try {
      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Handle typing (debounced)
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimer) clearTimeout(debounceTimer);

    const newTimer = setTimeout(() => {
      fetchMovies(value);
    }, 500);

    setDebounceTimer(newTimer);
  };

  return (
    <section className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold mb-4 md:mb-0">
           {query ? `Results for "${query}"` : "Popular Movies"}
        </h2>

        🧩🧩🧩  {/* 🔍 Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={handleChange}
            className="px-4 py-2 pr-10 rounded-md bg-gray-800 text-white outline-none border border-gray-700 focus:ring-2 focus:ring-red-500 w-64"
          />

          {/* 🌀 Spinner */}
          {loading && (
            <motion.div
              className="absolute right-3 top-2.5 w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 0.8,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          )}
        </div>
      </div>

       {/* 🎞️ Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          !loading && (
            <p className="text-center text-gray-500 col-span-full">
              No movies found 😢
            </p>
          )
        )}
      </div>
    </section>
  );
}
