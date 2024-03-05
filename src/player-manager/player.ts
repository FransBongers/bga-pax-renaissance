//  .########..##..........###....##....##.########.########.
//  .##.....##.##.........##.##....##..##..##.......##.....##
//  .##.....##.##........##...##....####...##.......##.....##
//  .########..##.......##.....##....##....######...########.
//  .##........##.......#########....##....##.......##...##..
//  .##........##.......##.....##....##....##.......##....##.
//  .##........########.##.....##....##....########.##.....##

class PRPlayer {
  protected game: PaxRenaissanceGame;
  private bank: string;
  protected playerColor: string;
  private playerHexColor: string;
  protected playerId: number;
  private playerName: string;
  private player: PaxRenaissancePlayerData;
  public tableau: PlayerTableau;
  public counters: {
    prestige?: {
      catholic?: IconCounter;
      islamic?: IconCounter;
      reformist?: IconCounter;
      law?: IconCounter;
      discovery?: IconCounter;
      patron?: IconCounter;
    };
    king?: IconCounter;
    republic?: IconCounter;
    concessions?: IconCounter;
    cards?: {
      west?: IconCounter;
      east?: IconCounter;
    };
    cardsTableau?: {
      west?: IconCounter;
      east?: IconCounter;
    };
    florins?: IconCounter;
    florinsTableau?: IconCounter;
  } = {
    prestige: {},
    cards: {},
    cardsTableau: {},
  };
  private activeAbilities = [];
  // private hand: LineStock<TableauCard>;

  constructor({
    game,
    player,
  }: {
    game: PaxRenaissanceGame;
    player: PaxRenaissancePlayerData;
  }) {
    // console.log("Player", player);
    this.game = game;
    this.bank = player.bank;
    const playerId = player.id;
    this.playerId = Number(playerId);
    this.player = player;
    this.playerName = player.name;
    this.playerColor = COLOR_MAP[player.color];
    this.playerHexColor = player.color;
    this.activeAbilities = player.activeAbilities;
    const gamedatas = game.gamedatas;

    // if (this.playerId === this.game.getPlayerId()) {
    //   dojo.place(tplPlayerHand({ playerId: this.playerId, playerName: this.playerName }), 'pp_player_tableaus', 1);
    // }

    this.setupPlayer({ gamedatas, player });
  }

  // .##.....##.##....##.########...#######.
  // .##.....##.###...##.##.....##.##.....##
  // .##.....##.####..##.##.....##.##.....##
  // .##.....##.##.##.##.##.....##.##.....##
  // .##.....##.##..####.##.....##.##.....##
  // .##.....##.##...###.##.....##.##.....##
  // ..#######..##....##.########...#######.

  clearInterface() {
    this.tableau.clearInterface();
  }

