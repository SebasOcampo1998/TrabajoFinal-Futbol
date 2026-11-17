
import '../styles/SearchBar.css';

function SearchBar({
  value,
  onChange,
  onClear,
  resultsCount
}) {
  return (
    <section className="search">
      <label
        className="search__label"
        htmlFor="player-search"
      >
        BUSCAR JUGADORES
      </label>

      <div className="search__container">
        <span className="search__icon">
          🔎
        </span>

        <input
          id="player-search"
          className="search__input"
          type="text"
          placeholder="Escribe el nombre de un jugador..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />

        {value && (
          <button
            className="search__clear"
            type="button"
            onClick={onClear}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      <p className="search__results">
        Mostrando {resultsCount} resultados
      </p>
    </section>
  );
}

export default SearchBar;
