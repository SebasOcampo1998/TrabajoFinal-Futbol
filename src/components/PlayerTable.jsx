
import PlayerRow from './PlayerRow';
import '../styles/PlayerTable.css';

function PlayerTable({
  players,
  onRowClick,
  onSort,
  sortConfig = { key: null, direction: 'none' },
  favorites = [],
  onToggleFavorite,
  rowColors = 'none'
}) {
  const columns = [
    { key: 'number', label: 'Número' },
    { key: 'name', label: 'Jugador' },
    { key: 'position', label: 'Posición' },
    { key: 'club', label: 'Club' },
    { key: 'country', label: 'País' },
    { key: 'age', label: 'Edad' },
    { key: 'goals', label: 'Goles' },
    { key: 'assists', label: 'Asistencias' }
  ];

  function getSortIndicator(key) {
    if (sortConfig.key !== key) {
      return '';
    }

    if (sortConfig.direction === 'asc') {
      return ' ↑';
    }

    if (sortConfig.direction === 'desc') {
      return ' ↓';
    }

    return '';
  }

  return (
    <section className="player-table">
      <h2 className="player-table__title">
        Plantilla de Jugadores
      </h2>

      <div className="player-table__scroll">
        <table className="player-table__table">
          <thead>
            <tr>
              <th className="player-table__heading">
                Fav
              </th>

              {columns.map((column) => (
                <th
                  key={column.key}
                  className="player-table__heading"
                  aria-sort={
                    sortConfig.key === column.key
                      ? sortConfig.direction === 'asc'
                        ? 'ascending'
                        : sortConfig.direction === 'desc'
                          ? 'descending'
                          : 'none'
                      : 'none'
                  }
                >
                  <button
                    type="button"
                    className="player-table__sort"
                    onClick={() => onSort?.(column.key)}
                  >
                    {column.label}
                    {getSortIndicator(column.key)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {players.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="player-table__empty"
                >
                  No se encontraron jugadores.
                </td>
              </tr>
            ) : (
              players.map((player, index) => {
                const isFavorite = favorites.includes(player.id);

                let colorClass = '';

                if (
                  rowColors === 'pares' &&
                  (index + 1) % 2 === 0
                ) {
                  colorClass = 'player-table__row--even';
                }

                if (
                  rowColors === 'impares' &&
                  (index + 1) % 2 !== 0
                ) {
                  colorClass = 'player-table__row--odd';
                }

                return (
                  <PlayerRow
                    key={player.id}
                    player={player}
                    onClick={onRowClick}
                    isFavorite={isFavorite}
                    onToggleFavorite={onToggleFavorite}
                    colorClass={colorClass}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PlayerTable;
