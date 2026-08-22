import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchPlayer = async () => {
    if (!playerName.trim()) {
      setError("Entrez un nom de joueur.");
      return;
    }

    setLoading(true);
    setError("");
    setPlayer(null);

    try {
      const response = await fetch(
        `https://gameinfo.albiononline.com/api/gameinfo/search?q=${encodeURIComponent(
          playerName
        )}`
      );

      if (!response.ok) {
        throw new Error("Erreur API");
      }

      const data = await response.json();

      if (!data.players || data.players.length === 0) {
        setError("Aucun joueur trouvé.");
      } else {
        setPlayer(data.players[0]);
      }
    } catch (err) {
      setError("Impossible de contacter l'API Albion.");
    }

    setLoading(false);
  };

  return (
    <div className="dashboard">
      <header>
        <h1>⚔️ Albion Analytics</h1>
        <p>Analyse des joueurs Albion Online</p>
      </header>

      <main>
        <section className="search-box">
          <input
            type="text"
            placeholder="Entrez le nom d'un joueur..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchPlayer();
              }
            }}
          />

          <button onClick={searchPlayer}>
            {loading ? "Recherche..." : "Rechercher"}
          </button>
        </section>

        {error && <div className="error">{error}</div>}

        {player && (
          <section className="player-result">
            <h2>👤 {player.Name}</h2>

            <div className="cards">
              <div className="card">
                <h2>🆔 ID</h2>
                <p>{player.Id}</p>
              </div>

              <div className="card">
                <h2>👤 Nom</h2>
                <p>{player.Name}</p>
              </div>

              <div className="card">
                <h2>🏆 Kill Fame</h2>
                <p>{player.KillFame || 0}</p>
              </div>

              <div className="card">
                <h2>💀 Death Fame</h2>
                <p>{player.DeathFame || 0}</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
