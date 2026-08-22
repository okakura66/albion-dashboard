export default async function handler(req, res) {
  try {
    const name = req.query.name;

    if (!name) {
      return res.status(400).json({
        error: "Nom du joueur manquant"
      });
    }

    const url =
      "https://gameinfo-ams.albiononline.com/api/gameinfo/search?q=" +
      encodeURIComponent(name);

    const response = await fetch(url);

    const text = await response.text();

    console.log("Albion response:", response.status, text);

    if (!response.ok) {
      return res.status(502).json({
        error: "Albion API error",
        status: response.status,
        details: text.substring(0, 500)
      });
    }

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return res.status(502).json({
        error: "Albion n'a pas renvoyé du JSON",
        details: text.substring(0, 500)
      });
    }

    if (!data.players || data.players.length === 0) {
      return res.status(404).json({
        error: "Joueur introuvable",
        players: []
      });
    }

    const playerId = data.players[0].Id;

    const playerUrl =
      "https://gameinfo-ams.albiononline.com/api/gameinfo/players/" +
      encodeURIComponent(playerId);

    const playerResponse = await fetch(playerUrl);

    const playerText = await playerResponse.text();

    if (!playerResponse.ok) {
      return res.status(502).json({
        error: "Impossible de récupérer le profil",
        status: playerResponse.status,
        details: playerText.substring(0, 500)
      });
    }

    let playerData;

    try {
      playerData = JSON.parse(playerText);
    } catch {
      return res.status(502).json({
        error: "Le profil Albion n'a pas renvoyé du JSON",
        details: playerText.substring(0, 500)
      });
    }

    return res.status(200).json({
      player: playerData,
      results: data.players
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message
    });
  }
}
