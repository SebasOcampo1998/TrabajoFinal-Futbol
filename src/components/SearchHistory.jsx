
import '../styles/SearchHistory.css';

function SearchHistory({
  history,
  onSelectSearch,
  onClearHistory
}) {
  return (
    <section className="search-history">
      <label
        className="search-history__label"
        htmlFor="search-history"
      >
        HISTORIAL DE BÚSQUEDAS
      </label>

      <div className="search-history__controls">
        <select
          id="search-history"
          className="search-history__select"
          defaultValue=""
          onChange={(event) => {
            if (event.target.value) {
              onSelectSearch(event.target.value);
            }

            event.target.value = '';
          }}
        >
          <option value="">
            Selecciona una búsqueda anterior
          </option>

          {history.map((term) => (
            <option key={term} value={term}>
              {term}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="search-history__clear"
          onClick={onClearHistory}
          disabled={history.length === 0}
        >
          Limpiar historial
        </button>
      </div>

      <p className="search-history__count">
        {history.length} de 5 búsquedas guardadas
      </p>
    </section>
  );
}

export default SearchHistory;
