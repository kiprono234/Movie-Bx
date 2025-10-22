import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import Categories from "../components/Categories";

const API_KEY = "95fd16a4f45f509f08adf20576f923b3";
const MOVIE_API = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const GENRES_API = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // 🧩 Restore saved page from localStorage on mount
  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) setPage(Number(savedPage));
  }, []);

  // 🎭 Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(GENRES_API);
        const data = await res.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // 🎥 Fetch movies whenever page changes
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${MOVIE_API}&page=${page}`);
        const data = await res.json();
        setMovies(data.results);
        setFiltered(data.results);
        setTotalPages(data.total_pages > 50 ? 50 : data.total_pages);
        localStorage.setItem("currentPage", page); // ✅ Save page to localStorage
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" }); // ⬆ Smooth scroll to top
      }
    };
    fetchMovies();
  }, [page]);

  // 🔙 Restore page when coming back from movie details
  useEffect(() => {
    if (location.state?.page && location.state.page !== page) {
      setPage(location.state.page);
    }
  }, [location.state?.page]);

  // 🔍 Search filter
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFiltered(movies);
      return;
    }
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
  };

  // 🎞️ Genre filter
  const handleGenreSelect = (selected) => {
    setSelectedGenre(selected);
    if (selected === "All") {
      setFiltered(movies);
    } else {
      const genreId = genres.find((g) => g.name === selected)?.id;
      const results = movies.filter((movie) =>
        movie.genre_ids.includes(genreId)
      );
      setFiltered(results);
    }
  };

  // ⏩ Pagination controls
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center pb-10">
      {/* 🧭 Sticky Navbar */}
      <div className="w-full fixed top-0 z-50 bg-gray-900/95 backdrop-blur-md shadow-lg">
        <Navbar onSearch={handleSearch} />
      </div>

      {/* 🧱 Main Content */}
      <div className="w-full flex flex-col items-center px-3 sm:px-6 md:px-10 pt-28 md:pt-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mb-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-4 md:mb-0">
            🎬 Popular Movies
          </h2>

          <Categories
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreSelect={handleGenreSelect}
          />
        </div>

        {/* 🎥 Movie Grid */}
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
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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

        {/* 🔢 Pagination */}
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
