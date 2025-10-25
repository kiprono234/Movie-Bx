import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Signup";
import Login from "./Login";
import Home from "../pages/Home";
import About from "../pages/About";
import ProtectedRoute from "./ProtectedRoute";
import WatchList from "./WatchList";
import MovieCard from "./MovieCard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/watchlist" element={<WatchList />}/>
        <Route path="/movie/:id" element={<MovieCard />} />


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
