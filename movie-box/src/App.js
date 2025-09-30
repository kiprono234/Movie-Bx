import React, { useEffect, useState } from "react";

const API_KEY = "bbbdea3ce3803971b5adf4e3278a62eb"; 
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

// Replace these URLs with your own video or trailer links
const movieVideos = [
  "https://www.youtube.com/embed/YoHD9XEInc0",   // Inception official trailer
  "https://www.youtube.com/embed/EXeTwQWrcwY",   // The Dark Knight official trailer
  "https://www.youtube.com/embed/zSWdZVtXT7E",   // Interstellar official trailer
  "https://www.youtube.com/embed/NmzuHjWmXOc",   // The Shawshank Redemption trailer
  "https://www.youtube.com/embed/qtRKdVHc-cE",   // Fight Club trailer
  "https://www.youtube.com/embed/sY1S34973zA",   // The Godfather trailer
];

function App() {
  const [movies, setMovies] = useState([]);
  const [playMovie, setPlayMovie] = useState(null); // index of movie to play

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results ? data.results.slice(0, 6) : []));
  }, []);

  const handleWatch = (movieIdx) => {
    setPlayMovie(movieIdx);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-[500px]">
        <nav className="flex items-center gap-10 mb-8">
          <span className="font-bold text-xl tracking-wide">MOVIE BOX</span>
          <ul className="flex gap-6 text-gray-700"></ul>
        </nav>
        <h2 className="text-4xl font-bold mb-6">Popular Movies</h2>
        <div className="grid grid-cols-3 gap-6 mb-6">
          {movies.map((movie, idx) => (
            <div key={movie.id} className="flex flex-col">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "https://via.placeholder.com/160x220?text=No+Image"
                }
                alt={movie.title}
                className="w-40 h-56 object-cover rounded-lg mb-3 shadow"
              />
              <div className="font-semibold text-lg">{movie.title}</div>
              <div className="text-gray-600 mb-2">
                {movie.release_date?.split("-")[0]}
              </div>
              <button
                onClick={() => handleWatch(idx)}
                className="px-4 py-1 rounded-full text-sm font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600"
              >
                Watch
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {playMovie !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-lg w-full relative">
            <button
              onClick={() => setPlayMovie(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-800 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="relative w-full h-80">
              <iframe
                title={movies[playMovie]?.title}
                src={movieVideos[playMovie]}
                className="w-full h-full rounded"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-2 text-center text-lg font-semibold">
              {movies[playMovie]?.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;