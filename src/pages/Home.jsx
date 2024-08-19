import React, { useContext } from "react";
import PostList from "../components/PostList.jsx";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx"; // Import the AuthContext

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext); // Use the authentication state

  return (
    <div>
      <h1>Home</h1>
      <PostList />
      {isAuthenticated && (
        <Link to="/posts/new">
          <button>Create New Post</button>
        </Link>
      )}
    </div>
  );
};

export default Home;
