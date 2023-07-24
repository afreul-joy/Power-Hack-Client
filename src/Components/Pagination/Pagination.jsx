import "./pagination.css";

// eslint-disable-next-line react/prop-types
const Pagination = ({ totalPages, setCurrentPage, currentPage, pageSize }) => {
  const totalItems = totalPages * pageSize;
  const pages = Math.ceil(totalItems / pageSize);

  return (
    <div   className="pagination-container">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous Page
      </button>

      {[...Array(pages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === pages}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
