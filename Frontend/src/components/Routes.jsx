import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "../pages/Home";
import About from "../pages/About";
import ProtectedRoute from "./ProtectedRoute";
import SearchFilter from "./SearchFilter";
import WatchList from "./WatchList";
import MovieCard from "./MovieCard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/search" element={<SearchFilter />} />
        <Route path="/watchlist" element={<WatchList />}/>
        <Route path="/movie/:id" element={<MovieCard />} />


        {/* Protected Home route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
