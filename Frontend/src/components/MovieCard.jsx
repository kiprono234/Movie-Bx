import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const API_KEY = "95fd16a4f45f509f08adf20576f923b3";

export default function MovieCard() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const fromPage = location.state?.fromPage || 1; // default to 1 if missing
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch individual movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Handle adding to watchlist (example)
  const handleAddToWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!watchlist.some((m) => m.id === movie.id)) {
      watchlist.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      alert(`${movie.title} added to your watchlist!`);
    } else {
      alert("Already in your watchlist.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading movie details...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/", { state: { page: fromPage } })}
        className="mb-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        ← Back 
      </button>

      {movie && (
        <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg w-full sm:w-1/3"
          />
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
              <p className="text-gray-500 mb-2">
                Release Date: {movie.release_date}
              </p>
              <p className="text-gray-600 mb-4">{movie.overview}</p>
              <p className="text-yellow-600 font-semibold">
                ⭐ Rating: {movie.vote_average}/10
              </p>
            </div>
            <button
              onClick={handleAddToWatchlist}
              className="mt-6 bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
            >
              + Add to Watchlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
