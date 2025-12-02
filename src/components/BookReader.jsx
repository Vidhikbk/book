import { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";

const BookReader = ({ gutenbergId }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Use the local Node proxy server
        const res = await fetch(`http://localhost:5000/book/${gutenbergId}`);
        const text = await res.text();

        // Split text into pages (~500 characters per page)
        const chunkSize = 500;
        const bookPages = [];
        for (let i = 0; i < text.length; i += chunkSize) {
          bookPages.push(text.slice(i, i + chunkSize));
        }
        setPages(bookPages);
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };

    fetchBook();
  }, [gutenbergId]);

  if (pages.length === 0) return <p>Loading book...</p>;

  return (
    <div className="flex justify-center mt-6">
      <HTMLFlipBook
        width={300}
        height={450}
        size="stretch"
        minWidth={200}
        maxWidth={400}
        minHeight={400}
        maxHeight={600}
        maxShadowOpacity={0.5}
        showCover={true}
        className="shadow-xl"
      >
        {pages.map((page, index) => (
          <div
            key={index}
            className="bg-white p-4 text-gray-800 text-sm"
          >
            {page}
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default BookReader;


