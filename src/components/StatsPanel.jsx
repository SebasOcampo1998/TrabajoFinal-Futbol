import '../styles/StatsPanel.css';

function StatsPanel({ stats }) {
  const positions = Object.entries(stats.positions ?? {});

  const maxPosition = Math.max(
    ...positions.map(([, count]) => count),
    1
  );

  return (
    <section className="stats">
      <h2 className="stats__title">
        Estadísticas de jugadores
      </h2>

      <div className="stats__grid">
        <article className="stats__card">
          <h3 className="stats__card-title">
            Total de jugadores
          </h3>
          <p className="stats__card-value">
            {stats.total}
          </p>
        </article>

        <article className="stats__card">
          <h3 className="stats__card-title">
            Promedio de edad
          </h3>
          <p className="stats__card-value">
            {stats.avgAge}
          </p>
        </article>

        <article className="stats__card">
          <h3 className="stats__card-title">
            Máximo goleador
          </h3>
          <p className="stats__card-value">
            {stats.topScorer}
          </p>
        </article>
      </div>

      <div className="stats__distribution">
        <h3 className="stats__distribution-title">
          Distribución por posición
        </h3>

        {positions.length === 0 ? (
          <p className="stats__empty">
            No hay jugadores para mostrar.
          </p>
        ) : (
          positions.map(([position, count]) => (
            <div
              className="stats__position"
              key={position}
            >
              <div className="stats__position-info">
                <span>{position}</span>
                <span>{count} jugadores</span>
              </div>

              <div className="stats__bar">
                <div
                  className="stats__bar-fill"
                  style={{
                    width: `${(count / maxPosition) * 100}%`
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default StatsPanel;