import React, { useState, useEffect } from "react";
import Post from "../components/Post.jsx";
import Comments from "../components/Comments.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/comments`, {
        params: { postId: postId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setComments(response.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleCommentAdded = () => {
    // Refresh comments after adding a new one
    fetchComments();
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <Post post={post} />
      <Comments
        comments={comments}
        postId={postId}
        onCommentAdded={handleCommentAdded}
      />
    </div>
  );
}

export default PostPage;
