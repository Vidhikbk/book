import { createContext, useState, useEffect } from "react";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  // Initialize state from localStorage, fallback to empty array
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to parse wishlist from localStorage:", e);
      return [];
    }
  });

  const [savedBooks, setSavedBooks] = useState(() => {
    try {
      const stored = localStorage.getItem("savedBooks");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to parse savedBooks from localStorage:", e);
      return [];
    }
  });

  // Persist wishlist whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Persist savedBooks whenever it changes
  useEffect(() => {
    localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
  }, [savedBooks]);

  // Add/remove functions
  const addToWishlist = (book) => {
    setWishlist((prev) => {
      // Prevent duplicates
      if (prev.find((b) => b.id === book.id)) return prev;
      return [...prev, book];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((b) => b.id !== id));
  };

  const addToSaved = (book) => {
    setSavedBooks((prev) => {
      if (prev.find((b) => b.id === book.id)) return prev;
      return [...prev, book];
    });
  };

  const removeFromSaved = (id) => {
    setSavedBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BookContext.Provider
      value={{
        wishlist,
        savedBooks,
        addToWishlist,
        removeFromWishlist,
        addToSaved,
        removeFromSaved,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