  updatePlayer({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    const playerGamedatas = gamedatas.players[this.playerId];
    this.activeAbilities = playerGamedatas.activeAbilities;
    this.player = playerGamedatas;
    this.updatePlayerPanel({ playerGamedatas, gamedatas });
    this.tableau.updateInterface({ player: playerGamedatas });
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  private setupHand({
    gamedatas,
    player,
  }: {
    gamedatas: PaxRenaissanceGamedatas;
    player: PaxRenaissancePlayerData;
  }) {
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
    this.tableau = new PlayerTableau({ game: this.game, player });
    // this.setupPlayerTableau({ playerGamedatas });
    this.setupPlayerPanel({ playerGamedatas, player, gamedatas });
    this.setupHand({ gamedatas, player });
  }

  setupPlayerPanel({
    playerGamedatas,
    player,
    gamedatas,
  }: {
    playerGamedatas: PaxRenaissancePlayerData;
    player: PaxRenaissancePlayerData;
    gamedatas: PaxRenaissanceGamedatas;
  }) {
    const playerBoardDiv: HTMLElement = $("player_board_" + this.playerId);
    playerBoardDiv.insertAdjacentHTML(
      "beforeend",
      tplPlayerPanel({ playerId: this.playerId, banker: this.bank })
    );

    this.counters.florins = new IconCounter({
      containerId: `pr_player_panel_icons_${this.playerId}`,
      icon: "florin",
      iconCounterId: `pr_florins_counter_${this.playerId}`,
      initialValue: player.florins,
    });
    this.counters.florinsTableau = new IconCounter({
      containerId: `pr_tableau_title_counters_${this.playerId}`,
      icon: "florin",
      iconCounterId: `pr_florins_tableau_counter_${this.playerId}`,
      initialValue: player.florins,
    });
    [
      `pr_florins_counter_${this.playerId}`,
      `pr_florins_tableau_counter_${this.playerId}`,
    ].forEach((nodeId) => {
      this.game.tooltipManager.addIconTooltip({
        iconHtml: tplIcon({
          icon: "florin",
          style: "--paxRenIconScale: 0.85;",
        }),
        nodeId,
        title: _("Florins"),
        text: _("The amount of Florins this player owns."),
      });
    });

    this.counters.cards.west = new IconCounter({
      containerId: `pr_player_panel_icons_${this.playerId}`,
      extraIconClasses: "pr_card_back_icon",
      icon: "west_back",
      iconCounterId: `pr_cards_west_counter_${this.playerId}`,
      initialValue: 0,
    });
    this.counters.cardsTableau.west = new IconCounter({
      containerId: `pr_tableau_title_counters_${this.playerId}`,
      extraIconClasses: "pr_card_back_icon",
      icon: "west_back",
      iconCounterId: `pr_cards_tableau_west_counter_${this.playerId}`,
      initialValue: 0,
    });
    [
      `pr_cards_west_counter_${this.playerId}`,
      `pr_cards_tableau_west_counter_${this.playerId}`,
    ].forEach((nodeId) => {
      this.game.tooltipManager.addIconTooltip({
        iconHtml: tplIcon({
          icon: `west_back`,
          classes: "pr_card_back_icon",
          style: "width: 30px; height: 45px;",
        }),
        nodeId,
        title: _("West cards"),
        text: _(
          "The number of cards from the West deck this player has in their hand."
        ),
      });
    });

    this.counters.cards.east = new IconCounter({
      containerId: `pr_player_panel_icons_${this.playerId}`,
      extraIconClasses: "pr_card_back_icon",
      icon: "east_back",
      iconCounterId: `pr_cards_east_counter_${this.playerId}`,
      initialValue: 0,
    });
    this.counters.cardsTableau.east = new IconCounter({
      containerId: `pr_tableau_title_counters_${this.playerId}`,
      extraIconClasses: "pr_card_back_icon",
      icon: "east_back",
      iconCounterId: `pr_cards_tableau_east_counter_${this.playerId}`,
      initialValue: 0,
    });
    [
      `pr_cards_east_counter_${this.playerId}`,
      `pr_cards_tableau_east_counter_${this.playerId}`,
    ].forEach((nodeId) => {
      this.game.tooltipManager.addIconTooltip({
        iconHtml: tplIcon({
          icon: `east_back`,
          classes: "pr_card_back_icon",
          style: "width: 30px; height: 45px;",
        }),
        nodeId,
        title: _("East cards"),
        text: _(
          "The number of cards from the East deck this player has in their hand."
        ),
      });
    });

    const prestigeText = _(
      "The amount of ${prestige} this player has in their tableau. Counts for ${victory}."
    );
    const prestigeTitle = _("${prestige}");
    [CATHOLIC, ISLAMIC, REFORMIST].forEach((prestige) => {
      const titleArgs = {
        [CATHOLIC]: {
          prestige: _("Catholic Prestige"),
        },
        [ISLAMIC]: {
          prestige: _("Islamic Prestige"),
        },
        [REFORMIST]: {
          prestige: _("Reformist Prestige"),
        },
      };

      const textArgs = {
        [CATHOLIC]: {
          prestige: _("Catholic Prestige"),
          victory: _("Holy Victory"),
        },
        [ISLAMIC]: {
          prestige: _("Islamic Prestige"),
          victory: _("Holy Victory"),
        },
        [REFORMIST]: {
          prestige: _("Reformist Prestige"),
          victory: _("Holy Victory"),
        },
      };

      const icon = `prestige_${prestige}`;
      const id = `pr_prestige_${prestige}_counter_${this.playerId}`;
      const classes = "pr_prestige_icon";
      this.counters.prestige[prestige] = new IconCounter({
        containerId: `pr_player_panel_icons_${this.playerId}`,
        extraIconClasses: classes,
        icon,
        iconCounterId: id,
        initialValue: 0,
      });
      this.game.tooltipManager.addIconTooltip({
        iconHtml: tplIcon({ icon, classes, style: "--paxRenIconScale: 1.35;" }),
        nodeId: id,
        text: this.game.format_string_recursive(
          prestigeText,
          textArgs[prestige]
        ),
        title: this.game.format_string_recursive(
          prestigeTitle,
          titleArgs[prestige]
        ),
      });
    });

    [PATRON, LAW, DISCOVERY].forEach((prestige) => {
      const titleArgs = {
        [PATRON]: {
          prestige: _("Patron Prestige"),
        },
        [LAW]: {
          prestige: _("Law Prestige"),
        },
        [DISCOVERY]: {
          prestige: _("Discovery Prestige"),
        },
      };
      const textArgs = {
        [PATRON]: {
          prestige: _("Patron Prestige"),
          victory: _("Patron Victory"),
        },
        [LAW]: {
          prestige: _("Law Prestige"),
          victory: _("Renaissance Victory"),
        },
        [DISCOVERY]: {
          prestige: _("Discovery Prestige"),
          victory: _("Globalization Victory"),
        },
      };

      const icon = `prestige_${prestige}`;
      const id = `pr_prestige_${prestige}_counter_${this.playerId}`;
      const classes = "pr_prestige_icon";
      this.counters.prestige[prestige] = new IconCounter({
        containerId: `pr_player_panel_icons_${this.playerId}`,
        extraIconClasses: classes,
        icon,
        iconCounterId: id,
        initialValue: 0,
      });
      this.game.tooltipManager.addIconTooltip({
        iconHtml: tplIcon({ icon, classes, style: "--paxRenIconScale: 1.35;" }),
        nodeId: id,
        text: this.game.format_string_recursive(
          prestigeText,
          textArgs[prestige]
        ),
        title: this.game.format_string_recursive(
          prestigeTitle,
          titleArgs[prestige]
        ),
      });
    });

    this.counters.king = new IconCounter({
      containerId: `pr_player_panel_icons_${this.playerId}`,
      extraIconClasses: "pr_square_card_icon",
      icon: `king`,
      iconCounterId: `pr_kings_counter_${this.playerId}`,
      initialValue: 0,
      dataAttribute: {
        key: "data-bank",
        value: this.bank,
      },
    });
    this.game.tooltipManager.addIconTooltip({
      iconHtml: tplIcon({
        icon: `king`,
        classes: "pr_square_card_icon",
        extra: `data-bank="${this.bank}"`,
        style: "--paxRenIconScale: 1.45;",
      }),
      nodeId: `pr_kings_counter_${this.playerId}`,
      text: _(
        "The number of Empire Squares on their King side this player has in their tableau. Counts for Imperial Victory."
      ),
      title: _("Kings"),
    });

    this.counters.republic = new IconCounter({
      containerId: `pr_player_panel_icons_${this.playerId}`,
      extraIconClasses: "pr_square_card_icon",
      icon: `republic`,
      iconCounterId: `pr_republics_counter_${this.playerId}`,
      initialValue: 0,
      dataAttribute: {
        key: "data-bank",
        value: this.bank,
      },
    });
    this.game.tooltipManager.addIconTooltip({
      iconHtml: tplIcon({
        icon: `republic`,
        classes: "pr_square_card_icon",
        extra: `data-bank="${this.bank}"`,
        style: "--paxRenIconScale: 1.45;",
      }),
      nodeId: `pr_republics_counter_${this.playerId}`,
      text: _(
        "The number of Empire Squares on their Republic side this player has in their tableau. Counts for Renaissance Victory."
      ),
      title: _("Republics"),
    });

    this.counters.concessions = new IconCounter({
      containerId: `pr_player_panel_icons_${this.playerId}`,
      extraIconClasses: "pr_concession_icon",
      icon: `concession`,
      iconCounterId: `pr_concessions_counter_${this.playerId}`,
      initialValue: 0,
      dataAttribute: {
        key: "data-bank",
        value: this.bank,
      },
    });
    this.game.tooltipManager.addIconTooltip({
      iconHtml: tplIcon({
        icon: `concession`,
        classes: "pr_concession_icon",
        extra: `data-bank="${this.bank}"`,
        style: "--paxRenTokenScale: 1.35;",
      }),
      nodeId: `pr_concessions_counter_${this.playerId}`,
      text: _(
        "The number of Concessions this player has in play. Counts for Globalization Victory."
      ),
      title: _("Concessions"),
    });

    if (COLORS_WITH_SHADOW.includes(this.getColor())) {
      const node = document.getElementById(`player_name_${this.playerId}`);
      if (node) {
        node.setAttribute("data-shadow", "true");
      }
    }

    this.updatePlayerPanel({ playerGamedatas, gamedatas });
  }

  updatePlayerPanel({
    gamedatas,
    playerGamedatas,
  }: {
    playerGamedatas: PaxRenaissancePlayerData;
    gamedatas: PaxRenaissanceGamedatas;
  }) {
    this.setHandCards(EAST, playerGamedatas.hand.counts.east);
    this.setHandCards(WEST, playerGamedatas.hand.counts.west);
    this.setFlorins(playerGamedatas.florins);
    if (this.game.framework().scoreCtrl?.[this.playerId]) {
      this.game
        .framework()
        .scoreCtrl[this.playerId].setValue(Number(playerGamedatas.score));
    }
    const allCards = [
      ...playerGamedatas.tableau.cards.east,
      ...playerGamedatas.tableau.cards.west,
      ...playerGamedatas.oldMaids,
    ];
    const prestigeCount = {
      [CATHOLIC]: 0,
      [ISLAMIC]: 0,
      [REFORMIST]: 0,
      [LAW]: 0,
      [DISCOVERY]: 0,
      [PATRON]: 0,
    };
    allCards.forEach((card) => {
      if (card.type === TABLEAU_CARD) {
        card.prestige.forEach((prestige) => {
          prestigeCount[prestige] = prestigeCount[prestige] + 1;
          // this.counters.prestige[prestige].incValue(1);
        });
      } else if (card.type === EMPIRE_CARD) {
        card[card.side].prestige.forEach((prestige) => {
          prestigeCount[prestige] = prestigeCount[prestige] + 1;
          // this.counters.prestige[prestige].incValue(1);
        });
      }
    });
    Object.keys(prestigeCount)
      .filter((prestige) =>
        [CATHOLIC, ISLAMIC, REFORMIST, PATRON].includes(prestige)
      )
      .forEach((prestige) => {
        this.counters.prestige[prestige].setValue(prestigeCount[prestige]);
      });
    this.counters.prestige[LAW].setValue(
      gamedatas.victoryCounts.lawPrestige.find(
        (item) => item.playerId === this.playerId
      )?.lawPrestige || 0
    );
    this.counters.prestige[DISCOVERY].setValue(
      gamedatas.victoryCounts.discoveryPrestige.find(
        (item) => item.playerId === this.playerId
      )?.discoveryPrestige || 0
    );
    this.counters.king.setValue(
      gamedatas.victoryCounts.kings.find(
        (item) => item.playerId === this.playerId
      )?.numberOfKings || 0
    );
    this.counters.republic.setValue(
      gamedatas.victoryCounts.republics.find(
        (item) => item.playerId === this.playerId
      )?.numberOfRepublics || 0
    );
    this.counters.concessions.setValue(
      gamedatas.victoryCounts.concessions.find(
        (item) => item.playerId === this.playerId
      )?.numberOfConcessions || 0
    );
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

  getBank(): string {
    return this.bank;
  }

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

  hasActiveAbility({ ability }: { ability: string }): boolean {
    return this.activeAbilities.includes(ability);
  }

  activateAbility({ ability }: { ability: string }) {
    this.activeAbilities.push(ability);
  }

  deactivateAbility({ ability }: { ability: string }) {
    this.activeAbilities = this.activeAbilities.filter(
      (item) => item !== ability
    );
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

  public incFlorins(value: number) {
    this.counters.florins.incValue(value);
    this.counters.florinsTableau.incValue(value);
  }

  public setFlorins(value: number) {
    this.counters.florins.setValue(value);
    this.counters.florinsTableau.setValue(value);
  }

  public incHandCards(region: string, value: number) {
    this.counters.cards[region].incValue(value);
    this.counters.cardsTableau[region].incValue(value);
  }

  public setHandCards(region: string, value: number) {
    this.counters.cards[region].setValue(value);
    this.counters.cardsTableau[region].setValue(value);
  }

  public updateCardTooltips() {
    this.tableau.updateCardTooltips();
  }

  public async addCardToHand({ card }: { card: TableauCard }): Promise<void> {
    if (this.getPlayerId() === this.game.getPlayerId()) {
      await this.game.hand.addCard(card);
    } else {
      const element = this.game.tableauCardManager.getCardElement(card);
      await moveToAnimation({
        game: this.game,
        element,
        toId: `pr_cards_${card.region}_counter_${this.playerId}`,
        remove: true,
      });
      this.game.tableauCardManager.removeCard(card);
    }
    this.incHandCards(card.region, 1);
  }

  public async removeCardFromHand({
    card,
  }: {
    card: TableauCard;
  }): Promise<void> {
    if (this.getPlayerId() === this.game.getPlayerId()) {
      await this.game.hand.removeCard(card);
    }
    this.incHandCards(card.region, -1);
  }
}
