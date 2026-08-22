export default async function handler(req, res) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({
      error: "Nom du joueur manquant"
    });
  }

  try {
    // Albion Europe
    const searchUrl =
      `https://gameinfo-ams.albiononline.com/api/gameinfo/search?q=${encodeURIComponent(name)}`;

    const searchResponse = await fetch(searchUrl);

    if (!searchResponse.ok) {
      throw new Error(`Search API error: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();

    if (!searchData.players || searchData.players.length === 0) {
      return res.status(404).json({
        error: "Joueur introuvable",
        players: []
      });
    }

    // Premier joueur trouvé
    const playerId = searchData.players[0].Id;

    // Récupération des informations détaillées
    const playerUrl =
      `https://gameinfo-ams.albiononline.com/api/gameinfo/players/${playerId}`;

    const playerResponse = await fetch(playerUrl);

    if (!playerResponse.ok) {
      throw new Error(`Player API error: ${playerResponse.status}`);
    }

    const playerData = await playerResponse.json();

    return res.status(200).json({
      player: playerData,
      results: searchData.players
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erreur lors de la connexion à Albion",
      details: error.message
    });
  }
}
