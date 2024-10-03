import React from "react";
import { Link } from "react-router-dom"; // assuming you're using react-router-dom for navigation

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <h1 className="text-9xl font-bold mb-8">404</h1>
      <h2 className="text-4xl font-semibold mb-4">Oops! Page not found.</h2>
      <p className="mb-8 text-lg text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md shadow-lg hover:bg-gray-100 transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;