import React, { useContext } from "react";
import PostList from "../components/PostList.jsx";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <PostList />
      {isAuthenticated && (
        <Link to="/posts/new">
          <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
            Create New Post
          </button>
        </Link>
      )}
    </div>
  );
};

export default Home;
