// pages/SavedBooks.jsx
import { useContext } from "react";
import { BookContext } from "../context/BookContext";

function SavedBooks() {
  const { savedBooks, removeSavedBook } = useContext(BookContext);

  if (savedBooks.length === 0) return <p>No saved books</p>;

  return (
    <div>
      <h1>Saved Books</h1>
      <div className="book-grid">
        {savedBooks.map(book => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>Category: {book.category}</p>
            <p>Progress: {book.progress}%</p>
            <button onClick={() => removeSavedBook(book.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedBooks;
