import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full mb-4">
      {/* Search icon */}
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

      {/* Input */}
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none text-gray-700 text-sm md:text-sm transition-all duration-200 hover:shadow"
      />

      {/* Clear button */}
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
