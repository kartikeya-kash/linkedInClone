import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://linkedinclone-1-hcwg.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* 💅 Inline CSS styling (same theme as Login & Landing) */}
      <style>
        {`
          .signup-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #0077b5, #00a0dc);
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            color: white;
            text-align: center;
          }

          .signup-box {
            background: rgba(255, 255, 255, 0.15);
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
          }

          .signup-title {
            font-size: 2rem;
            margin-bottom: 20px;
            font-weight: bold;
          }

          input {
            width: 250px;
            padding: 12px;
            margin: 10px 0;
            border: none;
            border-radius: 8px;
            outline: none;
            font-size: 1rem;
          }

          input:focus {
            box-shadow: 0 0 5px white;
          }

          .signup-btn {
            background-color: white;
            color: #0077b5;
            border: none;
            padding: 12px 28px;
            font-size: 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .signup-btn:hover {
            background-color: #e6f3fa;
            transform: scale(1.05);
          }

          .switch-link {
            color: white;
            margin-top: 15px;
            cursor: pointer;
            text-decoration: underline;
            font-size: 0.95rem;
          }
        `}
      </style>

      {/* 🎨 UI */}
      <div className="signup-container">
        <div className="signup-box">
          <h1 className="signup-title">Sign Up</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <br />
            <button className="signup-btn" type="submit">
              Sign Up
            </button>
          </form>

          <p className="switch-link" onClick={() => navigate("/login")}>
            Already have an account? Login
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
