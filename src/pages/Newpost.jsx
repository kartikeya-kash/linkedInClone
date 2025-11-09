import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./components/Loader";

function Newpost() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") !== "true") {
      alert("Please login to create a new post");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorEmail = localStorage.getItem("email");
    if (!authorEmail) {
      alert("No user email found! Please log in again.");
      navigate("/login");
      return;
    }

    setLoading(true); // show loader before API call

    try {
      const response = await fetch(
        "https://linkedinclone-1-hcwg.onrender.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ authorEmail, content }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Post created successfully!");
        setContent("");
        navigate("/home");
      } else {
        alert(data.message || "Error creating post");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false); // hide loader
    }
  };

  return (
    <>
      {/* 🔹 Inline modern CSS styling */}
      <style>
        {`
          .newpost-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #0077b5, #00a0dc);
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 40px 20px;
          }

          .newpost-box {
            background: #fff;
            border-radius: 16px;
            padding: 40px;
            width: 100%;
            max-width: 650px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
            margin-top: 40px;
            transition: all 0.3s ease;
          }

          .newpost-box:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          }

          .newpost-title {
            text-align: center;
            font-size: 2rem;
            color: #0077b5;
            margin-bottom: 25px;
            font-weight: 700;
          }

          .post-form label {
            font-weight: 600;
            color: #333;
            display: block;
            margin-bottom: 10px;
            font-size: 1rem;
          }

          .post-textarea {
            width: 100%;
            height: 160px;
            padding: 14px;
            border: 1px solid #ccc;
            border-radius: 10px;
            font-size: 1.05rem;
            outline: none;
            resize: none;
            transition: all 0.3s ease;
            background-color: #fafafa;
          }

          .post-textarea:focus {
            border-color: #0077b5;
            box-shadow: 0 0 8px rgba(0,119,181,0.3);
            background-color: #fff;
          }

          .post-btn {
            display: block;
            width: 100%;
            background: linear-gradient(90deg, #0077b5, #00a0dc);
            color: #fff;
            border: none;
            padding: 14px;
            font-size: 1.1rem;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            margin-top: 20px;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
          }

          .post-btn:hover {
            background: linear-gradient(90deg, #006699, #0090c7);
            transform: scale(1.03);
            box-shadow: 0 6px 16px rgba(0,119,181,0.3);
          }

          .placeholder {
            text-align: center;
            color: #444;
            font-size: 1rem;
            opacity: 0.8;
            margin-top: 10px;
          }

          @media (max-width: 600px) {
            .newpost-box {
              padding: 25px;
            }
            .post-textarea {
              height: 130px;
            }
          }
        `}
      </style>

      <Navbar />

      <div className="newpost-page">
        <div className="newpost-box">
          <h1 className="newpost-title">Create a New Post</h1>

          <form onSubmit={handleSubmit} className="post-form">
            <label htmlFor="content">Share something with your network:</label>
            <textarea
              id="content"
              className="post-textarea"
              placeholder="Start writing here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>

            <button type="submit" className="post-btn">
              🚀 Post Now
            </button>
          </form>

          <p className="placeholder">
            Your post will appear in the public feed instantly.
          </p>
        </div>
      </div>

      {loading && <Loader message="Posting your update..." />}
    </>
  );
}

export default Newpost;
