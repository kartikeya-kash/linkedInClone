import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [commentTexts, setCommentTexts] = useState({});

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated || isAuthenticated === "false") {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://linkedinclone-1-hcwg.onrender.com/posts"
        );
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [navigate]);

  const handleLike = async (postId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://linkedinclone-1-hcwg.onrender.com/posts/${postId}/like`,
        { method: "PUT" }
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
    setLoading(false);
  };

  const handleComment = async (postId) => {
    const userEmail = localStorage.getItem("email");
    const text = commentTexts[postId];

    if (!text || text.trim() === "") return alert("Comment cannot be empty!");

    setLoading(true);
    try {
      const response = await fetch(
        `https://linkedinclone-1-hcwg.onrender.com/posts/${postId}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail, text }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? { ...post, comments: data.post.comments }
              : post
          )
        );
        setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <style>
        {`
          .home-container {
            background: linear-gradient(135deg, #0077b5, #00a0dc);
            min-height: 100vh;
            padding: 20px;
            color: #333;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          }

          .feed-header {
            color: white;
            text-align: center;
            margin-top: 20px;
            font-size: 2rem;
            font-weight: bold;
          }

          .post-card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            margin: 20px auto;
            width: 80%;
            max-width: 600px;
          }

          .post-card h3 {
            color: #0077b5;
            margin-bottom: 8px;
          }

          .post-card small {
            color: #666;
          }

          .post-btn {
            background-color: #0077b5;
            color: white;
            border: none;
            padding: 8px 16px;
            margin-top: 10px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .post-btn:hover {
            background-color: #005f91;
          }

          .comment-input {
            width: 100%;
            margin-top: 8px;
            padding: 8px;
            border-radius: 8px;
            border: 1px solid #ccc;
            outline: none;
          }

          .comment-input:focus {
            border-color: #0077b5;
            box-shadow: 0 0 4px rgba(0,119,181,0.3);
          }

          .comment-btn {
            background-color: white;
            color: #0077b5;
            border: 2px solid #0077b5;
            padding: 6px 14px;
            margin-top: 8px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .comment-btn:hover {
            background-color: #0077b5;
            color: white;
          }
        `}
      </style>

      <Navbar />
      <div className="home-container">
        <h1 className="feed-header">LinkedIn Clone Feed</h1>

        {posts.length === 0 ? (
          <p style={{ color: "white", textAlign: "center" }}>
            No posts yet. Be the first to post!
          </p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <h3>{post.authorEmail}</h3>
              <p>{post.content}</p>
              <small>{new Date(post.createdAt).toLocaleString()}</small>
              <br />
              <button className="post-btn" onClick={() => handleLike(post._id)}>
                👍 {post.likes} Likes
              </button>

              <h4 style={{ marginTop: "10px" }}>Comments:</h4>
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <p key={index}>
                    <b>{comment.userEmail}:</b> {comment.text}
                  </p>
                ))
              ) : (
                <p>No comments yet</p>
              )}

              <input
                className="comment-input"
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
              <button
                className="comment-btn"
                onClick={() => handleComment(post._id)}
              >
                Comment
              </button>
            </div>
          ))
        )}
      </div>
      {loading && <Loader message="Loading..." />}
    </>
  );
}

export default Home;
