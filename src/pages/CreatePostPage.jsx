import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const response = await axios.post(
        "http://localhost:3000/posts",
        {
          title,
          content,
          authorId: parseInt(userId),
          published,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Post created successfully:", response.data);
        navigate("/"); // Navigate back to the home page or post list after creation
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-400">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-400">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="mr-2"
            />
            Publish
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
