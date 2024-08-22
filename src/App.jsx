import { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correctly import jwt-decode as a named export
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // current time in seconds
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

function App() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isTokenExpired(token)) {
        console.log("Token has expired");
        localStorage.removeItem("token");
        logout();
        navigate("/login");
      } else {
        console.log("Token is still valid");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/new" element={<CreatePostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/posts/:postId" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;
