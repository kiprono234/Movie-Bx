import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          🎬 MovieBox
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-black transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-black transition-colors duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/watchlist"
              className="hover:text-black transition-colors duration-200"
            >
              Watchlist
            </Link>
          </li>
        </ul>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex relative items-center">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-black transition"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <ul className="flex flex-col gap-4 p-4 text-gray-700 font-medium">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-black transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-black transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/watchlist"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-black transition-colors duration-200"
              >
                Watchlist
              </Link>
            </li>

            {/* Search on Mobile */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
