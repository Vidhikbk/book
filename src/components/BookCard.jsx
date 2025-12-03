import { useContext } from "react";
import { BookContext } from "../context/BookContext";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiOutlineSave, AiFillCheckCircle } from "react-icons/ai";

const BookCard = ({ book }) => {
  const { addToWishlist, removeFromWishlist, addToSaved, removeFromSaved, wishlist, savedBooks } =
    useContext(BookContext);

  const isInWishlist = wishlist.some((b) => b.id === book.id);
  const isSaved = savedBooks.some((b) => b.id === book.id);

  return (
  
      <div className="w-[260px] h-[380px] rounded-3xl shadow-2xl overflow-hidden transform transition-transform duration-500 hover:scale-105 bg-white/50  flex flex-col">

        {/* Book Image */}
        <Link
          to={`/books/${book.id}`}
          state={{ url: book.localFile }}
          className="relative w-full overflow-hidden group"
        >
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Featured Badge */}
          {book.featured && (
            <span className="absolute top-3 right-3 bg-yellow-400/90 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse z-10">
              Featured
            </span>
          )}
        </Link>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-1 justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-gray-900 line-clamp-2">{book.title}</h2>
            <p className="text-sm text-gray-500 truncate">{book.author}</p>

            {/* Category Badge */}
            <span className="inline-block bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full mt-2">
              {book.category}
            </span>

            {/* Rating */}
            <div className="flex items-center mt-2 gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 text-yellow-400 ${i >= Math.floor(book.rating) ? "text-gray-300" : ""}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.95c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 00-.364-1.118L2.075 9.377c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.95z" />
                </svg>
              ))}
              <span className="text-gray-500 text-sm ml-2">{book.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-3 flex gap-2 justify-end">
            {/* Wishlist Button */}
            <button
              onClick={() => (isInWishlist ? removeFromWishlist(book.id) : addToWishlist(book))}
              className={`w-auto flex items-center justify-center gap-1 px-2 py-1 rounded-full text-sm font-medium shadow-sm transition-colors duration-200
      ${isInWishlist
                  ? "bg-[#FFD7E0] text-[#9B3E5C] hover:bg-[#FFCBD6]"
                  : "bg-[#E5DBFF] text-[#5C3E9B] hover:bg-[#D2C0FF]"
                }`}
            >
              {isInWishlist ? <AiFillHeart className="animate-pulse w-4 h-4" /> : <AiOutlineHeart className="w-4 h-4" />}
            </button>

            {/* Save Button */}
            <button
              onClick={() => (isSaved ? removeFromSaved(book.id) : addToSaved(book))}
              className={`w-auto flex items-center justify-center gap-1 px-2 py-1 rounded-full text-sm font-medium shadow-sm transition-colors duration-200
      ${isSaved
                  ? "bg-[#F0F0F0] text-[#555555] hover:bg-[#E0E0E0]"
                  : "bg-[#D9F0E0] text-[#2E7D4B] hover:bg-[#BFEAD0]"
                }`}
            >
              {isSaved ? <AiFillCheckCircle className="animate-bounce w-4 h-4" /> : <AiOutlineSave className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>


  );
};

export default BookCard;
