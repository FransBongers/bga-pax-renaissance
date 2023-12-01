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
    prestigeCatholic: IconCounter;
    prestigeIslamic: IconCounter;
    prestigeReformist: IconCounter;
    prestigeLaw: IconCounter;
    prestigeDiscovery: IconCounter;
    prestigePatron: IconCounter;
    cardsWest?: IconCounter;
    cardsEast?: IconCounter;
    florins?: IconCounter;
  };
  private hand: LineStock<TableauCard>;

  constructor({
    game,
    player,
  }: {
    game: PaxRenaissanceGame;
    player: PaxRenaissancePlayerData;
  }) {
    // console.log("Player", player);
    this.game = game;
    const playerId = player.id;
    this.playerId = Number(playerId);
    this.player = player;
    this.playerName = player.name;
    this.playerColor = COLOR_MAP[player.color];
    this.playerHexColor = player.color;
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

  updatePlayer({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {}

  private setupHand({
    gamedatas,
    player,
  }: {
    gamedatas: PaxRenaissanceGamedatas;
    player: PaxRenaissancePlayerData;
  }) {
    this.counters.cardsEast.setValue(player.hand.counts.east);
    this.counters.cardsWest.setValue(player.hand.counts.west);
    if (this.playerId === this.game.getPlayerId()) {
      
      this.game.hand.getStock().addCards(player.hand.cards);
    }
  }

  // Setup functions
  setupPlayer({
    gamedatas,
    player,
  }: {
    gamedatas: PaxRenaissanceGamedatas;
    player: PaxRenaissancePlayerData;
  }) {
    const playerGamedatas = gamedatas.players[this.playerId];
    this.setupPlayerTableau({ playerGamedatas });
    this.setupPlayerPanel({ playerGamedatas, player });
    this.setupHand({ gamedatas, player });
  }

  setupPlayerPanel({
    playerGamedatas,
    player,
  }: {
    playerGamedatas: BgaPlayer;
    player: PaxRenaissancePlayerData;
  }) {
    const playerBoardDiv: HTMLElement = $("player_board_" + this.playerId);
    playerBoardDiv.insertAdjacentHTML(
      "beforeend",
      tplPlayerPanel({ playerId: this.playerId })
    );
    // const node = document.getElementById(`pr_player_panel_${this.playerId}`);

    this.counters = {
      prestigeCatholic: new IconCounter({
        containerId: `pr_player_panel_icons_${this.playerId}`,
        extraIconClasses: "pr_prestige_icon",
        icon: "prestige_catholic",
        iconCounterId: `pr_prestige_catholic_counter_${this.playerId}`,
        initialValue: 0,
      }),
      prestigeIslamic: new IconCounter({
        containerId: `pr_player_panel_icons_${this.playerId}`,
        extraIconClasses: "pr_prestige_icon",
        icon: "prestige_islamic",
        iconCounterId: `pr_prestige_islamic_counter_${this.playerId}`,
        initialValue: 0,
      }),
      prestigeReformist: new IconCounter({
        containerId: `pr_player_panel_icons_${this.playerId}`,
        extraIconClasses: "pr_prestige_icon",
        icon: "prestige_reformist",
        iconCounterId: `pr_prestige_reformist_counter_${this.playerId}`,
        initialValue: 0,
      }),
      cardsWest: new IconCounter({
        containerId: `pr_player_panel_icons_${this.playerId}`,
        extraIconClasses: "pr_card_back_icon",
        icon: "west_back",
        iconCounterId: `pr_cards_west_counter_${this.playerId}`,
        initialValue: 0,
      }),
      prestigeLaw: new IconCounter({
        containerId: `pr_player_panel_icons_${this.playerId}`,
        extraIconClasses: "pr_prestige_icon",
        icon: "prestige_law",
        iconCounterId: `pr_prestige_law_counter_${this.playerId}`,
        initialValue: 0,
      }),
      prestigeDiscovery: new IconCounter({
        containerId: `pr_player_panel_icons_${this.playerId}`,
        extraIconClasses: "pr_prestige_icon",
        icon: "prestige_discovery",
        iconCounterId: `pr_prestige_discovery_counter_${this.playerId}`,
        initialValue: 0,
      }),
      prestigePatron: new IconCounter({
        containerId: `pr_player_panel_icons_${this.playerId}`,
        extraIconClasses: "pr_prestige_icon",
        icon: "prestige_patron",
        iconCounterId: `pr_prestige_patron_counter_${this.playerId}`,
        initialValue: 0,
      }),
      cardsEast: new IconCounter({
        containerId: `pr_player_panel_icons_${this.playerId}`,
        extraIconClasses: "pr_card_back_icon",
        icon: "east_back",
        iconCounterId: `pr_cards_east_counter_${this.playerId}`,
        initialValue: 0,
      }),
      florins: new IconCounter({
        containerId: `pr_player_panel_icons_${this.playerId}`,
        icon: "florin",
        iconCounterId: `pr_florins_counter_${this.playerId}`,
        initialValue: player.florins,
      }),
    };

    if (COLORS_WITH_SHADOW.includes(this.getColor())) {
      const node = document.getElementById(`player_name_${this.playerId}`);
      if (node) {
        node.setAttribute("data-shadow", "true");
      }
    }

    this.updatePlayerPanel({ playerGamedatas });
  }

  setupPlayerTableau({ playerGamedatas }: { playerGamedatas: BgaPlayer }) {
    document
      .getElementById(`pr_player_tableau_${this.playerId}`)
      .insertAdjacentHTML(
        "beforeend",
        tplPlayerTableauContent({ playerGamedatas })
      );
  }

  updatePlayerPanel({ playerGamedatas }: { playerGamedatas: BgaPlayer }) {
    if (this.game.framework().scoreCtrl?.[this.playerId]) {
      this.game
        .framework()
        .scoreCtrl[this.playerId].setValue(Number(playerGamedatas.score));
    }
  }

  clearInterface() {}

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

  public async addCardToHand({ card }: { card: TableauCard }): Promise<void> {
    if (this.getPlayerId() === this.game.getPlayerId()) {
      await this.game.hand.addCard(card);
    } else {
      const element = this.game.tableauCardManager.getCardElement(card);
      await moveToAnimation({
        game: this.game,
        element,
        toId: `overall_player_board_${this.playerId}`,
        remove: true,
      });
      this.game.tableauCardManager.removeCard(card);
    }
    this.counters[card.region === EAST ? "cardsEast" : "cardsWest"].incValue(1);
  }

  public async removeCardFromHand({ card }: { card: TableauCard }): Promise<void> {
    if (this.getPlayerId() === this.game.getPlayerId()) {
      await this.game.hand.removeCard(card);
    }
    this.counters[card.region === EAST ? "cardsEast" : "cardsWest"].incValue(-1);
  }
}
