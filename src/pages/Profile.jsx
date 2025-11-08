import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.title = "Profile Page";

    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("email");

    if (!isAuthenticated || !email) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5004/user/${email}`);
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.log("User not found:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("email");
    navigate("/login");
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
      </div>
    </>
  );
}

export default Profile;
