import { useParams } from "react-router-dom";
import { books } from "../data/books";
import { useEffect, useState, useContext } from "react";
import { BookContext } from "../context/BookContext";
import { AiOutlineHeart, AiOutlineSave } from "react-icons/ai";

function cleanGutenbergText(text) {
    const startMarker = "*** START OF";
    const endMarker = "*** END OF";
    const startIndex = text.indexOf(startMarker);
    const endIndex = text.indexOf(endMarker);
    if (startIndex !== -1 && endIndex !== -1) {
        return text.substring(startIndex + 100, endIndex).trim();
    }
    return text;
}

const BookDetails = () => {
    const { id } = useParams();
    const { addToWishlist, addToSaved } = useContext(BookContext);

    const book = books.find((b) => b.id === parseInt(id));

    const [content, setContent] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showReader, setShowReader] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const paragraphsPerPage = 15;

    // Load book text file
    useEffect(() => {
        const loadBook = async () => {
            if (!book || !book.localFile) return;

            try {
                const res = await fetch(book.localFile);
                const text = await res.text();
                const cleaned = cleanGutenbergText(text);
                const normalized = cleaned.replace(/\r\n/g, "\n").trim();
                const paragraphs = normalized.split("\n\n");

                const pages = [];
                for (let i = 0; i < paragraphs.length; i += paragraphsPerPage) {
                    pages.push(paragraphs.slice(i, i + paragraphsPerPage));
                }

                setContent(pages);
            } catch (err) {
                console.error("Error loading book:", err);
            }
        };

        loadBook();
    }, [book]);

    if (!book) {
        return (
            <p className="text-center mt-12 text-lg text-gray-500">
                Book not found.
            </p>
        );
    }

    const totalPages = content.length;

    // -------------------------------------------------------
    // UI 1 — SUMMARY PAGE (GOODREADS STYLE)
    // -------------------------------------------------------
    if (!showReader) {
        return (
            <div className="w-full max-w-4xl mx-auto px-4 py-12">
                <div className="flex gap-8">

                    {/* Book Cover */}
                    <img
                        src={book.cover}
                        alt={book.title}
                        className="w-48 h-auto rounded shadow"
                    />

                    <div className="flex-1">

                        {/* Title + Author */}
                        <h1 className="text-4xl font-serif font-bold text-gray-900">
                            {book.title}
                        </h1>
                        <p className="mt-1 text-lg text-gray-700 font-medium">
                            {book.author}
                        </p>

                        {/* Rating Section */}
                        <div className="flex items-center gap-3 mt-4">
                            <div className="flex text-yellow-500 text-xl">★★★★☆</div>
                            <p className="font-semibold text-gray-800 text-xl">{book.rating}</p>
                            <p className="text-gray-500 text-sm">
                                {book.reviews} ratings · {book.reviewCount} reviews
                            </p>
                        </div>

                        {/* Description */}
                        <div className="mt-4 text-gray-800 leading-relaxed">
                            <p>
                                {expanded
                                    ? (book.description || "No description available.")
                                    : ((book.description || "").slice(0, 250) +
                                        ((book.description?.length || 0) > 250 ? "..." : ""))
                                }
                            </p>

                            {book.description && book.description.length > 250 && (
                                <button
                                    className="mt-2 text-gray-600 text-sm underline hover:text-gray-800"
                                    onClick={() => setExpanded(!expanded)}
                                >
                                    {expanded ? "Show less" : "Show more"}
                                </button>
                            )}
                        </div>

                        {/* Genres */}
                        <div className="mt-4 flex flex-wrap gap-3 text-green-700 font-medium">
                            {(book.genres || []).map((g, i) => (
                                <button key={i} className="underline hover:text-green-900 text-sm">
                                    {g}
                                </button>
                            ))}
                            {book.genres && book.genres.length > 0 && (
                                <span className="underline text-sm cursor-pointer">...more</span>
                            )}
                        </div>

                        {/* Pages + Published */}
                        <p className="mt-4 text-sm text-gray-700">
                            {book.pages} pages, ebook
                            <br />
                            First published {book.published}
                        </p>

                        {/* Details dropdown */}
                        <details className="mt-4 cursor-pointer">
                            <summary className="text-lg font-semibold text-gray-800 select-none">
                                Book details & editions
                            </summary>

                            <div className="mt-2 pl-2 text-gray-600 text-sm">
                                • ISBN: {book.isbn}<br />
                                • Language: English<br />
                                • Category: {book.category}
                            </div>
                        </details>

                        {/* Buttons */}
                        <div className="mt-6">
                            <button
                                onClick={() => addToWishlist(book)}
                                className="w-56 flex justify-between items-center px-5 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700"
                            >
                                Want to Read
                                <span className="text-xl">⌄</span>
                            </button>

                            <button
                                className="w-56 flex justify-between items-center px-5 py-3 border border-gray-400 rounded-full text-gray-700 mt-3 hover:bg-gray-50"
                            >
                                Buy on Amazon
                                <span className="text-xl">⌄</span>
                            </button>

                            {/* Start Reading — FIXED BUTTON */}
                            <button
                                onClick={() => setShowReader(true)}
                                className="w-56 flex justify-center items-center px-5 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 mt-4"
                            >
                                Start Reading
                            </button>
                        </div>

                        {/* Rate Section */}
                        <div className="mt-6">
                            <p className="text-sm text-gray-600 mb-1">Rate this book</p>
                            <div className="flex text-gray-400 text-3xl gap-2 cursor-pointer">
                                ★ ★ ★ ★ ★
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------
    // UI 2 — READING MODE
    // -------------------------------------------------------

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-12">

            {/* Header */}
            <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{book.title}</h1>
                    <p className="text-gray-500 mt-1">{book.author}</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => addToWishlist(book)}
                        className="flex items-center gap-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
                    >
                        <AiOutlineHeart /> Wishlist
                    </button>

                    <button
                        onClick={() => addToSaved(book)}
                        className="flex items-center gap-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
                    >
                        <AiOutlineSave /> Save
                    </button>
                </div>
            </div>

            {/* Reading content */}
            <div className="bg-white p-4 rounded-md shadow-sm max-h-[450px] overflow-y-auto">
                {content.length > 0 &&
                    content[currentPage].map((para, idx) => (
                        <p key={idx} className="mb-3 leading-relaxed text-gray-800 font-serif text-base">
                            {para}
                        </p>
                    ))
                }
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-6 mt-6 text-gray-700 text-sm">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                    disabled={currentPage === 0}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40"
                >
                    Previous
                </button>

                <span>Page {currentPage + 1} / {totalPages}</span>

                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40"
                >
                    Next
                </button>
            </div>

            {/* Back button */}
            <div className="text-center mt-8">
                <button
                    onClick={() => setShowReader(false)}
                    className="text-blue-600 hover:underline text-sm"
                >
                    ← Back to book info
                </button>
            </div>
        </div>
    );
};

export default BookDetails;
