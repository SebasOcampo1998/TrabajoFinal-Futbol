
function PlayerRow({
  player,
  onClick,
  isFavorite = false,
  onToggleFavorite,
  colorClass = ''
}) {
  return (
    <tr
      className={`player-table__row ${colorClass}`}
      onClick={() => onClick?.(player)}
    >
      <td className="player-table__cell">
        <button
          type="button"
          className="player-table__favorite"
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite?.(player.id);
          }}
          aria-label={`Favorito: ${player.name}`}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </td>

      <td className="player-table__cell">
        {player.number}
      </td>

      <td className="player-table__cell player-table__cell--name">
        {player.name}
      </td>

      <td className="player-table__cell">
        {player.position}
      </td>

      <td className="player-table__cell">
        {player.club}
      </td>

      <td className="player-table__cell">
        {player.country}
      </td>

      <td className="player-table__cell">
        {player.age}
      </td>

      <td className="player-table__cell">
        {player.goals}
      </td>

      <td className="player-table__cell">
        {player.assists}
      </td>
    </tr>
  );
}

export default PlayerRow;
