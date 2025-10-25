import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

const Navbar = ({ onSearch = () => {}, suggestions = [] }) => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status from localStorage
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide">
        🎬 MovieBx
      </Link>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-gray-800 rounded-lg px-3 py-1">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 text-sm text-white placeholder-gray-400"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/watchlist" className="hover:text-blue-400">Watchlist</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/signup" className="hover:text-blue-400">Account</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center space-y-4 py-4 md:hidden">
          <Link to="/" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/watchlist" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Watchlist</Link>

          {!isLoggedIn ? (
            <Link to="/signup" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Account</Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
