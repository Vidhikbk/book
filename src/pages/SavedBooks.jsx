import { useContext } from "react";
import { BookContext } from "../context/BookContext";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import cartoon from "../../src/assets/cartoon_boy.png";

function SavedBooks() {
  const { savedBooks, removeFromSaved } = useContext(BookContext);

  return (
    <div className="bg-linear-to-br from-purple-100 via-pink-50 to-yellow-100 relative min-h-screen flex flex-col items-start px-6 py-10 overflow-hidden">

      {/* Top-right illustration */}
      <div className="absolute top-1 right-1 w-64 md:w-70 z-0">
        <img
          src={cartoon}
          alt="Illustration"
          className="w-full rounded-xl animate-float-slow"
        />
      </div>

      {/* Decorative floating icons */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
        alt="icon"
        className="absolute top-10 left-10 w-12 md:w-16 opacity-20 animate-float-slow z-0"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
        alt="icon"
        className="absolute bottom-20 right-20 w-12 md:w-16 opacity-20 animate-float-slow z-0"
      />

      {/* Header Section */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col gap-4 mb-10">
        <h1 className="text-xl md:text-3xl font-extrabold text-purple-700">
          Your Saved Books
        </h1>
        <p className="text-gray-700 text-md md:text-md">
          Explore the books you've saved for later. Pick up where you left off and continue your reading journey.
        </p>
      </div>

      {/* Books Section aligned to start */}
      <div className="w-full max-w-7xl flex flex-wrap items-start justify-start gap-8 relative z-10 mt-6">
        {savedBooks.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-60 w-full">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2910/2910766.png"
              alt="Empty"
              className="w-24 mb-4 opacity-70"
            />
            <p className="text-gray-500 text-xl">No saved books</p>
          </div>
        ) : (
          savedBooks.map((book) => (
            <div
              key={book.id}
              className="w-72 bg-white/70 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Book Cover */}
              <Link to={`/books/${book.id}`} state={{ url: book.localFile }}>
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-72 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 gap-2">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 hover:text-purple-700 transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500">{book.category}</p>

                {book.progress !== undefined && (
                  <div className="mt-2">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-purple-700 mt-1 font-medium">
                      Progress: {book.progress}%
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Action Bar */}
              <div className="flex justify-between items-center px-5 py-3 border-t border-gray-200 bg-white/80">
                <Link
                  to={`/books/${book.id}`}
                  state={{ url: book.localFile }}
                  className="text-purple-600 font-semibold text-sm px-3 py-1 rounded-full border border-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
                >
                  Open Book
                </Link>

                <button
                  onClick={() => removeFromSaved(book.id)}
                  className="text-red-500 hover:text-red-600 transition-all text-xl"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SavedBooks;
