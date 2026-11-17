
import { useEffect, useMemo, useState } from 'react';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import StatsPanel from './components/StatsPanel';
import PlayerTable from './components/PlayerTable';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import ThemeToggle from './components/ThemeToggle';

import { players } from './data/players';

import './App.css';

// ACTUALIZAR LAS ULTIMAS CINCO BUSQUEDAS
function updateSearchHistory(previous, term) {
  const normalizedTerm = term.trim();

  if (normalizedTerm.length < 3) {
    return previous;
  }

  const updated = [
    normalizedTerm,
    ...previous.filter(
      (item) =>
        item.toLowerCase() !== normalizedTerm.toLowerCase()
    )
  ].slice(0, 5);

  const unchanged =
    updated.length === previous.length &&
    updated.every(
      (item, index) => item === previous[index]
    );

  return unchanged ? previous : updated;
}

function App() {
  // 1. ESTADOS DE BUSQUEDA
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // 2. ESTADO DE ORDENAMIENTO
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'none'
  });

  // 3. COLOREO DE FILAS
  const [rowColors, setRowColors] = useState('none');

  // 4. PAGINACION
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // 5. FAVORITOS
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites');
      const parsed = saved ? JSON.parse(saved) : [];

      return Array.isArray(parsed)
        ? parsed.filter(Number.isInteger)
        : [];
    } catch {
      return [];
    }
  });

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // 6. MODAL
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // 7. HISTORIAL DE BUSQUEDAS
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('searchHistory');
      const parsed = saved ? JSON.parse(saved) : [];

      return Array.isArray(parsed)
        ? parsed
            .filter((item) => typeof item === 'string')
            .slice(0, 5)
        : [];
    } catch {
      return [];
    }
  });

  // 8. MODO OSCURO Y CLARO
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved === null ? true : JSON.parse(saved) === true;
    } catch {
      return true;
    }
  });

  // 9. DEBOUNCE DE 300 MILISEGUNDOS
  useEffect(() => {
    const timer = setTimeout(() => {
      const term = searchTerm.trim();

      setDebouncedSearch(term);

      if (term.length >= 3) {
        setSearchHistory((previous) =>
          updateSearchHistory(previous, term)
        );
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 10. GUARDAR FAVORITOS
  useEffect(() => {
    localStorage.setItem(
      'favorites',
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // 11. GUARDAR HISTORIAL
  useEffect(() => {
    localStorage.setItem(
      'searchHistory',
      JSON.stringify(searchHistory)
    );
  }, [searchHistory]);

  // 12. GUARDAR TEMA
  useEffect(() => {
    localStorage.setItem(
      'darkMode',
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  // 13. FILTRAR JUGADORES
  const filteredPlayers = useMemo(() => {
    const normalizedSearch = debouncedSearch.toLowerCase();

    return players.filter((player) => {
      const matchesName = player.name
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesFavorite =
        !showOnlyFavorites ||
        favorites.includes(player.id);

      return matchesName && matchesFavorite;
    });
  }, [
    debouncedSearch,
    showOnlyFavorites,
    favorites
  ]);

  // 14. ORDENAR JUGADORES
  const sortedPlayers = useMemo(() => {
    if (
      !sortConfig.key ||
      sortConfig.direction === 'none'
    ) {
      return filteredPlayers;
    }

    return [...filteredPlayers].sort((a, b) => {
      const first = a[sortConfig.key];
      const second = b[sortConfig.key];

      const comparison =
        typeof first === 'number' &&
        typeof second === 'number'
          ? first - second
          : String(first).localeCompare(
              String(second),
              'es'
            );

      return sortConfig.direction === 'asc'
        ? comparison
        : -comparison;
    });
  }, [filteredPlayers, sortConfig]);

  // 15. ESTADISTICAS
  const stats = useMemo(() => {
    const total = filteredPlayers.length;

    const totalAges = filteredPlayers.reduce(
      (sum, player) => sum + player.age,
      0
    );

    const avgAge = total > 0
      ? (totalAges / total).toFixed(1)
      : 0;

    const topScorer = filteredPlayers.reduce(
      (best, player) => {
        if (!best || player.goals > best.goals) {
          return player;
        }

        return best;
      },
      null
    );

    const positions = filteredPlayers.reduce(
      (counts, player) => {
        counts[player.position] =
          (counts[player.position] || 0) + 1;

        return counts;
      },
      {}
    );

    return {
      total,
      avgAge,
      topScorer: topScorer?.name ?? 'Sin jugadores',
      positions
    };
  }, [filteredPlayers]);

  // 16. PAGINACION SEGURA
  const totalPages = Math.max(
    1,
    Math.ceil(sortedPlayers.length / itemsPerPage)
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedPlayers = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return sortedPlayers.slice(start, end);
  }, [
    sortedPlayers,
    safeCurrentPage,
    itemsPerPage
  ]);

  // 17. ORDENAMIENTO
  function handleSort(key) {
    setSortConfig((previous) => {
      if (previous.key !== key) {
        return { key, direction: 'asc' };
      }

      if (previous.direction === 'asc') {
        return { key, direction: 'desc' };
      }

      return { key: null, direction: 'none' };
    });

    setCurrentPage(1);
  }

  // 18. BUSQUEDA
  function handleSearchChange(value) {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  function clearSearch() {
    setSearchTerm('');
    setDebouncedSearch('');
    setCurrentPage(1);
  }

  // 19. CAMBIAR REGISTROS POR PAGINA
  function handleItemsPerPageChange(value) {
    setItemsPerPage(value);
    setCurrentPage(1);
  }

  // 20. FAVORITOS
  function handleToggleFavorite(playerId) {
    setFavorites((previous) => {
      if (previous.includes(playerId)) {
        return previous.filter(
          (id) => id !== playerId
        );
      }

      return [...previous, playerId];
    });
  }

  function handleFavoritesFilter(checked) {
    setShowOnlyFavorites(checked);
    setCurrentPage(1);
  }

  // 21. HISTORIAL
  function handleSelectSearch(term) {
    setSearchTerm(term);
    setDebouncedSearch(term);
    setCurrentPage(1);

    setSearchHistory((previous) =>
      updateSearchHistory(previous, term)
    );
  }

  function handleClearHistory() {
    setSearchHistory([]);
  }

  // 22. MODAL
  function handleCloseModal() {
    setSelectedPlayer(null);
  }

  // 23. CAMBIAR TEMA
  function handleToggleTheme() {
    setDarkMode((previous) => !previous);
  }

  return (
    <div
      className={
        darkMode
          ? 'dashboard dashboard--dark'
          : 'dashboard dashboard--light'
      }
    >
      {/* ENCABEZADO */}
      <Header />

      {/* INTERRUPTOR DE TEMA */}
      <div className="dashboard__theme-control">
        <ThemeToggle
          darkMode={darkMode}
          onToggle={handleToggleTheme}
        />
      </div>

      <main className="dashboard__main">
        {/* BUSCADOR */}
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          onClear={clearSearch}
          resultsCount={filteredPlayers.length}
        />

        {/* HISTORIAL DE BUSQUEDAS */}
        <SearchHistory
          history={searchHistory}
          onSelectSearch={handleSelectSearch}
          onClearHistory={handleClearHistory}
        />

        {/* ESTADISTICAS */}
        <StatsPanel stats={stats} />

        {/* FAVORITOS */}
        <div className="dashboard__favorites">
          <span className="dashboard__favorites-count">
            ★ {favorites.length} favoritos guardados
          </span>

          <label className="dashboard__favorites-filter">
            <input
              type="checkbox"
              checked={showOnlyFavorites}
              onChange={(event) =>
                handleFavoritesFilter(event.target.checked)
              }
            />

            Mostrar solo favoritos
          </label>
        </div>

        {/* COLOREO DE FILAS */}
        <div className="dashboard__row-controls">
          <button
            type="button"
            onClick={() => setRowColors('pares')}
          >
            Pintar filas pares
          </button>

          <button
            type="button"
            onClick={() => setRowColors('impares')}
          >
            Pintar filas impares
          </button>

          <button
            type="button"
            onClick={() => setRowColors('none')}
          >
            Limpiar colores
          </button>
        </div>

        {/* TABLA */}
        <PlayerTable
          players={paginatedPlayers}
          onRowClick={setSelectedPlayer}
          onSort={handleSort}
          sortConfig={sortConfig}
          rowColors={rowColors}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* PAGINACION */}
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalItems={sortedPlayers.length}
        />
      </main>

      {/* MODAL */}
      <Modal
        isOpen={selectedPlayer !== null}
        onClose={handleCloseModal}
        player={selectedPlayer}
      />
    </div>
  );
}

export default App;