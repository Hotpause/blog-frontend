import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Comments = ({ comments, postId, onCommentAdded }) => {
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(AuthContext);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          postId: parseInt(postId),
          content: newComment,
          author: user?.username || "Anonymous", // Replace with actual user's name
        }),
      });

      if (response.ok) {
        setNewComment("");
        onCommentAdded(); // Notify the parent component to refresh comments
      } else {
        console.error("Error adding comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.content}</p>
            <p>
              <strong>By:</strong> {comment.author}
            </p>
          </div>
        ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Comments;
