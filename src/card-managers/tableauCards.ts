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

  public queenStocks: {
    [ARAGON]?: LineStock<QueenCard>;
    [BYZANTIUM]?: LineStock<QueenCard>;
    [ENGLAND]?: LineStock<QueenCard>;
    [FRANCE]?: LineStock<QueenCard>;
    [HOLY_ROMAN_EMIRE]?: LineStock<QueenCard>;
    [HUNGARY]?: LineStock<QueenCard>;
    [MAMLUK]?: LineStock<QueenCard>;
    [OTTOMAN]?: LineStock<QueenCard>;
    [PAPAL_STATES]?: LineStock<QueenCard>;
    [PORTUGAL]?: LineStock<QueenCard>;
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
    // div.style.position = 'relative';

    // div.insertAdjacentHTML('beforebegin', `<div id="constainer_${card.id}">`);
    // div.insertAdjacentHTML('afterend', '</div>');
    if (card.type === EMPIRE_CARD) {
      div.insertAdjacentHTML("afterbegin", tplQueenContainer({ id: card.id }));
      div.insertAdjacentHTML("beforeend", tplVassalsContainer({ id: card.id }));
      // const wrapper =
      // div.insertAdjacentHTML('beforeend',`<div id="${card.id}_wrapper"></div>`)
      // div.parentElement.insertBefore()
      this.queenStocks[card.empire] = new LineStock<EmpireCard | TableauCard>(
        this,
        document.getElementById(`queen_${card.id}`),
        {}
      );

      this.vassalStocks[card.empire] = new LineStock<EmpireCard | TableauCard>(
        this,
        document.getElementById(`vassals_${card.id}`),
        { gap: "12px", sort: sortFunction("state") }
      );
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

    // div.style.background = 'blue';
    // div.classList.add('mygame-card-front');
    // div.id = `card-${card.id}-front`;
    // this.addTooltipHtml(div.id, `tooltip de ${card.type}`);
    if (card.type === TABLEAU_CARD) {
      this.game.tooltipManager.addCardTooltip({
        nodeId: card.id + "-front",
        card,
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
  public removeVassal({ suzerain }: { suzerain: EmpireCard }) {
    this.updateEmpireCardHeight({ card: suzerain, vassalChange: -1 });
  }

  public async addQueen({
    queen,
    king,
  }: {
    queen: QueenCard;
    king: EmpireCard;
  }) {
    this.updateEmpireCardHeight({
      card: king,
      queenHeightChange: queen.height,
    });
    const node = document.getElementById(`queen_${king.id}`);
    if (node) {
      node.style.height = `calc(var(--paxRenCardScale) * ${queen.height}px)`;
    }
    this.queenStocks[king.empire].addCard(queen);
  }

  public async removeQueen({
    queen,
    king,
  }: {
    queen: QueenCard;
    king: EmpireCard;
  }) {
    const node = document.getElementById(`queen_${king.id}`);
    if (node) {
      node.style.height = `0px`;
    }
    this.updateEmpireCardHeight({ card: king });
  }

  private updateEmpireCardHeight({
    card,
    vassalChange = 0,
    queenHeightChange = 0,
  }: {
    card: EmpireCard;
    vassalChange?: number;
    queenHeightChange?: number;
  }) {
    console.log('queenCards', card, 'vassalChange', vassalChange, 'queenHeightChange', queenHeightChange);
    const empire = card.empire;
    const numberOfVassals =
      this.vassalStocks[empire].getCards().length + vassalChange;
    let queenHeight = 0 + queenHeightChange;
    const queenCards = this.queenStocks[empire].getCards();
    console.log('queenCards', queenCards);
    queenCards.forEach((card: QueenCard) => {
      queenHeight = queenHeight + card.height;
    });

    const node = document.getElementById(card.id);
    node.style.minHeight = `calc(var(--paxRenCardScale) * ${
      (numberOfVassals + 1) * 151 + numberOfVassals * 12 + queenHeight
    }px)`;
  }
}
