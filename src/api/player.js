export default async function handler(req, res) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({
      error: "Nom du joueur manquant"
    });
  }

  try {
    const response = await fetch(
      `https://gameinfo.albiononline.com/api/gameinfo/search?q=${encodeURIComponent(name)}`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Erreur API Albion"
      });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Impossible de contacter Albion Online"
    });
  }
}
