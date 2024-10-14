/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);

    fetch("https://gutendex.com/books")
      .then((response) => response.json())
      .then((data) => {
        // Filter books that are in the wishlist
        const wishlistBooks = data.results.filter((book) =>
          storedWishlist.includes(book.id)
        );
        setBooks(wishlistBooks);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4 text-center">
        Wishlist: {books.length} books
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div>
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.map((book) => (
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
                      Author:{" "}
                      {book.authors.length > 0
                        ? book.authors[0].name
                        : "Unknown"}
                    </p>
                    <p className="text-gray-600">
                      Genre: {book.subjects.join(", ") || "N/A"}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">Your wishlist is empty.</p>
          )}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
          Back to Books
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
