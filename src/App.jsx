
import { useState, useEffect, useMemo } from 'react';

import Header from './components/Header';
import StatsPanel from './components/StatsPanel';
import SearchBar from './components/SearchBar';

import { players } from './data/players';

import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredPlayers = useMemo(() => {
    return players.filter((player) =>
      player.name
        .toLowerCase()
        .includes(debouncedSearch.trim().toLowerCase())
    );
  }, [debouncedSearch]);

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

  function clearSearch() {
    setSearchTerm('');
    setDebouncedSearch('');
  }

  return (
    <div className="dashboard">
      <Header />

      <main className="dashboard__main">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={clearSearch}
          resultsCount={filteredPlayers.length}
        />

        <StatsPanel stats={stats} />
      </main>
    </div>
  );
}

export default App;
