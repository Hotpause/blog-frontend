import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.log("error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Post List</h2>
      {posts.length === 0 ? (
        <p className="text-gray-400">No posts available</p>
      ) : (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/posts/${post.id}`}
                className="text-purple-400 hover:text-purple-600"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
