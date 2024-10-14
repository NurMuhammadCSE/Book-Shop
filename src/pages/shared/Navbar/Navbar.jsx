import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200">
            Gutenberg
          </Link>
        </div>

        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden md:flex items-center w-full max-w-md ml-8">
          <input
            type="text"
            placeholder="Search for books..."
            value={searchTerm}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-white">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/wishlist" className="hover:text-gray-300">
            Wishlist
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <ul className="space-y-4 text-white">
            <li>
              <Link to="/" className="block text-lg hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                className="block text-lg hover:text-gray-300"
              >
                Wishlist
              </Link>
            </li>
            {/* Search bar on mobile */}
            <li>
              <input
                type="text"
                placeholder="Search for books..."
                value={searchTerm}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
