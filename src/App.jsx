
import { useEffect, useMemo, useState } from 'react';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import StatsPanel from './components/StatsPanel';
import PlayerTable from './components/PlayerTable';
import Pagination from './components/Pagination';
import Modal from './components/Modal';

import { players } from './data/players';

import './App.css';

// FUNCION PARA ACTUALIZAR EL HISTORIAL
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

  // 3. ESTADO DE COLOREO
  const [rowColors, setRowColors] = useState('none');

  // 4. ESTADOS DE PAGINACION
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // 5. ESTADOS DE FAVORITOS
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

  // 6. ESTADO DEL MODAL
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

  // 8. DEBOUNCE DE 300 MILISEGUNDOS
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

  // 9. GUARDAR FAVORITOS EN LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem(
      'favorites',
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // 10. GUARDAR HISTORIAL EN LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem(
      'searchHistory',
      JSON.stringify(searchHistory)
    );
  }, [searchHistory]);

  // 11. FILTRAR POR NOMBRE Y FAVORITOS
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

  // 12. ORDENAR JUGADORES
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

  // 13. ESTADISTICAS CON USEMEMO
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

  // 14. TOTAL DE PAGINAS
  const totalPages = Math.max(
    1,
    Math.ceil(sortedPlayers.length / itemsPerPage)
  );

  // 15. PAGINA ACTUAL SEGURA
  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  // 16. JUGADORES DE LA PAGINA ACTUAL
  const paginatedPlayers = useMemo(() => {
    const start =
      (safeCurrentPage - 1) * itemsPerPage;

    const end = start + itemsPerPage;

    return sortedPlayers.slice(start, end);
  }, [
    sortedPlayers,
    safeCurrentPage,
    itemsPerPage
  ]);

  // 17. ORDENAMIENTO DE COLUMNAS
  function handleSort(key) {
    setSortConfig((previous) => {
      if (previous.key !== key) {
        return {
          key,
          direction: 'asc'
        };
      }

      if (previous.direction === 'asc') {
        return {
          key,
          direction: 'desc'
        };
      }

      return {
        key: null,
        direction: 'none'
      };
    });

    setCurrentPage(1);
  }

  // 18. ACTUALIZAR BUSQUEDA
  function handleSearchChange(value) {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  // 19. LIMPIAR BUSQUEDA
  function clearSearch() {
    setSearchTerm('');
    setDebouncedSearch('');
    setCurrentPage(1);
  }

  // 20. CAMBIAR CANTIDAD DE REGISTROS
  function handleItemsPerPageChange(value) {
    setItemsPerPage(value);
    setCurrentPage(1);
  }

  // 21. AGREGAR O QUITAR FAVORITOS
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

  // 22. MOSTRAR SOLO FAVORITOS
  function handleFavoritesFilter(checked) {
    setShowOnlyFavorites(checked);
    setCurrentPage(1);
  }

  // 23. RECUPERAR UNA BUSQUEDA ANTERIOR
  function handleSelectSearch(term) {
    setSearchTerm(term);
    setDebouncedSearch(term);
    setCurrentPage(1);

    setSearchHistory((previous) =>
      updateSearchHistory(previous, term)
    );
  }

  // 24. LIMPIAR HISTORIAL
  function handleClearHistory() {
    setSearchHistory([]);
  }

  // 25. CERRAR MODAL
  function handleCloseModal() {
    setSelectedPlayer(null);
  }

  return (
    <div className="dashboard">
      {/* ENCABEZADO */}
      <Header />

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

        {/* PANEL DE ESTADISTICAS */}
        <StatsPanel stats={stats} />

        {/* CONTROLES DE FAVORITOS */}
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

        {/* BOTONES PARA COLOREAR FILAS */}
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

        {/* TABLA DE JUGADORES */}
        <PlayerTable
          players={paginatedPlayers}
          onRowClick={setSelectedPlayer}
          onSort={handleSort}
          sortConfig={sortConfig}
          rowColors={rowColors}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* PAGINACION DINAMICA */}
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalItems={sortedPlayers.length}
        />
      </main>

      {/* MODAL DE DETALLES */}
      <Modal
        isOpen={selectedPlayer !== null}
        onClose={handleCloseModal}
        player={selectedPlayer}
      />
    </div>
  );
}

export default App;
