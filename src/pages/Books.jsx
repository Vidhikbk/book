import { useState } from "react";
import { books } from "../data/books";
import BookCard from "../components/BookCard";

function Books() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || b.category === category)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Books</h1>

      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4 md:mb-0 flex-1"
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Books;
