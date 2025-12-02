// src/context/BookContext.jsx
import { createContext, useState } from "react";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);

  const addToWishlist = (book) => setWishlist([...wishlist, book]);
  const removeFromWishlist = (id) => setWishlist(wishlist.filter(b => b.id !== id));

  const addToSaved = (book) => setSavedBooks([...savedBooks, book]);
  const removeFromSaved = (id) => setSavedBooks(savedBooks.filter(b => b.id !== id));

  return (
    <BookContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      savedBooks,
      addToSaved,
      removeFromSaved
    }}>
      {children}
    </BookContext.Provider>
  );
};
