import BookCard from "../components/BookCard";
import { books } from "../data/books";

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Featured Books</h1>
      
      {/* Responsive Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
