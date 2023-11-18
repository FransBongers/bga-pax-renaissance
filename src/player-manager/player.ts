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
  public counters: {
    cardsWest?: IconCounter;
    cardsEast?:IconCounter;
    florins?: IconCounter;
  }

  constructor({ game, player }: { game: PaxRenaissanceGame; player: PaxRenaissancePlayerData }) {
    // console.log("Player", player);
    this.game = game;
    const playerId = player.id;
    this.playerId = Number(playerId);
    this.player = player;
    this.playerName = player.name;
    this.playerColor = player.color;
    // this.playerHexColor = player.hexColor;
    const gamedatas = game.gamedatas;

    // if (this.playerId === this.game.getPlayerId()) {
    //   dojo.place(tplPlayerHand({ playerId: this.playerId, playerName: this.playerName }), 'pp_player_tableaus', 1);
    // }

    this.setupPlayer({ gamedatas, player });
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
  setupPlayer({ gamedatas, player }: { gamedatas: PaxRenaissanceGamedatas; player: PaxRenaissancePlayerData }) {
    const playerGamedatas = gamedatas.players[this.playerId];
    this.setupPlayerTableau({playerGamedatas})
    this.setupPlayerPanel({ playerGamedatas, player });

  }

  setupPlayerPanel({ playerGamedatas, player }: { playerGamedatas: BgaPlayer; player: PaxRenaissancePlayerData }) {
    const playerBoardDiv: HTMLElement = $('player_board_' + this.playerId);
    playerBoardDiv.insertAdjacentHTML('beforeend', tplPlayerPanel({playerId: this.playerId}));
    const node = document.getElementById(`pr_player_panel_${this.playerId}`);

    this.counters = {
      cardsWest: new IconCounter({containerId: `pr_player_panel_icons_${this.playerId}`, extraIconClasses: 'pr_card_back_icon', icon: 'west_back', iconCounterId: `pr_cards_west_counter_${this.playerId}`, initialValue: 0}),
      cardsEast: new IconCounter({containerId: `pr_player_panel_icons_${this.playerId}`, extraIconClasses: 'pr_card_back_icon', icon: 'east_back', iconCounterId: `pr_cards_east_counter_${this.playerId}`, initialValue: 0}),
      florins: new IconCounter({containerId: `pr_player_panel_icons_${this.playerId}`, icon: 'florin', iconCounterId: `pr_florins_counter_${this.playerId}`, initialValue: player.florins}),
    };

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
