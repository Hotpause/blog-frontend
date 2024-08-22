import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl text-white font-semibold">
          Blog
        </Link>
        <div>
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-purple-400 mr-4"
              >
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-purple-400">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
