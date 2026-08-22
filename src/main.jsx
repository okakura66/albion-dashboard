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

      if (!data.player) {
        throw new Error("Joueur introuvable.");
      }

      setPlayer(data.player);

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

  const gathering = player?.LifetimeStatistics?.Gathering;

  return (
    <div className="dashboard">

      <header>
        <h1>⚔️ Albion Analytics</h1>
        <p>Analyse avancée des joueurs Albion Online</p>
      </header>

      <main>

        {/* RECHERCHE */}

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

          <button
            onClick={searchPlayer}
            disabled={loading}
          >
            {loading ? "Recherche..." : "Rechercher"}
          </button>

        </section>

        {/* ERREUR */}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {/* JOUEUR */}

        {player && (

          <section className="player-result">

            {/* IDENTITÉ */}

            <div className="player-header">

              <div>
                <h2>👤 {player.Name}</h2>

                <p>
                  ID : {player.Id}
                </p>
              </div>

              <div>
                <strong>
                  👥 {player.GuildName || "Sans guilde"}
                </strong>

                <p>
                  🤝 {player.AllianceName || "Aucune alliance"}
                </p>
              </div>

            </div>


            {/* STATISTIQUES PRINCIPALES */}

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
                <h2>🏆 Kill Fame</h2>

                <p>
                  {formatNumber(
                    player.KillFame
                  )}
                </p>
              </div>


              <div className="card">
                <h2>💀 Death Fame</h2>

                <p>
                  {formatNumber(
                    player.DeathFame
                  )}
                </p>
              </div>


              <div className="card">
                <h2>⛏️ Gathering Fame</h2>

                <p>
                  {formatNumber(
                    gathering?.All?.Total
                  )}
                </p>
              </div>

            </div>


            {/* GATHERING */}

            <section className="info-panel">

              <h2>⛏️ Gathering</h2>

              <div className="gathering-grid">

                <div>
                  🌿 Fiber
                  <strong>
                    {formatNumber(gathering?.Fiber?.Total)}
                  </strong>
                </div>

                <div>
                  🐗 Hide
                  <strong>
                    {formatNumber(gathering?.Hide?.Total)}
                  </strong>
                </div>

                <div>
                  ⛏️ Ore
                  <strong>
                    {formatNumber(gathering?.Ore?.Total)}
                  </strong>
                </div>

                <div>
                  🪨 Rock
                  <strong>
                    {formatNumber(gathering?.Rock?.Total)}
                  </strong>
                </div>

                <div>
                  🌲 Wood
                  <strong>
                    {formatNumber(gathering?.Wood?.Total)}
                  </strong>
                </div>

                <div>
                  🎣 Fishing
                  <strong>
                    {formatNumber(
                      player.LifetimeStatistics?.FishingFame
                    )}
                  </strong>
                </div>

                <div>
                  🔨 Crafting
                  <strong>
                    {formatNumber(
                      player.LifetimeStatistics?.Crafting?.Total
                    )}
                  </strong>
                </div>

                <div>
                  📊 Total
                  <strong>
                    {formatNumber(gathering?.All?.Total)}
                  </strong>
                </div>

              </div>

            </section>


            {/* PVE */}

            <section className="info-panel">

              <h2>⚔️ Combat / PvE</h2>

              <div className="gathering-grid">

                <div>
                  🏰 Royal
                  <strong>
                    {formatNumber(
                      player.LifetimeStatistics?.PvE?.Royal
                    )}
                  </strong>
                </div>

                <div>
                  🌍 Outlands
                  <strong>
                    {formatNumber(
                      player.LifetimeStatistics?.PvE?.Outlands
                    )}
                  </strong>
                </div>

                <div>
                  🌫️ Mists
                  <strong>
                    {formatNumber(
                      player.LifetimeStatistics?.PvE?.Mists
                    )}
                  </strong>
                </div>

                <div>
                  🔥 Hellgate
                  <strong>
                    {formatNumber(
                      player.LifetimeStatistics?.PvE?.Hellgate
                    )}
                  </strong>
                </div>

                <div>
                  ☠️ Corrupted Dungeon
                  <strong>
                    {formatNumber(
                      player.LifetimeStatistics?.PvE?.CorruptedDungeon
                    )}
                  </strong>
                </div>

                <div>
                  🌀 Avalon
                  <strong>
                    {formatNumber(
                      player.LifetimeStatistics?.PvE?.Avalon
                    )}
                  </strong>
                </div>

              </div>

            </section>


            {/* INFORMATIONS */}

            <section className="info-panel">

              <h2>👥 Informations du joueur</h2>

              <p>
                <strong>Nom :</strong> {player.Name}
              </p>

              <p>
                <strong>ID :</strong> {player.Id}
              </p>

              <p>
                <strong>Guilde :</strong>{" "}
                {player.GuildName || "Sans guilde"}
              </p>

              <p>
                <strong>Alliance :</strong>{" "}
                {player.AllianceName || "Aucune"}
              </p>

              <p>
                <strong>Kill Fame :</strong>{" "}
                {formatNumber(player.KillFame)}
              </p>

              <p>
                <strong>Death Fame :</strong>{" "}
                {formatNumber(player.DeathFame)}
              </p>

              <p>
                <strong>Ratio Fame :</strong>{" "}
                {player.FameRatio || 0}
              </p>

            </section>

          </section>

        )}

      </main>

    </div>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
