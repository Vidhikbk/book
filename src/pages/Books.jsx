import { useState } from "react";
import { books } from "../data/books";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { Select } from "antd";

const { Option } = Select;

function Books() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Dynamically get unique categories
  const categories = Array.from(new Set(books.map((b) => b.category))).sort();

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || b.category === category)
  );

  return (
    <div className="bg-linear-to-r from-purple-100 via-pink-100 to-yellow-100 ">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10">

        {/* Search + Category */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-8">
          <div className="flex-1 w-full sm:w-auto">
            <SearchBar searchTerm={search} setSearchTerm={setSearch} />
          </div>
          <div className="w-full sm:w-56 mt-3 sm:mt-0">
            <Select
              allowClear
              placeholder="Select Category"
              value={category || undefined}
              onChange={(value) => setCategory(value || "")}
              className="w-full rounded-lg"
              size="large"
            >
              {categories.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Books Flex Container */}
        {filteredBooks.length > 0 ? (
          <div className="flex flex-wrap justify-start gap-4 sm:gap-6 md:gap-8">
            {filteredBooks.map((book) => (
              <div key={book.id} className="flex shrink-0">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-base sm:text-lg mt-20">
            No books found for your search.
          </div>
        )}
      </div></div>
  );
}

export default Books;
