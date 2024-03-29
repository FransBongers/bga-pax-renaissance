class VictoryCardManager extends CardManager<VictoryCard> {
  private victoryCardStocks: {
    [VICTORY_RENAISSANCE]: LineStock<VictoryCard>;
    [VICTORY_GLOBALIZATION]: LineStock<VictoryCard>;
    [VICTORY_AGE_OF_BYZANTINE]?: LineStock<VictoryCard>;
    [VICTORY_IMPERIAL]: LineStock<VictoryCard>;
    [VICTORY_HOLY]: LineStock<VictoryCard>;
  };

  constructor(public game: PaxRenaissanceGame) {
    super(game, {
      getId: (card) => `${card.id}`,
      setupDiv: (card, div: HTMLElement) => {
        div.style.width = "calc(var(--paxRenCardScale) * 151px)";
        div.style.height = "calc(var(--paxRenCardScale) * 151px)";
        this.game.tooltipManager.addVictoryCardTooltip({
          nodeId: card.id,
          card,
        });
      },
      setupFrontDiv: (card, div: HTMLElement) => this.setupFrontDiv(card, div),
      setupBackDiv: (card, div: HTMLElement) => this.setupBackDiv(card, div),
      isCardVisible: (card) => {
        return card.side === ACTIVE;
      },
      animationManager: game.animationManager,
    });

    this.setupVictorySquares();
  }

  updateCardTooltips() {
    Object.values(this.victoryCardStocks).forEach((stock) => {
      stock.getCards().forEach((card) => {
        this.game.tooltipManager.removeTooltip(card.id);
        this.game.tooltipManager.addVictoryCardTooltip({
          nodeId: card.id,
          card,
        });
      });
    });
  }

  clearInterface() {
    Object.keys(this.victoryCardStocks).forEach((key) => {
      this.victoryCardStocks[key].removeAll();
    });
  }

  updateInterface({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    this.setupCards({ gamedatas });
  }

  setupFrontDiv(card: VictoryCard, div: HTMLElement) {
    div.setAttribute("data-card-id", `${card.location}_active`);
    div.classList.add("pr_square_card");
  }

  setupBackDiv(card: VictoryCard, div: HTMLElement) {
    div.setAttribute("data-card-id", `${card.location}_inactive`);
    div.classList.add("pr_square_card");
  }

  setupVictorySquares() {
    this.victoryCardStocks = {
      [VICTORY_RENAISSANCE]: new LineStock<VictoryCard>(
        this,
        document.getElementById(`pr_${VICTORY_RENAISSANCE}_slot`)
      ),
      [VICTORY_GLOBALIZATION]: new LineStock<VictoryCard>(
        this,
        document.getElementById(`pr_${VICTORY_GLOBALIZATION}_slot`)
      ),
      [VICTORY_IMPERIAL]: new LineStock<VictoryCard>(
        this,
        document.getElementById(`pr_${VICTORY_IMPERIAL}_slot`)
      ),
      [VICTORY_HOLY]: new LineStock<VictoryCard>(
        this,
        document.getElementById(`pr_${VICTORY_HOLY}_slot`)
      ),
    };
    if (this.game.gameOptions.ageOfReformationPromo) {
      this.victoryCardStocks[VICTORY_AGE_OF_BYZANTINE] =
        new LineStock<VictoryCard>(
          this,
          document.getElementById(`pr_${VICTORY_AGE_OF_BYZANTINE}_slot`)
        );
    }

    this.setupCards({ gamedatas: this.game.gamedatas });
  }

  setupCards({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    gamedatas.victoryCards.forEach((card) => {
      // if (card.id === 'VictoryAgeOfByzantine') {
      //   return;
      // }
      this.victoryCardStocks[card.location].addCard(card);
    });
  }
}
