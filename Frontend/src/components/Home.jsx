import React from "react";

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // simple redirect
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Movie Box 🎬</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
