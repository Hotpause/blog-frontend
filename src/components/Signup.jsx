import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        email,
        password,
        username,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Signup</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-400">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
