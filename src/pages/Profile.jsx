import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

function Profile() {
  const [loading, setLoading] = useState(false);
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

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://linkedinclone-1-hcwg.onrender.com/user/${email}`
        );
        const data = await response.json();
        if (response.ok) setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };

    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://linkedinclone-1-hcwg.onrender.com/posts/user/${email}`
        );
        const data = await response.json();
        if (response.ok) setPosts(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
      setLoading(false);
    };

    fetchUserData();
    fetchUserPosts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://linkedinclone-1-hcwg.onrender.com/posts/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
      } else {
        alert("Error deleting post Try again.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
    setLoading(false);
  };

  const handleEdit = (post) => {
    setEditMode(post._id);
    setEditContent(post.content);
  };

  const handleSaveEdit = async (postId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://linkedinclone-1-hcwg.onrender.com/posts/${postId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editContent }),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setPosts((prev) =>
          prev.map((p) => (p._id === postId ? updated.post : p))
        );
        setEditMode(null);
      } else {
        alert("Error updating post Try again.");
      }
    } catch (error) {
      console.error("Error saving edit:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <style>
        {`
          .profile-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0077b5, #00a0dc);
            padding: 30px;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          }

          .profile-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            max-width: 700px;
            margin: 30px auto;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            text-align: center;
          }

          .profile-card h2 {
            color: #0077b5;
            margin-bottom: 8px;
          }

          .logout-btn {
            background-color: #0077b5;
            color: white;
            border: none;
            padding: 10px 18px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            margin-top: 15px;
            transition: all 0.3s ease;
          }

          .logout-btn:hover {
            background-color: #005f91;
          }

          .post-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin: 15px auto;
            width: 80%;
            max-width: 600px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }

          .post-card p {
            margin: 5px 0;
          }

          .edit-btn, .delete-btn, .save-btn, .cancel-btn {
            background-color: #0077b5;
            color: white;
            border: none;
            padding: 8px 14px;
            margin: 5px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: 0.3s;
          }

          .edit-btn:hover, .save-btn:hover {
            background-color: #005f91;
          }

          .delete-btn {
            background-color: #e63946;
          }

          .delete-btn:hover {
            background-color: #b91d2c;
          }

          .cancel-btn {
            background-color: #ccc;
            color: black;
          }

          .cancel-btn:hover {
            background-color: #bbb;
          }

          textarea {
            width: 100%;
            border-radius: 8px;
            padding: 8px;
            border: 1px solid #ccc;
            font-size: 1rem;
          }

          textarea:focus {
            border-color: #0077b5;
            box-shadow: 0 0 4px rgba(0,119,181,0.3);
            outline: none;
          }

          .section-title {
            color: white;
            text-align: center;
            font-size: 1.6rem;
            margin-top: 40px;
          }
        `}
      </style>

      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <h1>Profile</h1>

          {user ? (
            <>
              <h2>{user.fullName}</h2>
              <p>{user.email}</p>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>

        <h2 className="section-title">Your Posts</h2>

        {posts.length === 0 ? (
          <p style={{ color: "white", textAlign: "center" }}>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
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
                  <button
                    className="save-btn"
                    onClick={() => handleSaveEdit(post._id)}
                  >
                    Save
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setEditMode(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>{post.content}</p>
                  <button className="edit-btn" onClick={() => handleEdit(post)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
      {loading && <Loader message="Loading..." />}
    </>
  );
}

export default Profile;
