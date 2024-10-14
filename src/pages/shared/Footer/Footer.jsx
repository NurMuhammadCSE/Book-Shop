import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 mt-10 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Description */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Gutenberg Books</h3>
            <p className="text-gray-400">
              Explore a vast collection of books from various genres. Join us in celebrating the love of literature!
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/wishlist" className="hover:text-gray-300">Wishlist</Link>
            <Link to="/about" className="hover:text-gray-300">About Us</Link>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.493v-9.294H9.691v-3.622h3.127V8.244c0-3.103 1.866-4.793 4.604-4.793 1.299 0 2.418.097 2.743.141v3.176h-1.883c-1.477 0-1.76.702-1.76 1.738v2.283h3.515l-.459 3.622h-3.056V24h6.027c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.932 9.932 0 0 1-2.828.775 4.932 4.932 0 0 0 2.164-2.724 9.865 9.865 0 0 1-3.127 1.184A4.915 4.915 0 0 0 16.616 3c-2.707 0-4.908 2.197-4.908 4.908 0 .384.043.761.127 1.124A13.94 13.94 0 0 1 1.671 2.88a4.904 4.904 0 0 0-.664 2.475c0 1.706.868 3.205 2.189 4.086a4.898 4.898 0 0 1-2.224-.615v.061c0 2.384 1.691 4.377 3.946 4.831a4.935 4.935 0 0 1-2.224.085 4.927 4.927 0 0 0 4.601 3.417A9.864 9.864 0 0 1 0 19.54a13.918 13.918 0 0 0 7.548 2.211c9.057 0 14.008-7.496 14.008-13.986 0-.213-.005-.425-.014-.637A10.034 10.034 0 0 0 24 4.557z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22.173c-5.608 0-10.173-4.565-10.173-10.173 0-5.608 4.565-10.173 10.173-10.173 5.608 0 10.173 4.565 10.173 10.173 0 5.608-4.565 10.173-10.173 10.173zm4.447-10.173c0-2.489-2.018-4.447-4.447-4.447-2.489 0-4.447 1.958-4.447 4.447 0 2.489 1.958 4.447 4.447 4.447 2.429 0 4.447-1.958 4.447-4.447zm-2.685 0c0 1.074-.874 1.947-1.947 1.947-1.074 0-1.947-.873-1.947-1.947 0-1.074.873-1.947 1.947-1.947 1.073 0 1.947.873 1.947 1.947zm4.352-3.092c-.198 0-.392-.077-.533-.217-.146-.146-.225-.339-.225-.532s.079-.386.225-.532c.141-.141.335-.217.533-.217.198 0 .391.076.533.217.146.146.225.339.225.532s-.079.386-.225.532c-.142.141-.335.217-.533.217z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Gutenberg Books. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
