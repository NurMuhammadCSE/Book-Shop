import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetch("https://gutendex.com/books")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBooks(data.results);
        // console.log(data.results); // Log the results
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after data is fetched
      });
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4 text-center">Book List: {books.length}</h1>
      {loading ? ( // Conditional rendering based on loading state
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book.id} className="border rounded-lg p-4 shadow-md">
                <Link to={`/details/${book.id}`}>
                  <img
                    src={book.formats["image/jpeg"]} // Cover image URL
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <h2 className="text-lg font-semibold">{book.title}</h2>
                  <p className="text-gray-700">
                    Author:{" "}
                    {book.authors.length > 0 ? book.authors[0].name : "Unknown"}
                  </p>
                  <p className="text-gray-600">
                    Genre: {book.subjects.join(", ") || "N/A"}
                  </p>
                  <p className="text-gray-500">ID: {book.id}</p>
                </Link>
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
