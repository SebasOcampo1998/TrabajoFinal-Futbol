
import '../styles/Pagination.css';

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems
}) {
  const start = totalItems === 0
    ? 0
    : (currentPage - 1) * itemsPerPage + 1;

  const end = Math.min(
    currentPage * itemsPerPage,
    totalItems
  );

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav
      className="pagination"
      aria-label="Paginación de jugadores"
    >
      <div className="pagination__info">
        <label htmlFor="items-per-page">
          Mostrar
        </label>

        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={(event) => {
            onItemsPerPageChange(Number(event.target.value));
          }}
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
        </select>

        <span>
          Mostrando {start}-{end} de {totalItems} registros
        </span>
      </div>

      <div className="pagination__buttons">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          Primera
        </button>

        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Anterior
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={
              currentPage === page
                ? 'pagination__button--active'
                : ''
            }
            aria-current={
              currentPage === page ? 'page' : undefined
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Siguiente
        </button>

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          Última
        </button>
      </div>
    </nav>
  );
}

export default Pagination;
