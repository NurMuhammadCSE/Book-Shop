import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const booksPerPage = 5; // Number of books per page

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);

    fetch("https://gutendex.com/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.includes(id)
        ? prevWishlist.filter((bookId) => bookId !== id)
        : [...prevWishlist, id];

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  // Get unique genres/topics for filtering
  const genres = [...new Set(books.flatMap((book) => book.subjects))];

  // Filter books based on search term and selected genre
  const filteredBooks = books.filter((book) => {
    const matchesSearchTerm = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre
      ? book.subjects.includes(selectedGenre)
      : true;
    return matchesSearchTerm && matchesGenre;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const setPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between mt-10 items-center w-full ml-8 mb-4 space-x-4">
        <div className="w-2/3">
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div className="w-1/3">
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

      <h1 className="text-2xl font-bold my-4 text-center">
        Book List: {currentBooks.length}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentBooks.length > 0 ? (
            currentBooks.map((book) => (
              <div
                key={book.id}
                className="border rounded-lg p-4 shadow-md transition-transform transform hover:scale-105"
              >
                <Link to={`/details/${book.id}`}>
                  <img
                    src={book.formats["image/jpeg"]}
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
                  onClick={() => toggleWishlist(book.id)}
                  className={`mt-2 p-2 rounded-full ${
                    wishlist.includes(book.id)
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {wishlist.includes(book.id) ? (
                    <AiFillHeart className="inline" />
                  ) : (
                    <AiOutlineHeart className="inline" />
                  )}
                </button>
              </div>
            ))
          ) : (
            <p>No books available.</p>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="mx-2 p-2 bg-gray-300 rounded"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={`mx-1 p-2 rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
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
