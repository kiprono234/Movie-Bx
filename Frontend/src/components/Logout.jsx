import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    if (onLogout) onLogout(); 
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
    >
      <LogOut size={16} /> Logout
    </button>
  );
};

export default LogoutButton;
