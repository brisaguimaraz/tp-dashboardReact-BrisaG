import PropType from "prop-types";
export const Paginator = ({
  pagination: { currentPage, pages },
  handlePagination,
}) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {currentPage !== 1 && (
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() =>
                handlePagination(
                  event,
                  `/api/v1/movies?page=${currentPage - 1}&limit=8`
                )
              }
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        )}

        {pages.map((paginate) => (
          <li
            key={paginate.number}
            className={`page-item ${
              paginate.number === currentPage && "active"
            }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => handlePagination(event, paginate.url)}
            >
              {paginate.number}
            </a>
          </li>
        ))}
        {currentPage !== pages[pages.length - 1].number && (
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={() =>
                handlePagination(
                  event,
                  `/api/v1/movies?page=${currentPage + 1}&limit=8`
                )
              }
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
Paginator.propTypes = {
  pagination: PropType.object,
  handlePagination: PropType.func,
};
