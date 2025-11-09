import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <>
      <style>
        {`
          /* Fullscreen overlay */
          .loader-overlay {
            position: fixed;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px); /* background blur effect */
            background-color: rgba(0, 0, 0, 0.35); /* dark transparent overlay */
            z-index: 9999;
          }

          /* Spinner circle */
          .loader-spinner {
            width: 64px;
            height: 64px;
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-top: 5px solid #ffffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }

          /* Message text */
          .loader-message {
            color: #ffffff;
            font-size: 1.1rem;
            font-weight: 500;
            letter-spacing: 0.5px;
            animation: pulse 1.5s ease-in-out infinite;
          }

          /* Spinner animation */
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          /* Subtle text pulse */
          @keyframes pulse {
            0%, 100% {
              opacity: 0.8;
            }
            50% {
              opacity: 1;
            }
          }
        `}
      </style>

      <div className="loader-overlay">
        <div className="loader-spinner"></div>
        <p className="loader-message">{message}</p>
      </div>
    </>
  );
};

export default Loader;
