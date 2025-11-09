import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-md bg-black/30 z-50">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-6"></div>

      {/* Message */}
      <p className="text-white text-lg font-medium tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Loader;
