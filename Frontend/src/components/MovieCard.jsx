import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function MovieCard() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const fromPage = location.state?.fromPage || 1;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/movies/${id}`);
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

  const handleAddToWatchlist = async () => {
    const token = localStorage.getItem("access_token"); 
  if (!token) {
    alert("You must be logged in to add to your watchlist.");
    return;
  }
  try {
    const res = await fetch("http://localhost:5000/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json","Authorization": `Bearer ${token}` },
      body: JSON.stringify({
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        overview: movie.overview,
        release_date: movie.release_date
      }),
    });

    if (res.ok) {
      alert(`${movie.title} added to your watchlist!`);
    } else {
      const errorData = await res.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (err) {
    console.error("Error adding to watchlist:", err);
    alert("Failed to add movie to watchlist. Try again.");
  }
};


  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading movie details...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <button
        onClick={() => navigate("/", { state: { page: fromPage } })}
        className="mb-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        ← Back
      </button>

      {movie && (
        <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
          <img
            src={movie.poster}
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
              {movie.genres && (
                <p className="text-sm text-gray-500 mt-2">
                  Genres: {movie.genres.join(", ")}
                </p>
              )}
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
