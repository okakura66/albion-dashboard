export default {
  async fetch(request) {
    const url = new URL(request.url);
    const name = url.searchParams.get("name");

    if (!name) {
      return Response.json(
        { error: "Nom du joueur manquant" },
        { status: 400 }
      );
    }

    try {
      const albionUrl =
        "https://gameinfo-ams.albiononline.com/api/gameinfo/search?q=" +
        encodeURIComponent(name);

      const response = await fetch(albionUrl);

      if (!response.ok) {
        return Response.json(
          {
            error: "Albion API inaccessible",
            status: response.status
          },
          { status: 502 }
        );
      }

      const data = await response.json();

      if (!data.players || data.players.length === 0) {
        return Response.json(
          {
            error: "Joueur introuvable",
            players: []
          },
          { status: 404 }
        );
      }

      const playerId = data.players[0].Id;

      const playerResponse = await fetch(
        "https://gameinfo-ams.albiononline.com/api/gameinfo/players/" +
          encodeURIComponent(playerId)
      );

      if (!playerResponse.ok) {
        return Response.json(
          {
            error: "Profil joueur inaccessible",
            status: playerResponse.status
          },
          { status: 502 }
        );
      }

      const player = await playerResponse.json();

      return Response.json({
        player: player,
        results: data.players
      });

    } catch (error) {
      return Response.json(
        {
          error: "Erreur serveur",
          details: error.message
        },
        { status: 500 }
      );
    }
  }
};
