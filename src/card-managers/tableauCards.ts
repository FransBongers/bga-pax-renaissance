class TableauCardManager extends CardManager<EmpireCard | TableauCard> {
  public vassalStocks: {
    [ARAGON]?: LineStock<EmpireCard | TableauCard>;
    [BYZANTIUM]?: LineStock<EmpireCard | TableauCard>;
    [ENGLAND]?: LineStock<EmpireCard | TableauCard>;
    [FRANCE]?: LineStock<EmpireCard | TableauCard>;
    [HOLY_ROMAN_EMIRE]?: LineStock<EmpireCard | TableauCard>;
    [HUNGARY]?: LineStock<EmpireCard | TableauCard>;
    [MAMLUK]?: LineStock<EmpireCard | TableauCard>;
    [OTTOMAN]?: LineStock<EmpireCard | TableauCard>;
    [PAPAL_STATES]?: LineStock<EmpireCard | TableauCard>;
    [PORTUGAL]?: LineStock<EmpireCard | TableauCard>;
  } = {};

  constructor(public game: PaxRenaissanceGame) {
    super(game, {
      getId: (card) => card.id,
      setupDiv: (card, div) => this.setupDiv(card, div),
      setupFrontDiv: (card, div: HTMLElement) => this.setupFrontDiv(card, div),
      setupBackDiv: (card, div: HTMLElement) => this.setupBackDiv(card, div),
      isCardVisible: (card) => this.isCardVisible(card),
      animationManager: game.animationManager,
    });
  }

  clearInterface() {
    Object.keys(this.vassalStocks).forEach((key) => {
      this.vassalStocks[key].removeAll();
      this.removeStock(this.vassalStocks[key]);
    });
  }

  setupDiv(card: EmpireCard | TableauCard, div: HTMLElement) {
    // div.classList.add("pr_card");
    if (card.type === TABLEAU_CARD) {
      div.style.width = "calc(var(--paxRenCardScale) * 151px)";
      div.style.height = "calc(var(--paxRenCardScale) * 230px)";
    } else {
      div.style.minWidth = "calc(var(--paxRenCardScale) * 151px)";
      div.style.minHeight = "calc(var(--paxRenCardScale) * 151px)";
    }
    div.insertAdjacentHTML("beforeend", tplTokensContainer({ id: card.id }));

    if (card.type === EMPIRE_CARD) {
      div.classList.add("pr_empire_square");
      // setup container for queens
      div.insertAdjacentHTML("afterbegin", tplQueenContainer({ id: card.id }));
      const queenContainerNode = document.getElementById(`queens_${card.id}`);
      card.queens.forEach((queen) => {
        // add queens
        queenContainerNode.insertAdjacentHTML("beforeend", tplQueen({ queen }));
        // add tooltip to queen
        this.game.tooltipManager.addCardTooltip({
          nodeId: queen.id,
          card: queen,
        });
      });

      div.insertAdjacentHTML("beforeend", tplVassalsContainer({ id: card.id }));

      this.vassalStocks[card.empire] = new LineStock<EmpireCard | TableauCard>(
        this,
        document.getElementById(`vassals_${card.id}`),
        { gap: "12px", sort: sortFunction("state") }
      );
      this.updateQueenContainerHeightAndPositions({ card });
      this.updateEmpireCardHeight({ card });
    }
  }

  setupFrontDiv(card: EmpireCard | TableauCard, div: HTMLElement) {
    // if (!card.id.startsWith('Empire')) {
    //   console.log('setupFrontDiv',card);
    // }

    if (card.type === TABLEAU_CARD) {
      div.classList.add("pr_card");
      div.setAttribute("data-card-id", card.id.split("_")[0]);
      div.style.width = "calc(var(--paxRenCardScale) * 151px)";
      div.style.height = "calc(var(--paxRenCardScale) * 230px)";
    } else if (card.type === EMPIRE_CARD) {
      div.classList.add("pr_square_card");
      div.setAttribute("data-card-id", `${card.id}_king`);
      div.style.width = "calc(var(--paxRenCardScale) * 151px)";
      div.style.height = "calc(var(--paxRenCardScale) * 151px)";
    }

    if (this.game.gameOptions.ageOfReformationPromo) {
      div.setAttribute("data-map-type", "ageOfReformation");
      if (card.id === "EmpireSquare_PapalStates") {
        const religion = (
          this.game.gamedatas as PaxRenaissanceGamedatas
        ).gameMap.empires.find((empire) => empire.id === PAPAL_STATES).religion;
        div.setAttribute("data-religion", religion);
      }
    }

    if (
      card.type === TABLEAU_CARD &&
      card.location !== "market_west_0" &&
      card.location !== "market_east_0"
    ) {
      this.game.tooltipManager.addCardTooltip({
        nodeId: card.id,
        card,
      });
    } else if (card.type === EMPIRE_CARD) {
      this.game.tooltipManager.addEmpireCardTooltip({
        nodeId: card.id,
        card,
        // With age if reformation promo papal states can have a different king side
        // depending on religion.
        religion:
          this.game.gameOptions.ageOfReformationPromo &&
          card.id === "EmpireSquare_PapalStates"
            ? (
                this.game.gamedatas as PaxRenaissanceGamedatas
              ).gameMap.empires.find((empire) => empire.id === PAPAL_STATES)
                .religion
            : "",
      });
    }
  }

  setupBackDiv(card: EmpireCard | TableauCard, div: HTMLElement) {
    if (card.type === TABLEAU_CARD) {
      div.classList.add("pr_card");
      div.setAttribute(
        "data-card-id",
        card.region === EAST ? "EAST_BACK" : "WEST_BACK"
      );
      div.style.width = "calc(var(--paxRenCardScale) * 151px)";
      div.style.height = "calc(var(--paxRenCardScale) * 230px)";
    } else if (card.type === EMPIRE_CARD) {
      div.classList.add("pr_square_card");
      div.setAttribute("data-card-id", `${card.id}_republic`);
      div.style.width = "calc(var(--paxRenCardScale) * 151px)";
      div.style.height = "calc(var(--paxRenCardScale) * 151px)";
    }
  }

  isCardVisible(card: EmpireCard | TableauCard) {
    const { location, type } = card;
    if (location.startsWith("deck")) {
      return false;
    }
    if (location === "market_west_0" || location === "market_east_0") {
      return false;
    }
    if (type === EMPIRE_CARD && card.side === REPUBLIC) {
      return false;
    }
    return true;
  }

  public async addVassal({
    vassal,
    suzerain,
  }: {
    vassal: EmpireCard;
    suzerain: EmpireCard;
  }) {
    this.updateEmpireCardHeight({ card: suzerain, vassalChange: 1 });
    this.vassalStocks[suzerain.empire].addCard(vassal);
  }

  // Card move has alreasy been done, need to update height
  public removeVassal({
    suzerain,
    beforeMove = false,
  }: {
    suzerain: EmpireCard;
    beforeMove?: boolean;
  }) {
    this.updateEmpireCardHeight({
      card: suzerain,
      vassalChange: beforeMove ? -1 : 0,
    });
  }

  public async addQueen({
    king,
    queen,
  }: {
    king: EmpireCard;
    queen: QueenCard;
  }) {
    const { id, queens } = king;
    const div = document.getElementById(id);
    if (!div) {
      return;
    }

    const containerNode = document.getElementById(`queens_${king.id}`);
    if (containerNode) {
      containerNode.insertAdjacentHTML("beforeend", tplQueen({ queen }));
      this.game.tooltipManager.addCardTooltip({
        nodeId: queen.id,
        card: queen,
      });
    }

    this.updateEmpireCardHeight({
      card: king,
    });
    this.updateQueenContainerHeightAndPositions({ card: king });
  }

  public async removeQueen({
    king,
    queen,
  }: {
    king: EmpireCard;
    queen: QueenCard;
  }) {
    // TODO: discard animation
    const node = document.getElementById(`${queen.id}`);

    if (node) {
      node.remove();
    }
    this.updateEmpireCardHeight({ card: king });
    this.updateQueenContainerHeightAndPositions({ card: king });
  }

  private updateEmpireCardHeight({
    card,
    vassalChange = 0,
  }: {
    card: EmpireCard;
    vassalChange?: number;
  }) {
    const empire = card.empire;
    const numberOfVassals =
      this.vassalStocks[empire].getCards().length + vassalChange;
    const queenHeight = getTotalHeightQueens({ queens: card.queens });

    const node = document.getElementById(card.id);
    node.style.minHeight = `calc(var(--paxRenCardScale) * ${
      (numberOfVassals + 1) * 151 + numberOfVassals * 12 + queenHeight
    }px)`;

    // const queensContainer = document.getElementById(`queens_${card.id}`);
    // console.log('queensContainer', queensContainer);
    // console.log('queenHeight', queenHeight);
    // console.log('queensContainer', queensContainer?.style);
    // if (queensContainer) {
    //   queensContainer.style.height = `calc(var(--paxRenCardScale) * ${queenHeight}px);`
    // }
  }

  private updateQueenContainerHeightAndPositions({
    card,
  }: {
    card: EmpireCard;
  }) {
    let offSetTop = 0;
    card.queens.forEach((queen) => {
      const queenNode = document.getElementById(`${queen.id}`);
      if (!queenNode) {
        return;
      }
      queenNode.style.position = "absolute";
      queenNode.style.top = `calc(var(--paxRenCardScale) * ${offSetTop}px)`;
      offSetTop = offSetTop + queen.height;
    });
    const queensContainer = document.getElementById(`queens_${card.id}`);
    if (!queensContainer) {
      return;
    }
    const style = `calc(var(--paxRenCardScale) * ${offSetTop}px)`;
    queensContainer.style.height = style;
  }
}
