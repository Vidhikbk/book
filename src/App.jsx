import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Wishlist from "./pages/Wishlist";
import SavedBooks from "./pages/SavedBooks";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="min-h-screen container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/saved" element={<SavedBooks />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
