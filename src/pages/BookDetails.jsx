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
    const {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        savedBooks,
        addToSaved,
        removeFromSaved
    } = useContext(BookContext);

    const book = books.find((b) => b.id === parseInt(id));
    const [content, setContent] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showReader, setShowReader] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const paragraphsPerPage = 15;
    const isInWishlist = wishlist.some(b => b.id === book?.id);
    const isSaved = savedBooks.some(b => b.id === book?.id);

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
            <p className="text-center mt-12 text-lg text-gray-500">Book not found.</p>
        );
    }

    const totalPages = content.length;

    // -------------------------
    // SUMMARY PAGE
    // -------------------------
    if (!showReader) {
        return (
            <div className="w-full max-w-5xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-2xl p-6">
                    {/* Book Cover */}
                    <img
                        src={book.cover}
                        alt={book.title}
                        className="w-56 max-h-72 object-contain rounded-xl shadow-md bg-gray-100"
                    />

                    {/* Book Info */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">{book.title}</h1>
                            <p className="mt-1 text-lg text-gray-600">{book.author}</p>

                            {/* Rating */}
                            <div className="flex items-center gap-4 mt-3 text-yellow-400">
                                <div className="flex">
                                    {"★".repeat(Math.floor(book.rating)) + "☆".repeat(5 - Math.floor(book.rating))}
                                </div>
                                <span className="text-gray-800 font-semibold">{book.rating}</span>
                            </div>

                            {/* Description */}
                            <div className="mt-4 text-gray-700 leading-relaxed">
                                <p>
                                    {expanded ? book.description : `${book.description?.slice(0, 300)}${book.description?.length > 300 ? "..." : ""}`}
                                </p>
                                {book.description?.length > 300 && (
                                    <button
                                        className="mt-2 text-blue-600 text-sm underline hover:text-blue-800"
                                        onClick={() => setExpanded(!expanded)}
                                    >
                                        {expanded ? "Show less" : "Show more"}
                                    </button>
                                )}
                            </div>

                            {/* Genres */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {book.genres?.map((g, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full cursor-pointer hover:bg-green-200"
                                    >
                                        {g}
                                    </span>
                                ))}
                            </div>

                            {/* Pages & Published */}
                            <p className="mt-4 text-sm text-gray-500">
                                {book.pages} pages · eBook<br />
                                First published {book.published}
                            </p>

                            {/* Details */}
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 text-sm">
                                <p><span className="font-semibold">Language:</span> {book.language}</p>
                                <p><span className="font-semibold">Category:</span> {book.category}</p>
                                <p><span className="font-semibold">Reading Level:</span> {book.readingLevel}</p>
                                <p><span className="font-semibold">Credits:</span> {book.credits}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex flex-col md:flex-row gap-3">
                            <button
                                onClick={() => isInWishlist ? removeFromWishlist(book.id) : addToWishlist(book)}
                                className={`cursor-pointer flex-1 px-3 py-2 rounded-md text-sm font-medium transition ${isInWishlist ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-cyan-500 text-white hover:bg-cyan-600'}`}
                            >
                                {isInWishlist ? "Wishlisted" : "Add to Wishlist"}
                            </button>
                            <button
                                onClick={() => setShowReader(true)}
                                className="cursor-pointer flex-1 px-3 py-2 bg-purple-500 text-white rounded-md text-sm font-medium hover:bg-purple-600 transition"
                            >
                                Start Reading
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // -------------------------
    // READING PAGE
    // -------------------------
    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-12 space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-900">{book.title}</h1>
                    <p className="text-gray-500 text-sm mt-1">{book.author}</p>
                </div>

                {/* Reading Buttons */}
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => isInWishlist ? removeFromWishlist(book.id) : addToWishlist(book)}
                        className={`cursor-pointer flex items-center gap-1 px-2 py-1 rounded-md border text-xs transition ${isInWishlist
                                ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600"
                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        <AiOutlineHeart /> {isInWishlist ? "Wishlisted" : "Wishlist"}
                    </button>

                    <button
                        onClick={() => isSaved ? removeFromSaved(book.id) : addToSaved(book)}
                        className={`cursor-pointer flex items-center gap-1 px-2 py-1 rounded-md border text-xs transition ${isSaved
                                ? "bg-purple-500 text-white border-purple-500 hover:bg-purple-600"
                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        <AiOutlineSave /> {isSaved ? "Saved" : "Save"}
                    </button>
                </div>
            </div>

            {/* Reading Content */}
            <div className="bg-white p-4 rounded-lg shadow-sm max-h-[450px] overflow-y-auto text-sm md:text-base font-serif text-gray-800 leading-relaxed">
                {content.length > 0 &&
                    content[currentPage].map((para, idx) => (
                        <p key={idx} className="mb-3">{para}</p>
                    ))
                }
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 text-gray-700 text-sm mt-4">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                    disabled={currentPage === 0}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 transition cursor-pointer"
                >
                    Previous
                </button>

                <span>Page {currentPage + 1} / {totalPages}</span>

                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 transition cursor-pointer"
                >
                    Next
                </button>
            </div>

            {/* Back Button */}
            <div className="text-center mt-4">
                <button
                    onClick={() => setShowReader(false)}
                    className="text-blue-600 text-sm cursor-pointer"
                >
                    ← Back to book info
                </button>
            </div>

        </div>
    );
};

export default BookDetails;
