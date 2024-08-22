//post.jsx
import React from "react";

const Post = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>
        <strong>Published:</strong> {post.published ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default Post;
