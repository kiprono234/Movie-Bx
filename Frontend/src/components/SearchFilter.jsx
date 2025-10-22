import React, { useState, useEffect } from "react";

const SearchFilter = ({ data = [], onResultsChange = () => {} }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState([]);

  // Extract categories dynamically
  const categories = ["All", ...new Set(data.map((item) => item.category || "Uncategorized"))];

  useEffect(() => {
    let results = data;

    // Filter by category
    if (category !== "All") {
      results = results.filter(
        (item) => item.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by query
    if (query.trim() !== "") {
      results = results.filter((item) =>
        item.title?.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFiltered(results);

    // ✅ Prevent infinite loop
    if (typeof onResultsChange === "function") {
      onResultsChange(results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, data]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mt-6 relative">
      {/* Search Input */}
      <div className="relative w-full md:w-2/5">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
        />
      </div>

      {/* Category Dropdown */}
      <div className="w-full md:w-1/5">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-3 bg-white border border-gray-300 text-gray-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Search Suggestions */}
      {query && (
        <ul className="absolute top-full mt-2 w-full md:w-2/5 bg-gray-900 rounded-xl shadow-lg max-h-80 overflow-y-auto z-10">
          {filtered.length > 0 ? (
            filtered.map((movie) => (
              <li
                key={movie.id}
                className="flex items-center gap-3 px-4 py-2 border-b border-gray-800 cursor-pointer hover:bg-gray-800 transition duration-150"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-10 h-14 object-cover rounded-lg"
                />
                <div>
                  <span className="text-white font-medium">{movie.title}</span>
                  <p className="text-gray-400 text-sm">{movie.year}</p>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-center text-gray-400">
              No matches found.
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchFilter;
