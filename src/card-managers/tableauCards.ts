class TableauCardManager extends CardManager<EmpireCard | TableauCard | EmpireCardContainer> {
  public empireSquareStocks: {
    [ARAGON]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [BYZANTIUM]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [ENGLAND]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [FRANCE]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [HOLY_ROMAN_EMIRE]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [HUNGARY]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [MAMLUK]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [OTTOMAN]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [PAPAL_STATES]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [PORTUGAL]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
  } = {};

  public vassalStocks: {
    [ARAGON]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [BYZANTIUM]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [ENGLAND]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [FRANCE]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [HOLY_ROMAN_EMIRE]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [HUNGARY]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [MAMLUK]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [OTTOMAN]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [PAPAL_STATES]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [PORTUGAL]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
  } = {};

  public queenStocks: {
    [ARAGON]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [BYZANTIUM]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [ENGLAND]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [FRANCE]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [HOLY_ROMAN_EMIRE]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [HUNGARY]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [MAMLUK]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [OTTOMAN]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [PAPAL_STATES]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [PORTUGAL]?: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
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

  setupDiv(card: EmpireCard | TableauCard | EmpireCardContainer, div: HTMLElement) {
    if (card.type === EMPIRE_CARD_CONTAINER) {
      this.setupEmpireCardContainerDiv(card,div);
      // div.style.minWidth = "calc(var(--paxRenCardScale) * 151px)";
      // div.style.minHeight = "calc(var(--paxRenCardScale) * 151px)";
      
      return;
    }

    const isEmpireCard = card.type === EMPIRE_CARD;
    // div.classList.add("pr_card");
    if (card.type === TABLEAU_CARD) {
      div.style.width = "calc(var(--paxRenCardScale) * 151px)";
      div.style.height = "calc(var(--paxRenCardScale) * 230px)";
    } else {
      div.style.minWidth = "calc(var(--paxRenCardScale) * 151px)";
      div.style.minHeight = "calc(var(--paxRenCardScale) * 151px)";
    }
    div.style.position = 'relative';
    div.insertAdjacentHTML("beforeend", tplTokensContainer({ id: card.id }));

    // const ops = isEmpireCard ? [...card[KING].ops,...card[REPUBLIC].ops] : card.ops;
    
    if (isEmpireCard) {
      (card.king.ops || []).forEach((operation) => {
        const element = document.getElementById(`pr_${card.id}_${operation.id}_king`);
        // TODO: check why setupFrontDiv is called twice for each card
        if (!element) {
          div.insertAdjacentHTML(
            "beforeend",
            tplOperationSelect({
              operation,
              cardId: card.id,
              side: KING,
            })
          );        
        }
      });
      (card.republic.ops || []).forEach((operation) => {
        const element = document.getElementById(`pr_${card.id}_${operation.id}_republic`);
        // TODO: check why setupFrontDiv is called twice for each card
        if (!element) {
          div.insertAdjacentHTML(
            "beforeend",
            tplOperationSelect({
              operation,
              cardId: card.id,
              side: REPUBLIC,
            })
          );        
        }
      });
    } else {
      const ops = card.ops;
      (ops || []).forEach((operation) => {
        const element = document.getElementById(`pr_${card.id}_${operation.id}${isEmpireCard ? `_${KING}` : ''}`);
        // TODO: check why setupFrontDiv is called twice for each card
        if (!element) {
          div.insertAdjacentHTML(
            "beforeend",
            tplOperationSelect({
              operation,
              cardId: card.id,
              side: null,
            })
          );        
        }
      });
    }



    if (card.type === EMPIRE_CARD) {
      div.classList.add("pr_empire_square");
      // setup container for queens
      // div.insertAdjacentHTML("afterbegin", tplQueenContainer({ id: card.id }));
      // const queenContainerNode = document.getElementById(`queens_${card.id}`);
      // card.queens.forEach((queen) => {
      //   // add queens
      //   queenContainerNode.insertAdjacentHTML("beforeend", tplQueen({ queen }));
      //   // add tooltip to queen
      //   this.game.tooltipManager.addCardTooltip({
      //     nodeId: queen.id,
      //     card: queen,
      //   });
      // });

      // div.insertAdjacentHTML("beforeend", tplVassalsContainer({ id: card.id }));

      // this.vassalStocks[card.empire] = new LineStock<EmpireCard | TableauCard | EmpireCardContainer>(
      //   this,
      //   document.getElementById(`vassals_${card.id}`),
      //   { gap: "12px", sort: sortFunction("state") }
      // );
      // this.updateQueenContainerHeightAndPositions({ card });
      // this.updateEmpireCardHeight({ card });
    }
  }

  setupFrontDiv(card: EmpireCard | TableauCard | EmpireCardContainer, div: HTMLElement) {
    if (card.type === EMPIRE_CARD_CONTAINER) {
      div.style.display = 'none';
      return;
    }

    // if (!card.id.startsWith('Empire')) {
    //   console.log('setupFrontDiv',card);
    // }
    const isEmpireCard = card.type === EMPIRE_CARD;
    if (card.type === TABLEAU_CARD) {
      div.classList.add("pr_card");
      div.setAttribute("data-card-id", card.id.split("_")[0]);
      div.style.width = "calc(var(--paxRenCardScale) * 151px)";
      div.style.height = "calc(var(--paxRenCardScale) * 230px)";
    } else if (isEmpireCard) {
      div.classList.add("pr_square_card");
      div.setAttribute("data-card-id", `${card.id}_king`);
      div.style.width = "calc(var(--paxRenCardScale) * 151px)";
      div.style.height = "calc(var(--paxRenCardScale) * 151px)";

      if (this.game.gameOptions.ageOfReformationPromo) {
        div.setAttribute("data-map-type", "ageOfReformation");
        if (card.id === "EmpireSquare_PapalStates") {
          const religion = (
            this.game.gamedatas as PaxRenaissanceGamedatas
          ).gameMap.empires.find((empire) => empire.id === PAPAL_STATES).religion;
          div.setAttribute("data-religion", religion);
        }
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

  setupBackDiv(card: EmpireCard | TableauCard | EmpireCardContainer, div: HTMLElement) {
    if (card.type === EMPIRE_CARD_CONTAINER) {
      div.style.display = 'none';
      return;
    }

    const isEmpireCard = card.type === EMPIRE_CARD;

    if (card.type === TABLEAU_CARD) {
      div.classList.add("pr_card");
      div.setAttribute(
        "data-card-id",
        card.region === EAST ? "EAST_BACK" : "WEST_BACK"
      );
      div.style.width = "calc(var(--paxRenCardScale) * 151px)";
      div.style.height = "calc(var(--paxRenCardScale) * 230px)";
    } else if (isEmpireCard) {
      div.classList.add("pr_square_card");
      div.setAttribute("data-card-id", `${card.id}_republic`);
      div.style.width = "calc(var(--paxRenCardScale) * 151px)";
      div.style.height = "calc(var(--paxRenCardScale) * 151px)";

      if (this.game.gameOptions.ageOfReformationPromo) {
        div.setAttribute("data-map-type", "ageOfReformation");
      }
    }
  }

  isCardVisible(card: EmpireCard | TableauCard | EmpireCardContainer) {
    if (card.type === EMPIRE_CARD_CONTAINER) {
      return true;
    }
    
    const { location, type } = card;
    if (location && location.startsWith("deck")) {
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

  public async setupVassal({
    vassal,
    suzerain,
  }: {
    vassal: EmpireCard;
    suzerain: EmpireCard;
  }) {
    this.vassalStocks[suzerain.empire].addCard(createEmpireCardContainer(vassal));
  }

  public async addVassal({
    vassal,
    suzerain,
  }: {
    vassal: EmpireCard;
    suzerain: EmpireCard;
  }) {
    this.vassalStocks[suzerain.empire].addCard(createEmpireCardContainer(vassal));
  }

  public async addQueen({
    king,
    queen,
  }: {
    king: EmpireCard;
    queen: QueenCard;
  }) {
    await this.queenStocks[king.empire].addCard(queen);
    this.addMarginBottomQueen({queen});
  }

  private setupEmpireCardContainerDiv(container: EmpireCardContainer, div: HTMLElement) {
    div.classList.add('pr_empire_square_container');
    div.insertAdjacentHTML('beforeend',`<div id="${container.id}_queens" class="pr_queens_container"></div>`);
    div.insertAdjacentHTML('beforeend',`<div id="${container.id}_empire_square" style="width: calc(var(--paxRenCardScale) * 151px); height: calc(var(--paxRenCardScale) * 151px);"></div>`);
    div.insertAdjacentHTML('beforeend',`<div id="${container.id}_vassals" class="pr_vassals_container"></div>`);

    this.empireSquareStocks[container.empireId] = new LineStock<EmpireCard | TableauCard | EmpireCardContainer>(
      this,
      document.getElementById(`${container.id}_empire_square`),
      { gap: "12px", sort: sortFunction("state") }
    );
    this.empireSquareStocks[container.empireId].addCard(container.card);

    this.vassalStocks[container.empireId] = new LineStock<EmpireCard | TableauCard | EmpireCardContainer>(
      this,
      document.getElementById(`${container.id}_vassals`),
      { sort: sortFunction("state"), gap: 'calc(var(--paxRenCardScale) * 12px)' }
    );

    this.queenStocks[container.empireId] = new LineStock<EmpireCard | TableauCard | EmpireCardContainer>(
      this,
      document.getElementById(`${container.id}_queens`),
      // { gap: "12px", sort: sortFunction("state") }
    );

    for (const queen of container.card.queens) {
      this.queenStocks[container.empireId].addCard(queen);
      this.addMarginBottomQueen({queen});
    }
  }

  private addMarginBottomQueen = ({queen}: {queen: QueenCard}) => {
    const queenNode = document.getElementById(queen.id);
    if (!queenNode) {
      return;
    }
    queenNode.style.marginBottom = `calc(var(--paxRenCardScale) * -${230-queen.height}px)`;
  }
}
