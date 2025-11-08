import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [commentTexts, setCommentTexts] = useState({}); // store comments for each post

  // 🧠 Fetch all posts
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated || isAuthenticated === "false") {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5004/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [navigate]);

  // 🧠 Handle like button
  const handleLike = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5004/posts/${postId}/like`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p._id === postId ? { ...p, likes: data.likes } : p
          )
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // 🧠 Handle comment submit
  const handleComment = async (postId) => {
    const userEmail = localStorage.getItem("email");
    const text = commentTexts[postId];

    if (!text || text.trim() === "") return alert("Comment cannot be empty!");

    try {
      const response = await fetch(
        `http://localhost:5004/posts/${postId}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail, text }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update UI immediately
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? { ...post, comments: data.post.comments }
              : post
          )
        );

        // Clear input
        setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
      <Navbar />
      <h1>Home Page Feed</h1>

      {posts.length === 0 ? (
        <p>No posts yet. Be the first to post!</p>
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <hr />
            <h3>{post.authorEmail}</h3>
            <p>{post.content}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
            <br />
            <button onClick={() => handleLike(post._id)}>
              👍 {post.likes} Likes
            </button>

            <h4>Comments:</h4>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <p key={index}>
                  <b>{comment.userEmail}:</b> {comment.text}
                </p>
              ))
            ) : (
              <p>No comments yet</p>
            )}

            {/* ✅ Comment input box */}
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentTexts[post._id] || ""}
              onChange={(e) =>
                setCommentTexts((prev) => ({
                  ...prev,
                  [post._id]: e.target.value,
                }))
              }
            />
            <button onClick={() => handleComment(post._id)}>Comment</button>
          </div>
        ))
      )}
    </>
  );
}

export default Home;
