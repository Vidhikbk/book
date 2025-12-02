import { useContext } from "react";
import { BookContext } from "../context/BookContext";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const { addToWishlist, addToSaved } = useContext(BookContext);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer">
      {/* Wrap image and title in Link */}
      <Link to={`/books/${book.id}`} state={{ url: book.localFile }}>
        <div className="relative">
          <img
            src={book.cover}
            alt={book.title}
            className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            {book.category}
          </span>
        </div>

        <div className="p-4 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {book.title}
          </h2>
          <p className="text-sm text-gray-500 mb-2 truncate">{book.author}</p>

          <div className="flex items-center mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(book.rating) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.95c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 00-.364-1.118L2.075 9.377c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.95z"/>
              </svg>
            ))}
            <span className="text-gray-500 text-sm ml-2">{book.rating.toFixed(1)}</span>
          </div>
        </div>
      </Link>

      {/* Wishlist & Saved Buttons */}
      <div className="p-4 pt-0 flex justify-between gap-2">
        <button
          onClick={() => addToWishlist(book)}
          className="flex-1 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Wishlist
        </button>
        <button
          onClick={() => addToSaved(book)}
          className="flex-1 bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default BookCard;
