import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Newpost() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

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

    try {
      const response = await fetch("http://localhost:5004/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorEmail, content }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Post created successfully!");
        setContent("");
        navigate("/profile"); // redirect after post
      } else {
        alert(data.message || "Error creating post");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Create a New Post</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Newpost;
