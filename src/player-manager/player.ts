//  .########..##..........###....##....##.########.########.
//  .##.....##.##.........##.##....##..##..##.......##.....##
//  .##.....##.##........##...##....####...##.......##.....##
//  .########..##.......##.....##....##....######...########.
//  .##........##.......#########....##....##.......##...##..
//  .##........##.......##.....##....##....##.......##....##.
//  .##........########.##.....##....##....########.##.....##

class PRPlayer {
  protected game: PaxRenaissanceGame;
  protected playerColor: string;
  private playerHexColor: string;
  protected playerId: number;
  private playerName: string;

  private player: PaxRenaissancePlayerData;

  constructor({ game, player }: { game: PaxRenaissanceGame; player: PaxRenaissancePlayerData }) {
    // console.log("Player", player);
    this.game = game;
    const playerId = player.id;
    this.playerId = Number(playerId);
    this.player = player;
    this.playerName = player.name;
    this.playerColor = player.color;
    this.playerHexColor = player.hexColor;
    const gamedatas = game.gamedatas;

    // if (this.playerId === this.game.getPlayerId()) {
    //   dojo.place(tplPlayerHand({ playerId: this.playerId, playerName: this.playerName }), 'pp_player_tableaus', 1);
    // }

    this.setupPlayer({ gamedatas });
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  updatePlayer({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {


  }

  // Setup functions
  setupPlayer({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    const playerGamedatas = gamedatas.players[this.playerId];
    this.setupPlayerTableau({playerGamedatas})
    this.setupPlayerPanel({ playerGamedatas });

  }

  setupPlayerPanel({ playerGamedatas }: { playerGamedatas: BgaPlayer }) {

    this.updatePlayerPanel({ playerGamedatas });
  }

  setupPlayerTableau({ playerGamedatas }: { playerGamedatas: BgaPlayer }) {
    document
    .getElementById(`pr_player_tableau_${this.playerId}`)
    .insertAdjacentHTML("beforeend", tplPlayerTableauContent({playerGamedatas}));
  }

  updatePlayerPanel({ playerGamedatas }: { playerGamedatas: BgaPlayer }) {

    if (this.game.framework().scoreCtrl?.[this.playerId]) {
      this.game.framework().scoreCtrl[this.playerId].setValue(Number(playerGamedatas.score));
    }

  }

  clearInterface() {

  }

  // ..######...########.########.########.########.########...######.
  // .##....##..##..........##.......##....##.......##.....##.##....##
  // .##........##..........##.......##....##.......##.....##.##......
  // .##...####.######......##.......##....######...########...######.
  // .##....##..##..........##.......##....##.......##...##.........##
  // .##....##..##..........##.......##....##.......##....##..##....##
  // ..######...########....##.......##....########.##.....##..######.

  // ..######..########.########.########.########.########...######.
  // .##....##.##..........##.......##....##.......##.....##.##....##
  // .##.......##..........##.......##....##.......##.....##.##......
  // ..######..######......##.......##....######...########...######.
  // .......##.##..........##.......##....##.......##...##.........##
  // .##....##.##..........##.......##....##.......##....##..##....##
  // ..######..########....##.......##....########.##.....##..######.

  getColor(): string {
    return this.playerColor;
  }

  getHexColor(): string {
    return this.playerHexColor;
  }

  getName(): string {
    return this.playerName;
  }

  getPlayerId(): number {
    return this.playerId;
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  // ....###.....######..########.####..#######..##....##..######.
  // ...##.##...##....##....##.....##..##.....##.###...##.##....##
  // ..##...##..##..........##.....##..##.....##.####..##.##......
  // .##.....##.##..........##.....##..##.....##.##.##.##..######.
  // .#########.##..........##.....##..##.....##.##..####.......##
  // .##.....##.##....##....##.....##..##.....##.##...###.##....##
  // .##.....##..######.....##....####..#######..##....##..######.

}
