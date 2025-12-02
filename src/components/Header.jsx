import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-white shadow-md p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        MyBookStore
      </Link>
      <nav className="space-x-4">
        <Link to="/books" className="hover:text-blue-600">Books</Link>
        <Link to="/wishlist" className="hover:text-blue-600">Wishlist</Link>
        <Link to="/saved" className="hover:text-blue-600">Saved</Link>
      </nav>
    </div>
  </header>
);

export default Header;
