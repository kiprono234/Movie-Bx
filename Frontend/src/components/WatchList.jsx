import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function WatchList() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  const removeFromWatchlist = (id) => {
    const updated = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 p-10">
      <h2 className="text-3xl font-bold mb-8">My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="text-gray-600">No movies added yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {watchlist.map((movie) => (
            <div key={movie.id} className="flex flex-col items-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-md"
              />
              <h3 className="mt-2 font-semibold text-lg">{movie.title}</h3>
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
    
  );
}
