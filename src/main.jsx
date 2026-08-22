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
        `/api/player?name=${encodeURIComponent(playerName)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur API");
      }

      setPlayer(data.player);
      console.log("DONNEES ALBION :", data.player);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 const formatNumber = (number) => {
  const value = Number(number);

  if (!Number.isFinite(value)) {
    return "0";
  }

  return value.toLocaleString("fr-FR");
};
  return (
    <div className="dashboard">

      <header>
        <h1>⚔️ Albion Analytics</h1>
        <p>Analyse avancée des joueurs Albion Online</p>
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

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {player && (

          <section className="player-result">

            <div className="player-header">
              <h2>👤 {player.Name}</h2>

              <span>
                ID : {player.Id}
              </span>
            </div>

            <div className="cards">

              <div className="card">
                <h2>⚔️ Combat Fame</h2>
                <p>
                  {formatNumber(
                    player.LifetimeStatistics?.PvE?.Total
                  )}
                </p>
              </div>

              <div className="card">
                <h2>🏆 PvP Fame</h2>
                <p>
                  {formatNumber(
                    player.LifetimeStatistics?.PvP?.Fame
                  )}
                </p>
              </div>

              <div className="card">
                <h2>💀 Death Fame</h2>
                <p>
                  {formatNumber(
                    player.LifetimeStatistics?.PvP?.DeathFame
                  )}
                </p>
              </div>

              <div className="card">
                <h2>⛏️ Gathering Fame</h2>
                <p>
                  {formatNumber(
                    player.LifetimeStatistics?.Gathering?.All
                  )}
                </p>
              </div>

            </div>

            <div className="info-panel">

              <h2>👥 Informations</h2>

              <p>
                <strong>Guilde :</strong>{" "}
                {player.GuildName || "Sans guilde"}
              </p>

              <p>
                <strong>Alliance :</strong>{" "}
                {player.AllianceName || "Aucune"}
              </p>

              <p>
                <strong>Nom :</strong>{" "}
                {player.Name}
              </p>

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
