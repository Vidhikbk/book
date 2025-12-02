// pages/Wishlist.jsx
import { useContext } from "react";
import { BookContext } from "../context/BookContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(BookContext);

  if (wishlist.length === 0) return <p>No books in wishlist</p>;

  return (
    <div>
      <h1>Wishlist</h1>
      <div className="book-grid">
        {wishlist.map(book => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>{book.category}</p>
            <button onClick={() => removeFromWishlist(book.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
