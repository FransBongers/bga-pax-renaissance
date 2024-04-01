class PlayerTableau {
  private game: PaxRenaissanceGame;
  private playerId: number;

  public tableau: {
    [EAST]?: LineStockWithSort<EmpireCard | TableauCard | EmpireCardContainer>;
    [WEST]?: LineStockWithSort<EmpireCard | TableauCard | EmpireCardContainer>;
    oldMaids?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
  } = {};

  constructor({
    game,
    player,
  }: {
    game: PaxRenaissanceGame;
    player: PaxRenaissancePlayerData;
  }) {
    this.game = game;
    this.playerId = Number(player.id);
    this.setup({ player });
  }

  // .##.....##.##....##.########...#######.
  // .##.....##.###...##.##.....##.##.....##
  // .##.....##.####..##.##.....##.##.....##
  // .##.....##.##.##.##.##.....##.##.....##
  // .##.....##.##..####.##.....##.##.....##
  // .##.....##.##...###.##.....##.##.....##
  // ..#######..##....##.########...#######.

  updateCardTooltips() {
    this.tableau.oldMaids.getCards().forEach((card: TableauCard) => {
      this.game.tooltipManager.removeTooltip(card.id);
      this.game.tooltipManager.addCardTooltip({ nodeId: card.id, card });
    });
    REGIONS.forEach((region) => {
      this.tableau[region].getCards().forEach((card) => {
        if (card.type !== TABLEAU_CARD) {
          return;
        }
        this.game.tooltipManager.removeTooltip(card.id);
        this.game.tooltipManager.addCardTooltip({ nodeId: card.id, card });
      });
    });
  }

  clearInterface() {
    this.tableau[EAST].removeAll();
    this.tableau[WEST].removeAll();
  }

  updateInterface({ player }: { player: PaxRenaissancePlayerData }) {
    this.updateCards({ player });
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  private setup({ player }: { player: PaxRenaissancePlayerData }) {
    const overlap = this.game.settings.get({
      id: CARDS_IN_TABLEAU_OVERLAP,
    }) as string;
    const overlapEmpireSquares = this.game.settings.get({
      id: OVERLAP_EMPIRE_SQUARES,
    }) as string;
    document
      .getElementById(`pr_player_tableau_${player.id}`)
      .insertAdjacentHTML(
        "beforeend",
        tplPlayerTableauContent({
          overlap,
          overlapEmpireSquares,
          player,
          showCounters: this.game.settings.get({
            id: SHOW_FLORIN_CARD_COUNTERS,
          }) as string,
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

    this.tableau[EAST] = new LineStockWithSort(
      this.game.tableauCardManager,
      document.getElementById(`tableau_east_${player.id}`),
      { center: false, sort: sortFunction("state") }
    );
    this.tableau[WEST] = new LineStockWithSort(
      this.game.tableauCardManager,
      document.getElementById(`tableau_west_${player.id}`),
      { center: false, sort: sortFunction("state") }
    );
    this.tableau.oldMaids = new LineStock(
      this.game.tableauCardManager,
      document.getElementById(`old_maids_${player.id}`)
      // { center: false, sort: sortFunction("state"), gap: "12px" }
    );

    this.updateCards({ player });
  }

  updateCards({ player }: { player: PaxRenaissancePlayerData }) {
    player.tableau.cards[EAST].filter(noMarriedQueensNoVassals).forEach(
      (card) => {
        if (card.type === EMPIRE_CARD) {
          this.tableau[EAST].addCard(createEmpireCardContainer(card));
        } else {
          this.tableau[EAST].addCard(card);
        }
      }
    );

    player.tableau.cards[WEST].filter(noMarriedQueensNoVassals).forEach(
      (card) => {
        if (card.type === EMPIRE_CARD) {
          this.tableau[WEST].addCard(createEmpireCardContainer(card));
        } else {
          this.tableau[WEST].addCard(card);
        }
      }
    );

    [...player.tableau.cards[EAST], ...player.tableau.cards[WEST]]
      .filter((card) => card.type === EMPIRE_CARD && card.isVassal)
      .forEach((card: EmpireCard) => {
        this.game.tableauCardManager.setupVassal({
          vassal: card,
          suzerain: this.game.gamedatas.empireSquares.find(
            (empireCard) => empireCard.id === card.suzerainId
          ),
        });
      });

    player.oldMaids.forEach((card: QueenCard) => {
      this.tableau.oldMaids.addCard(card);
    });

    this.checkOldMaidContainerHeight();
    // [...player.tableau.cards[EAST], ...player.tableau.cards[WEST]]
    //   .filter((card) => card.isQueen)
    //   .forEach((card: QueenCard) => {
    //     this.game.tableauCardManager.addQueen({
    //       queen: card,
    //       king: this.game.gamedatas.empireSquares.find(
    //         (empireCard: EmpireCard) => empireCard.queenId === card.id
    //       ),
    //     });
    //   });

    const repressTokensToThrones =
      this.game.settings.get({
        id: REPRESS_TOKENS_TO_THRONES,
      }) === ENABLED;

    player.tableau.tokens.forEach((token) => {
      const { location } = token;
      // const node = document.getElementById(`${location}_tokens`);
      const node =
        token.type === BISHOP || !repressTokensToThrones
          ? document.getElementById(`${location}_tokens`)
          : document.getElementById(`${location}_throne_tokens`);
      if (!node) {
        return;
      }

      node.insertAdjacentHTML("beforeend", tplToken(token));
    });
  }

  public async addCard(card: EmpireCard | TableauCard | EmpireCardContainer) {
    if (card.location.split("_")[1] === EAST) {
      await this.tableau[EAST].addCard(card);
    } else {
      await this.tableau[WEST].addCard(card);
    }
  }

  public async addOldMaid(card: QueenCard) {
    const node = document.getElementById(`player_bank_board_${this.playerId}`);
    const currentZIndex = node.style.zIndex;
    node.style.zIndex = "50";

    this.checkOldMaidContainerHeight({ increase: 1 });
    await this.tableau.oldMaids.addCard(card);
    node.style.zIndex = currentZIndex;
  }

  public checkOldMaidContainerHeight(
    { increase }: { increase: number } = { increase: 0 }
  ) {
    const node = document.getElementById(`old_maids_${this.playerId}`);
    if (!node) {
      return;
    }
    if (this.tableau.oldMaids.getCards().length + increase > 0) {
      node.setAttribute("data-has-old-maids", "true");
    } else {
      node.setAttribute("data-has-old-maids", "false");
    }
  }
}
