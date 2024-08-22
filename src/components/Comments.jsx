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
          author: user?.username || "Anonymous",
        }),
      });

      if (response.ok) {
        setNewComment("");
        onCommentAdded();
      } else {
        console.error("Error adding comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold">Comments</h3>
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          required
          className="w-full p-2 bg-gray-800 text-white rounded-md"
        />
        <button
          type="submit"
          className="mt-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="mt-4 bg-gray-700 p-4 rounded-lg">
            <p>{comment.content}</p>
            <p className="mt-2 text-sm text-gray-400">
              <strong>By:</strong> {comment.author}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-400">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
};

export default Comments;
