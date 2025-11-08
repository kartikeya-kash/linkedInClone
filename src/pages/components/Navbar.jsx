import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          nav {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            background-color: white;
            padding: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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
        `}
      </style>

      <nav>
        <button className="nav-btn" onClick={() => navigate("/home")}>
          Home
        </button>
        <button className="nav-btn" onClick={() => navigate("/profile")}>
          Profile
        </button>
        <button className="nav-btn" onClick={() => navigate("/newpost")}>
          New Post
        </button>
      </nav>
    </>
  );
}

export default Navbar;
