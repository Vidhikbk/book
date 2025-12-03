import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300  ">
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">

      {/* Copyright */}
      <div className="text-center md:text-left text-sm md:text-base">
        &copy; {new Date().getFullYear()} MyBookStore. All rights reserved.
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm md:text-base">
        <a href="/about" className="hover:text-white transition-colors">About</a>
        <a href="/contact" className="hover:text-white transition-colors">Contact</a>
        <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
      </div>

      {/* Social Icons */}
      <div className="flex gap-4">
        <a
          href="#"
          className="bg-gray-700 hover:bg-blue-600 transition-colors p-2 rounded-full text-white flex items-center justify-center"
        >
          <FaFacebookF />
        </a>
        <a
          href="#"
          className="bg-gray-700 hover:bg-sky-400 transition-colors p-2 rounded-full text-white flex items-center justify-center"
        >
          <FaTwitter />
        </a>
        <a
          href="#"
          className="bg-gray-700 hover:bg-pink-500 transition-colors p-2 rounded-full text-white flex items-center justify-center"
        >
          <FaInstagram />
        </a>
      </div>

    </div>
  </footer>
);

export default Footer;
