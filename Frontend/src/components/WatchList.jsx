import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WatchList() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/watchlist", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || `HTTP error ${res.status}`);
        }

        const data = await res.json();
        setWatchlist(data);
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        setError("Failed to load your watchlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [navigate]);

  const handleRemove = async (movieId) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login"); 
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/watchlist/${movieId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to remove movie.");
      }

      setWatchlist((prev) => prev.filter((movie) => movie.movie_id !== movieId));
    } catch (err) {
      console.error("Error removing movie:", err);
      alert("Failed to remove movie from watchlist.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading your watchlist...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6">🎬 My Watchlist</h2>

      {watchlist.length === 0 ? (
        <p>No movies in your watchlist yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((movie) => (
            <div key={movie.movie_id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
              <img
                src={movie.poster}
                alt={movie.title}
                className="rounded-md mb-3 w-full h-72 object-cover"
              />
              <h3 className="font-semibold text-lg">{movie.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{movie.release_date}</p>
              <p className="text-gray-700 text-sm flex-grow">
                {movie.overview
                  ? movie.overview.slice(0, 100) + "..."
                  : "No description available."}
              </p>

              <button
                onClick={() => handleRemove(movie.movie_id)}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
