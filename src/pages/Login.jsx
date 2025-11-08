import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://linkedinclone-1-hcwg.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`Login Successful! Welcome ${data.user.fullName}`);
        localStorage.setItem("email", email);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/home");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      {/* ✅ Inline CSS inside same file */}
      <style>
        {`
          .login-container {
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

          .login-box {
            background: rgba(255, 255, 255, 0.15);
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
          }

          .login-title {
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

          .login-btn {
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

          .login-btn:hover {
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

      {/* ✅ UI */}
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-title">Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>

          <p className="switch-link" onClick={() => navigate("/signup")}>
            Don’t have an account? Sign up
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
