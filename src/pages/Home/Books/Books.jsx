import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"; // Import heart icons from react-icons

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [wishlist, setWishlist] = useState([]); // State for wishlist
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  useEffect(() => {
    // Load wishlist from localStorage
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);

    // Fetch books data
    fetch("https://gutendex.com/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after data is fetched
      });
  }, []);

  // Function to toggle wishlist
  const toggleWishlist = (id) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.includes(id)
        ? prevWishlist.filter((bookId) => bookId !== id) // Remove from wishlist
        : [...prevWishlist, id]; // Add to wishlist

      // Save updated wishlist to localStorage
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  // Get only the first 5 books
  const displayedBooks = books.slice(0, 5);

  // Filter books based on search term
  const filteredBooks = displayedBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4 text-center">Book List: {filteredBooks.length}</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-2 w-full"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="border rounded-lg p-4 shadow-md transition-transform transform hover:scale-105">
                <Link to={`/details/${book.id}`}>
                  <img
                    src={book.formats["image/jpeg"]} // Cover image URL
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <h2 className="text-lg font-semibold">{book.title}</h2>
                  <p className="text-gray-700">
                    Author: {book.authors.length > 0 ? book.authors[0].name : "Unknown"}
                  </p>
                  <p className="text-gray-600">
                    Genre: {book.subjects.join(", ") || "N/A"}
                  </p>
                  <p className="text-gray-500">ID: {book.id}</p>
                </Link>
                <button
                  onClick={() => toggleWishlist(book.id)} // Handle button click
                  className={`mt-2 p-2 rounded-full ${
                    wishlist.includes(book.id) ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {wishlist.includes(book.id) ? (
                    <AiFillHeart className="inline" /> // Filled heart icon
                  ) : (
                    <AiOutlineHeart className="inline" /> // Outline heart icon
                  )}
                </button>
              </div>
            ))
          ) : (
            <p>No books available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Books;
