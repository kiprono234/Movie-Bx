import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MovieCard({ movie }) {
  const [showTrailer, setShowTrailer] = useState(false);

  const getYouTubeId = (url) => {
    if (!url || typeof url !== "string") return null;
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const trailerId = getYouTubeId(movie.trailerUrl);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setShowTrailer(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleModalClick = (e) => e.stopPropagation();

  return (
    <div className="relative flex flex-col items-start w-40 group cursor-pointer">
      {/* Movie Poster */}
      <div className="relative overflow-hidden rounded-lg shadow-md">
        <img
          src={movie.image}
          alt={movie.title}
          className="rounded-lg transition-transform duration-300 group-hover:scale-105"
        />

        {/* Play Button Overlay */}
        {trailerId && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setShowTrailer(true)}
              className="bg-white text-black rounded-full p-3 hover:scale-110 transition-transform duration-200 shadow-md"
            >
              <Play className="w-5 h-5 fill-black" />
            </button>
          </div>
        )}
      </div>

      {/* Movie Info */}
      <h3 className="font-semibold mt-2 text-gray-800 truncate w-full">
        {movie.title}
      </h3>
      <p className="text-sm text-gray-500">{movie.year}</p>

      {/* Trailer Modal */}
      <AnimatePresence>
        {showTrailer && trailerId && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowTrailer(false)} // click outside closes modal
          >
            <motion.div
              key="modal"
              className="bg-gray-900 rounded-xl shadow-lg w-full max-w-3xl relative overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleModalClick}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute top-3 right-3 text-white hover:text-red-400 transition"
              >
                <X className="w-6 h-6" />
              </button>

              {/* YouTube Embed */}
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=0`}
                  title={movie.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
