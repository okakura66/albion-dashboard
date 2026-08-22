import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const demo = {
  player: "Okakura",
  guild: "Demo Guild",
  alliance: "—",
  fame: "18.4M",
  kills: "1,284",
  deaths: "347",
  kd: "3.70",
  pvpFame: "12.8M"
};

function App() {
  const [region, setRegion] = useState("Europe");
  const [name, setName] = useState("Okakura");
  const [player, setPlayer] = useState(demo);
  const [loading, setLoading] = useState(false);

  function searchPlayer() {
    setLoading(true);

    setTimeout(() => {
      setPlayer({
        ...demo,
        player: name || "Okakura"
      });

      setLoading(false);
    }, 500);
  }

  return (
    <div className="app">

      <header>
        <div className="logo">
          ⚔️ ALBION <span>ANALYTICS</span>
        </div>

        <div className="badge">
          FREE • V1
        </div>
      </header>

      <main>

        <section className="hero">

          <div>
            <div className="eyebrow">
              PLAYER INTELLIGENCE
            </div>

            <h1>
              Albion Online Dashboard
            </h1>

            <p>
              Analyse ton personnage, ton PvP et ta progression.
            </p>
          </div>

          <div className="controls">

            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option>Europe</option>
              <option>Americas</option>
              <option>Asia</option>
            </select>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom du joueur"
            />

            <button onClick={searchPlayer}>
              {loading ? "Recherche..." : "SEARCH"}
            </button>

          </div>

        </section>


        <section className="profile card">

          <div className="avatar">
            ⚔️
          </div>

          <div>

            <h2>
              {player.player}
            </h2>

            <p>
              {player.guild} · Alliance {player.alliance}
            </p>

            <small>
              Serveur : {region}
            </small>

          </div>

        </section>


        <section className="stats">

          <Stat icon="⭐" title="Fame totale" value={player.fame} />

          <Stat icon="⚔️" title="Kills" value={player.kills} />

          <Stat icon="💀" title="Deaths" value={player.deaths} />

          <Stat icon="📊" title="K/D" value={player.kd} />

          <Stat icon="🔥" title="PvP Fame" value={player.pvpFame} />

        </section>


        <section className="columns">

          <div className="card panel">

            <div className="title">
              <h3>📈 Progression</h3>
              <span>30 jours</span>
            </div>

            <div className="chart">
              <div className="chart-line"></div>
            </div>

            <p className="muted">
              L'historique réel sera connecté à l'API Albion dans la prochaine étape.
            </p>

          </div>


          <div className="card panel">

            <div className="title">
              <h3>⚔️ Derniers combats</h3>
              <span>READY</span>
            </div>

            <Fight
              result="🟢 Victory"
              player="Player123"
              fame="+125,400"
            />

            <Fight
              result="🔴 Death"
              player="Player456"
              fame="-84,200"
            />

            <Fight
              result="🟢 Victory"
              player="Player789"
              fame="+42,100"
            />

            <Fight
              result="🟢 Victory"
              player="Player321"
              fame="+31,600"
            />

          </div>

        </section>


        <section className="card roadmap">

          <h3>
            🚀 Fonctionnalités prévues
          </h3>

          <div className="chips">
            <span>API Albion</span>
            <span>Killboard</span>
            <span>Guildes</span>
            <span>Market</span>
            <span>Historique</span>
            <span>Classements</span>
          </div>

        </section>

      </main>

      <footer>
        Albion Analytics • Prototype communautaire
      </footer>

    </div>
  );
}


function Stat({ icon, title, value }) {
  return (
    <div className="stat card">

      <div className="icon">
        {icon}
      </div>

      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>

    </div>
  );
}


function Fight({ result, player, fame }) {
  return (
    <div className="fight">

      <b>{result}</b>

      <span>{player}</span>

      <strong>{fame}</strong>

    </div>
  );
}


createRoot(
  document.getElementById("root")
).render(
  <App />
);
