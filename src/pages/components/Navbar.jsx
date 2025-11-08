import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>
      <button onClick={() => navigate("/home")}>Home</button>
      <button onClick={() => navigate("/profile")}>Profile</button>
      <button onClick={() => navigate("/newpost")}>New Post</button>
    </nav>
  );
}

export default Navbar;
