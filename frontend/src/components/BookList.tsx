import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // NEW
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);

        setBooks(data.books);
        setTotalPages(
          data.totalBooks && pageSize > 0
            ? Math.ceil(data.totalBooks / pageSize)
            : 1
        );
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading Books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Sort books client-side before rendering
  const sortedBooks = [...books].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return sortOrder === 'asc'
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  });

  return (
    <div className="container mt-4">
      {/* Sort Dropdown */}
      <div className="mb-3 d-flex align-items-center gap-2">
        <label htmlFor="sortSelect" className="form-label mb-0">
          Sort by title:
        </label>
        <select
          id="sortSelect"
          className="form-select w-auto"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        >
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>

      {/* Book Cards */}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {sortedBooks.map((b) => (
          <div className="col-md-10" key={b.bookId}>
            <div className="card shadow-sm h-100">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">{b.title}</h5>
              </div>
              <div className="card-body">
                <ul className="list-unstyled mb-0">
                  <li>
                    <strong>Author:</strong> {b.author}
                  </li>
                  <li>
                    <strong>Publisher:</strong> {b.publisher}
                  </li>
                  <li>
                    <strong>ISBN:</strong> {b.isbn}
                  </li>
                  <li>
                    <strong>Category:</strong> {b.category}
                  </li>
                  <li>
                    <strong>Classification:</strong> {b.classification}
                  </li>
                  <li>
                    <strong>Pages:</strong> {b.pageCount}
                  </li>
                  <li>
                    <strong>Price:</strong> ${b.price}
                  </li>
                </ul>
                <br />
                <button
                  onClick={() =>
                    navigate(`/buy/${b.title}/${b.price}/${b.bookId}`)
                  }
                  className="btn btn-success"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
}

export default BookList;
