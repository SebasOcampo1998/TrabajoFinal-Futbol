
import { useMemo } from 'react';
import Header from './components/Header';
import StatsPanel from './components/StatsPanel';
import { players } from './data/players';
import './App.css';

function App() {
  const stats = useMemo(() => {
    const total = players.length;

    const totalAges = players.reduce(
      (sum, player) => sum + player.age,
      0
    );

    const avgAge = total > 0
      ? (totalAges / total).toFixed(1)
      : 0;

    const topScorer = players.reduce(
      (best, player) => {
        if (!best || player.goals > best.goals) {
          return player;
        }

        return best;
      },
      null
    );

    return {
      total,
      avgAge,
      topScorer: topScorer?.name ?? 'Sin jugadores'
    };
  }, []);

  return (
    <div className="dashboard">
      <Header />

      <main className="dashboard__main">
        <StatsPanel stats={stats} />
      </main>
    </div>
  );
}

export default App;
