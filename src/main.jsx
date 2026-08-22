import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

function App() {
  return (
    <div className="dashboard">
      <header>
        <h1>⚔️ Albion Analytics</h1>
        <p>Dashboard Albion Online</p>
      </header>

      <main>
        <section className="search-box">
          <input
            type="text"
            placeholder="Entrez le nom d'un joueur..."
          />
          <button>Rechercher</button>
        </section>

        <section className="cards">
          <div className="card">
            <h2>👤 Joueur</h2>
            <p>---</p>
          </div>

          <div className="card">
            <h2>⚔️ Kills</h2>
            <p>0</p>
          </div>

          <div className="card">
            <h2>💀 Deaths</h2>
            <p>0</p>
          </div>

          <div className="card">
            <h2>💰 Argent</h2>
            <p>0 Silver</p>
          </div>
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
