import BookCard from "../components/BookCard";
import { books } from "../data/books";

const Home = () => {
  return (
    <div className="bg-linear-to-r from-purple-100 via-pink-100 to-yellow-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">

        {/* Flex Container */}
        <div className="flex flex-wrap justify-start gap-8">
          {books.map((book) => (
            <div key={book.id} className="relative flex shrink-0">
              {/* Featured Badge */}
              {book.featured && (
                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs md:text-sm font-semibold px-2 py-1 rounded-full shadow-md animate-pulse z-10">
                  Featured
                </span>
              )}

              <BookCard book={book} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center max-w-md mx-auto">
          <p className="text-gray-600 text-sm md:text-base">
            Discover more books and find your next favorite read today!
          </p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">
            Browse All Books
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
