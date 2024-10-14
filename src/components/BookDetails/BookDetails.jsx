import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://gutendex.com/books/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
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

  const getAuthorInfo = (authors) => {
    if (authors.length > 0) {
      const { name, birth_year, death_year } = authors[0];
      return `${name} (Born: ${birth_year || "N/A"}, Died: ${death_year || "N/A"})`;
    }
    return "Unknown Author";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 animate-fade-in">{book.title}</h1>

      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-6 animate-slide-up">
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="w-full md:w-1/2 h-72 object-contain rounded-lg mb-4 md:mr-4 transform transition-all hover:scale-105"
        />

        <div className="md:w-1/2 space-y-4">
          <p className="text-gray-700">
            <strong>Author:</strong> {getAuthorInfo(book.authors)}
          </p>
          <p className="text-gray-600">
            <strong>Genres:</strong>
            <ul className="list-disc ml-6">
              {book.subjects.length > 0
                ? book.subjects.map((subject, index) => (
                    <li key={index} className="text-gray-600">
                      {subject}
                    </li>
                  ))
                : "N/A"}
            </ul>
          </p>
          <p className="text-gray-600">
            <strong>Bookshelves:</strong> {book.bookshelves.join(", ") || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Language:</strong> {book.languages.join(", ") || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Download Count:</strong> {book.download_count || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Copyright:</strong> {book.copyright ? "Yes" : "No"}
          </p>
          <p className="text-gray-500 mt-4">
            {book.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
