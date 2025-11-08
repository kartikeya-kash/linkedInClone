import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    document.title = "Profile Page";

    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("email");

    if (!isAuthenticated || !email) {
      navigate("/login");
      return;
    }

    // Fetch user info
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5004/user/${email}`);
        const data = await response.json();
        if (response.ok) setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch user's posts
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5004/posts/user/${email}`
        );
        const data = await response.json();
        if (response.ok) setPosts(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserData();
    fetchUserPosts();
  }, [navigate]);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("email");
    navigate("/login");
  };

  // ✅ Handle delete post
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const response = await fetch(`http://localhost:5004/posts/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
      } else {
        alert("Error deleting post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // ✅ Handle edit post
  const handleEdit = (post) => {
    setEditMode(post._id);
    setEditContent(post.content);
  };

  // ✅ Save edited post
  const handleSaveEdit = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5004/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent }),
      });

      if (response.ok) {
        const updated = await response.json();
        setPosts((prev) =>
          prev.map((p) => (p._id === postId ? updated.post : p))
        );
        setEditMode(null);
      } else {
        alert("Error updating post");
      }
    } catch (error) {
      console.error("Error saving edit:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Profile Page</h1>

        {user ? (
          <>
            <h2>Welcome, {user.fullName}</h2>
            <p>Email: {user.email}</p>
          </>
        ) : (
          <p>Loading user data...</p>
        )}

        <button onClick={handleLogout}>Logout</button>

        <hr />
        <h2>Your Posts</h2>

        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id}>
              <p>
                <b>Date:</b> {new Date(post.createdAt).toLocaleString()}
              </p>

              {editMode === post._id ? (
                <>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <br />
                  <button onClick={() => handleSaveEdit(post._id)}>Save</button>
                  <button onClick={() => setEditMode(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p>{post.content}</p>
                  <button onClick={() => handleEdit(post)}>Edit</button>
                  <button onClick={() => handleDelete(post._id)}>Delete</button>
                </>
              )}

              <hr />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Profile;
