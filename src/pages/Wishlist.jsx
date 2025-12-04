import React, { useContext } from "react";
import { BookContext } from "../context/BookContext";
import { AiFillHeart } from "react-icons/ai";
import cartoon from '../../src/assets/cartoon.png';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(BookContext);

  const icons = [
    "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
    "https://cdn-icons-png.flaticon.com/512/1828/1828911.png",
    "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    "https://cdn-icons-png.flaticon.com/512/3135/3135712.png",
    "https://cdn-icons-png.flaticon.com/512/1040/1040231.png",
  ];

  // Fixed illustration size
  const illustrationWidth = "20rem";
  const illustrationHeight = "30rem";

  return (
    <div className="bg-linear-to-r from-purple-100 via-pink-50 to-yellow-100 min-h-screen px-6 py-16 relative flex flex-col items-center">
      {/* Floating icons */}
      {icons.map((icon, idx) => (
        <img
          key={idx}
          src={icon}
          alt="Book icon"
          className={`absolute w-12 md:w-16 opacity-30 animate-float-slow
            ${idx === 0 ? "top-10 right-10" : ""}
            ${idx === 1 ? "top-20 left-5" : ""}
            ${idx === 2 ? "bottom-10 right-20" : ""}
            ${idx === 3 ? "bottom-20 left-10" : ""}
            ${idx === 4 ? "top-1/3 right-1/3" : ""}`}
        />
      ))}

      <div className="max-w-6xl w-full flex flex-col md:flex-row items-start gap-10 relative z-10">
        {/* Book data on LEFT */}
        <div className="md:flex-1 w-full flex flex-col gap-6 max-h-96 overflow-y-scroll hide-scrollbar pr-2">
          {wishlist.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-40">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2910/2910766.png"
                alt="Empty"
                className="w-24 mb-2"
              />
              <p className="text-gray-500 text-lg">No books in your wishlist</p>
            </div>
          ) : (
            wishlist.map((book) => (
              <div
                key={book.id}
                className="flex items-center gap-4 bg-purple-50 rounded-xl p-4 hover:bg-purple-100 transition-all shadow-sm"
              >
                {/* Book image */}
                <img
                  src={book.cover || "https://cdn-icons-png.flaticon.com/512/1828/1828911.png"}
                  alt={book.title}
                  className="w-24 h-32 md:w-28 md:h-36 object-cover rounded-lg"
                />

                {/* Book info */}
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500">{book.category}</p>
                  {book.pages && (
                    <span className="mt-1 inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">
                      {book.pages} pages
                    </span>
                  )}
                  <AiFillHeart
                    onClick={() => removeFromWishlist(book.id)}
                    className="text-red-500 text-2xl cursor-pointer hover:text-red-600 transition-colors mt-2"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Main illustration on RIGHT */}
        <div className="flex justify-center items-start md:flex-1 relative">
          <img
            src={cartoon}
            alt="Books Illustration"
            className="rounded-xl animate-float-slow transition-transform duration-1000 hover:scale-105"
            style={{ width: illustrationWidth, height: illustrationHeight }}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
