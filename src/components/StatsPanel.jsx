import '../styles/StatsPanel.css';

function StatsPanel({ stats }) {
  return (
    <section className="stats">
      <h2 className="stats__title">
        Estadísticas de jugadores
      </h2>

      <div className="stats__grid">
        <article className="stats__card">
          <h3>Total de jugadores</h3>
          <p>{stats.total}</p>
        </article>

        <article className="stats__card">
          <h3>Promedio de edad</h3>
          <p>{stats.avgAge}</p>
        </article>

        <article className="stats__card">
          <h3>Máximo goleador</h3>
          <p>{stats.topScorer}</p>
        </article>
      </div>
    </section>
  );
}

export default StatsPanel;