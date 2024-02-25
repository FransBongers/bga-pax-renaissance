//  .########..##..........###....##....##.########.########.
//  .##.....##.##.........##.##....##..##..##.......##.....##
//  .##.....##.##........##...##....####...##.......##.....##
//  .########..##.......##.....##....##....######...########.
//  .##........##.......#########....##....##.......##...##..
//  .##........##.......##.....##....##....##.......##....##.
//  .##........########.##.....##....##....########.##.....##

//  .##.....##....###....##....##....###.....######...########.########.
//  .###...###...##.##...###...##...##.##...##....##..##.......##.....##
//  .####.####..##...##..####..##..##...##..##........##.......##.....##
//  .##.###.##.##.....##.##.##.##.##.....##.##...####.######...########.
//  .##.....##.#########.##..####.#########.##....##..##.......##...##..
//  .##.....##.##.....##.##...###.##.....##.##....##..##.......##....##.
//  .##.....##.##.....##.##....##.##.....##..######...########.##.....##

class PlayerManager {
  private game: PaxRenaissanceGame;
  private players: Record<number, PRPlayer>;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
    this.players = {};

    this.setupPlayerTableaux({
      playerOrder: game.playerOrder.map((playerId: string | number) =>
        Number(playerId)
      ),
    });

    for (const playerId in game.gamedatas.players) {
      const player = game.gamedatas.players[playerId];
      this.players[playerId] = new PRPlayer({ player, game: this.game });
    }
  }

  setupPlayerTableaux({ playerOrder }: { playerOrder: number[] }) {
    document
      .getElementById("pr_play_area_container")
      .insertAdjacentHTML(
        "beforeend",
        tplPlayerTableauxContainer({ playerOrder })
      );
    const cardsInTableauScale = this.game.settings.get({
      id: CARD_SIZE_IN_TABLEAU,
    });
    const node = document.getElementById("pr_player_tableaux");
    if (node) {
      node.style.setProperty(
        "--paxRenCardInTableauScale",
        `${Number(cardsInTableauScale) / 100}`
      );
    }
  }

  anyPlayerHasActiveAbility(props: { ability: string }): boolean {
    return this.getPlayers().some((player) => player.hasActiveAbility(props));
  }

  getPlayer({ playerId }: { playerId: number }): PRPlayer {
    return this.players[playerId];
  }

  getPlayers(): PRPlayer[] {
    return Object.values(this.players);
  }

  getPlayerForBank({bank}: {bank: string;}): PRPlayer {
    return this.getPlayers().find((player) => player.getBank() === bank);
  }

  getPlayerIds(): number[] {
    return Object.keys(this.players).map(Number);
  }

  updatePlayers({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    for (const playerId in gamedatas.players) {
      this.players[playerId].updatePlayer({ gamedatas });
    }
  }

  updateCardTooltips() {
    this.getPlayers().forEach((player) => {
      player.updateCardTooltips();
    });
  }

  clearInterface() {
    Object.keys(this.players).forEach((playerId) => {
      this.players[playerId].clearInterface();
    });
  }
}
