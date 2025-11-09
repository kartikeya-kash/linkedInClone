import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ fullName: "", email: "" });

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5004/user/${email}`);
        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser({ fullName: data.fullName, email: data.email });
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <style>
        {`
          nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            padding: 15px 30px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            position: relative;
          }

          .nav-center {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 20px;
          }

          .nav-btn {
            background-color: #0077b5;
            color: white;
            border: none;
            padding: 10px 18px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .nav-btn:hover {
            background-color: #005f91;
            transform: scale(1.05);
          }

          .user-info {
            text-align: right;
          }

          .user-name {
            font-size: 16px;
            font-weight: 700;
            color: #0077b5;
          }

          .user-email {
            font-size: 13px;
            color: #555;
          }
        `}
      </style>

      <nav>
        <div className="nav-center">
          <button className="nav-btn" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="nav-btn" onClick={() => navigate("/profile")}>
            Profile
          </button>
          <button className="nav-btn" onClick={() => navigate("/newpost")}>
            New Post
          </button>
        </div>

        <div className="user-info">
          <div className="user-name">{user.fullName || "Loading..."}</div>
          <div className="user-email">{user.email || ""}</div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
