import { useContext } from "react";
import { BookContext } from "../context/BookContext";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";
import { AiOutlineDelete } from "react-icons/ai";

function SavedBooks() {
  const { savedBooks, removeFromSaved } = useContext(BookContext);

  if (savedBooks.length === 0)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">No saved books</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-2">
      <Row gutter={[24, 24]}>
        {savedBooks.map((book) => (
          <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              bodyStyle={{ padding: 0 }}
              className="rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl flex flex-col"
            >
              <Link to={`/books/${book.id}`} state={{ url: book.localFile }}>
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>

              <div className="p-4 flex flex-col justify-between flex-1 relative">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{book.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{book.category}</p>
                  {book.progress !== undefined && (
                    <p className="text-sm text-gray-500 mt-1">Progress: {book.progress}%</p>
                  )}
                </div>

                {/* Delete Icon at Bottom-Right */}
                <span
                  onClick={() => removeFromSaved(book.id)}
                  className="absolute bottom-4 right-4 text-red-500 text-xl cursor-pointer hover:text-red-600 transition-colors"
                >
                  <AiOutlineDelete />
                </span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SavedBooks;
