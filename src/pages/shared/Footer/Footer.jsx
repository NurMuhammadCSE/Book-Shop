import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#1c2841] mt-10 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Description */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Gutenberg Books</h3>
            <p className="text-gray-400">
              Explore a vast collection of books from various genres.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/wishlist" className="hover:text-gray-300">
              Wishlist
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Gutenberg Books. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
