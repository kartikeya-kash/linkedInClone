import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./components/Loader";

function Landing() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);

      fetch("https://linkedinclone-1-hcwg.onrender.com/test")
        .then((res) => res.text())
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.error("Server wake-up failed:", err);
          setLoading(false);
        });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>
        {`
          .landing-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #0077b5, #00a0dc);
            color: white;
            text-align: center;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            overflow: hidden;
          }

          .landing-title {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .landing-subtitle {
            font-size: 1.2rem;
            margin-bottom: 40px;
            opacity: 0.9;
          }

          .button-group {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .primary-btn {
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

          .primary-btn:hover {
            background-color: #e6f3fa;
            transform: scale(1.05);
          }

          .secondary-btn {
            background-color: transparent;
            color: white;
            border: 2px solid white;
            padding: 12px 28px;
            font-size: 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .secondary-btn:hover {
            background-color: white;
            color: #0077b5;
            transform: scale(1.05);
          }
        `}
      </style>

      <div className="landing-container">
        <h1 className="landing-title">Welcome to LinkedIn Clone</h1>
        <p className="landing-subtitle">
          Connect, share, and grow your network 🚀
        </p>

        <div className="button-group">
          <button className="primary-btn" onClick={() => navigate("/signup")}>
            Let’s Get Started
          </button>
          <button className="secondary-btn" onClick={() => navigate("/login")}>
            Login Now
          </button>
        </div>
      </div>

      {loading && <Loader message="Waking up the server..." />}
    </>
  );
}

export default Landing;
