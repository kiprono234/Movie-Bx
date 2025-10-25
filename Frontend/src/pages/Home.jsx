import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import Categories from "../components/Categories";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/movies?page=${page}`);
        const data = await res.json();
        setMovies(data.results || []);
        setFiltered(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      handleGenreSelect(selectedGenre);
      return;
    }

    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
  };

  const handleGenreSelect = (selected) => {
    setSelectedGenre(selected);
    if (selected === "All") {
      setFiltered(movies);
      return;
    }

    const genre = genres.find((g) => g.name === selected);
    if (!genre) return;

    const genreFiltered = movies.filter((m) =>
      m.genre_ids.includes(genre.id)
    );

    if (searchQuery.trim()) {
      const searchFiltered = genreFiltered.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFiltered(searchFiltered);
    } else {
      setFiltered(genreFiltered);
    }
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center pb-10">
      <div className="w-full fixed top-0 z-50 bg-gray-900/95 backdrop-blur-md shadow-lg">
        <Navbar onSearch={handleSearch} suggestions={movies} />
      </div>

      <div className="w-full flex flex-col items-center px-3 sm:px-6 md:px-10 pt-28 md:pt-32">
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mb-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-4 md:mb-0">
            🎬 Popular Movies
          </h2>

          <Categories
            onGenreSelect={handleGenreSelect}
            genres={genres}
            selectedGenre={selectedGenre}
          />
        </div>

        {loading ? (
          <p className="text-gray-400 mt-10 text-lg animate-pulse text-center">
            Loading movies...
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 md:gap-8 w-full max-w-7xl">
            {filtered.length > 0 ? (
              filtered.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  state={{ fromPage: page }}
                >
                  <div className="flex flex-col bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="h-64 sm:h-72 md:h-80 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-base sm:text-lg truncate">
                        {movie.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {movie.release_date?.split("-")[0]}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-400 mt-6 text-center w-full">
                No movies found.
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md font-medium text-sm sm:text-base transition-all ${
              page === 1
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            Prev
          </button>

          <span className="font-semibold text-gray-300 text-sm sm:text-base">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-md font-medium text-sm sm:text-base transition-all ${
              page === totalPages
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
