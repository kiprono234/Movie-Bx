import { useState } from "react";
import { Play } from "lucide-react";
import TrailerModal from "./TrailerModal";

export default function MovieCard({ movie }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTrailer = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=1ef799b0a11fada298585995aa883b5e`
      );
      const data = await res.json();
      const trailer = data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        alert("No trailer available for this movie.");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={fetchTrailer}
        className="relative cursor-pointer group rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          {loading ? (
            <div className="w-8 h-8 border-2 border-t-transparent border-white rounded-full animate-spin" />
          ) : (
            <Play className="w-12 h-12 text-white" />
          )}
        </div>
      </div>

      {showTrailer && (
        <TrailerModal
          trailerKey={trailerKey}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  );
}
