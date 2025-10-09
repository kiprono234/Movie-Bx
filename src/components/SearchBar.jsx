import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar({ query, setQuery, loading }) {
  const [localQuery, setLocalQuery] = useState(query || "");

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleClear = () => {
    setLocalQuery("");
    setQuery("");
  };

  const handleChange = (e) => {
    setLocalQuery(e.target.value);
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={localQuery}
        onChange={handleChange}
        placeholder="Search for a movie..."
        className="w-full pl-12 pr-10 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
      />

      {/* Left icon (search or spinner) */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-t-transparent border-red-500 rounded-full"
            />
          ) : (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Search className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Clear button (✕) */}
      {localQuery && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
