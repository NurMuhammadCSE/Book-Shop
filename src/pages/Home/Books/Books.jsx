import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5; // Number of books per page for pagination

  // Fetch books data and wishlist from localStorage
  useEffect(() => {
    // Retrieve wishlist from local storage or initialize as an empty array
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);

    // Fetch books from the Gutendex API
    fetch("https://gutendex.com/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.results); // Store fetched books in state
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to add/remove a book from the wishlist
  function toggleWishlist(bookId) {
    setWishlist((prevWishlist) => {
      let updatedWishlist;
      if (prevWishlist.includes(bookId)) {
        // Remove book from wishlist if already added
        updatedWishlist = prevWishlist.filter((id) => id !== bookId);
      } else {
        // Add book to wishlist if not already there
        updatedWishlist = [...prevWishlist, bookId];
      }
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  }

  // Get all unique genres from the books data for the genre dropdown
  const genres = [...new Set(books.flatMap((book) => book.subjects))];

  // Filter books based on the search term and selected genre

  // Step 1: Start by filtering the books based on the search term and genre
  const filteredBooks = books.filter((book) => {
    // Step 2: Convert the book title and the search term to lowercase
    const lowerCaseTitle = book.title.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Step 3: Check if the search term matches any part of the book title
    const matchesSearchTerm = lowerCaseTitle.includes(lowerCaseSearchTerm);

    // Step 4: If a genre is selected (selectedGenre is not empty),
    let matchesGenre = true; // Default to true (no genre filtering)
    if (selectedGenre) {
      matchesGenre = book.subjects.includes(selectedGenre);
    }
    // Step 5: Return true if both conditions (search term and genre) are met
    return matchesSearchTerm && matchesGenre;
  });

  // Calculate total pages for pagination based on the filtered books
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Calculate the start and end index of the books to display on the current page
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage
  );

  // Function to go to the next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Function to go to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Function to set the current page to a specific number
  const setPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Search bar and genre dropdown */}
      <div className="flex justify-between mt-10 items-center w-full mb-4 space-x-4">
        <div className="w-2/3">
          {/* Input field for searching books by title */}
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div className="w-1/3">
          {/* Dropdown for selecting a genre */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">All Genres</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display the number of books in the current view */}
      <h1 className="text-2xl font-bold my-4 text-center">
        Book List: {currentBooks.length}
      </h1>

      {/* Show loading spinner while data is being fetched */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1c2841]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Display the current page of books */}
          {currentBooks.length > 0 ? (
            currentBooks.map((book) => (
              <div
                key={book.id}
                className="relative border rounded-lg p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl bg-white"
              >
                {/* Wishlist button with heart icon */}
                <button
                  onClick={() => toggleWishlist(book.id)}
                  className={`absolute top-2 right-2 p-2 rounded-full ${
                    wishlist.includes(book.id)
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {wishlist.includes(book.id) ? (
                    <AiFillHeart className="text-lg" />
                  ) : (
                    <AiOutlineHeart className="text-lg" />
                  )}
                </button>

                {/* Book details link */}
                <Link to={`/details/${book.id}`}>
                  {/* Book cover */}
                  <img
                    src={book.formats["image/jpeg"]}
                    alt={book.title}
                    className="w-full h-48 object-contain rounded-md mb-4"
                  />
                  {/* Book title */}
                  <h2 className="text-lg font-semibold mb-2 text-center">
                    {book.title}
                  </h2>
                  {/* Book author */}
                  <p className="text-gray-700 font-semibold text-center">
                    Author:{" "}
                    {book.authors.length > 0 ? book.authors[0].name : "Unknown"}
                  </p>
                  {/* Book genres (show up to 3) */}
                  <p className="text-gray-600 text-center mt-1">
                    Genres: {book.subjects.slice(0, 3).join(", ") || "N/A"}
                  </p>
                  {/* Book ID */}
                  <p className="text-gray-600 text-center">ID: {book.id}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>No books available.</p>
          )}
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="mx-2 p-2 bg-gray-300 rounded"
        >
          Previous
        </button>

        {/* Page number buttons */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={`mx-1 p-2 rounded ${
              currentPage === index + 1
                ? "bg-[#1c2841] text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="mx-2 p-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Books;
