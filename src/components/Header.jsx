import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Books", path: "/books" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Saved", path: "/saved" },
  ];

  // Detect scroll to add shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-white/90 backdrop-blur-sm sticky top-0 z-50 transition-shadow ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          MyBookStore
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-blue-600 transition-colors ${
                location.pathname === link.path ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-gray-900 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="ml-auto w-64 bg-white h-full shadow-lg transform transition-transform duration-300 translate-x-0 flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <span className="text-lg font-semibold text-gray-900">Menu</span>
              <button onClick={() => setOpen(false)}>
                <HiX size={28} />
              </button>
            </div>
            <nav className="flex flex-col px-6 py-4 space-y-4 text-gray-700">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`hover:text-blue-600 transition-colors ${
                    location.pathname === link.path ? "text-blue-600 font-semibold" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
