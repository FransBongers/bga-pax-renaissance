class PlayerTableau {
  private game: PaxRenaissanceGame;

  private tableauEast: LineStock<EmpireCard | TableauCard>;
  private tableauWest: LineStock<EmpireCard | TableauCard>;

  constructor({
    game,
    player,
  }: {
    game: PaxRenaissanceGame;
    player: PaxRenaissancePlayerData;
  }) {
    this.game = game;
    this.setup({ player });
  }

  private setup({ player }: { player: PaxRenaissancePlayerData }) {
    document
      .getElementById(`pr_player_tableau_${player.id}`)
      .insertAdjacentHTML(
        "beforeend",
        tplPlayerTableauContent({
          player,
          // Not using format_string_recursive here as tkn_playerName requires players to be set up,
          // but this is during player setup
          title: _("${tkn_playerName}'s tableau").replace(
            "${tkn_playerName}",
            tplLogTokenPlayerName({
              name: player.name,
              color: player.color,
            })
          ),
        })
      );

    this.tableauEast = new LineStock(
      this.game.tableauCardManager,
      document.getElementById(`tableau_east_${player.id}`),
      { center: false, sort: sortFunction("state") }
    );
    this.tableauWest = new LineStock(
      this.game.tableauCardManager,
      document.getElementById(`tableau_west_${player.id}`),
      { center: false, sort: sortFunction("state") }
    );

    this.tableauEast.addCards(player.tableau.cards[EAST]);
    this.tableauWest.addCards(player.tableau.cards[WEST]);
    player.tableau.tokens.forEach((token) => {
      const { location } = token;
      const node = document.getElementById(`${location}_tokens`);
      if (!node) {
        return;
      }

      node.insertAdjacentHTML("beforeend", tplToken(token));
    });
  }

  public async addCard(card: EmpireCard | TableauCard) {
    console.log("location", card.location);
    if (card.location.split("_")[1] === EAST) {
      await this.tableauEast.addCard(card);
    } else {
      await this.tableauWest.addCard(card);
    }
  }
}
