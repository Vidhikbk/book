// src/components/SearchBar.jsx
const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <input 
    type="text"
    placeholder="Search books..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border p-2 rounded w-full mb-4"
  />
);

export default SearchBar;
