import React, { useEffect, useState } from "react";

export default function Categories({ onGenreSelect }) {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/genres");
        const data = await res.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const handleChange = (e) => {
    const selected = e.target.value;
    setSelectedGenre(selected);
    onGenreSelect(selected);
  };

  return (
    <div className="w-full flex justify-center sm:justify-end px-4 sm:px-8 mb-6 mt-4">
      <select
        value={selectedGenre}
        onChange={handleChange}
        className="w-full sm:w-auto bg-white text-gray-700 font-medium px-4 py-2 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <option value="All">All Categories</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}
