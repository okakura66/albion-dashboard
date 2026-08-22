export default async function handler(req, res) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({
      error: "Nom du joueur manquant"
    });
  }

  try {
    const response = await fetch(
      `https://gameinfo-ams.albiononline.com/api/gameinfo/search?q=${encodeURIComponent(name)}`
    );

    if (!response.ok) {
      return res.status(502).json({
        error: "Albion API inaccessible",
        status: response.status
      });
    }

    const data = await response.json();

    if (!data.players || data.players.length === 0) {
      return res.status(404).json({
        error: "Joueur introuvable"
      });
    }

    const playerId = data.players[0].Id;

    const playerResponse = await fetch(
      `https://gameinfo-ams.albiononline.com/api/gameinfo/players/${playerId}`
    );

    if (!playerResponse.ok) {
      return res.status(502).json({
        error: "Profil joueur inaccessible"
      });
    }

    const player = await playerResponse.json();

    return res.status(200).json({
      player,
      results: data.players
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message
    });
  }
}
