import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://gutendex.com/books/${id}/`)
    // fetch(`https://gutendex.com/books/?ids=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setBook(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!book) {
    return <p className="text-center text-gray-600">Book not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">{book.title}</h1>
      <div className="flex flex-col md:flex-row">
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="w-full md:w-1/2 h-72 object-cover rounded-lg mb-4 md:mr-4"
        />
        <div className="md:w-1/2">
          <p className="text-gray-700">
            <strong>Author:</strong> {book.authors.length > 0 ? book.authors[0].name : "Unknown"}
          </p>
          <p className="text-gray-600">
            <strong>Genres:</strong> {book.subjects.join(", ") || "N/A"}
          </p>
          <p className="text-gray-500 mt-4">{book.description || "No description available."}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
