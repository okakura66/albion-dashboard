export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      error: "ID du joueur manquant"
    });
  }

  try {
    const url =
      `https://gameinfo-ams.albiononline.com/api/gameinfo/players/${encodeURIComponent(id)}/kills`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(502).json({
        error: "Killboard Albion inaccessible",
        status: response.status
      });
    }

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message
    });
  }
}
