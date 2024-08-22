import React from "react";

const Post = ({ post }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">{post.title}</h2>
      <p className="mt-2">{post.content}</p>
      <p className="mt-4 text-gray-400">
        <strong>Published:</strong> {post.published ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default Post;
