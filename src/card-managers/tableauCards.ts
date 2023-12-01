class TableauCardManager extends CardManager<TableauCard> {

  constructor(public game: PaxRenaissanceGame) {
    super(game, {
      getId: (card) => card.id.split("_")[0],
      setupDiv: (card, div) => {
        // div.classList.add("pr_card");
        div.style.width = "calc(var(--paxRenCardScale) * 151px)";
        div.style.height = "calc(var(--paxRenCardScale) * 230px)";

        // div.style.position = 'relative';
      },
      setupFrontDiv: (card, div: HTMLElement) => this.setupFrontDiv(card, div),
      setupBackDiv: (card, div: HTMLElement) => this.setupBackDiv(card, div),
      isCardVisible: (card) => this.isCardVisible(card),
      animationManager: game.animationManager,
    });
  }

  setupFrontDiv(card: TableauCard, div: HTMLElement) {
    // console.log("setupFrontDiv", card);
    div.classList.add("pr_card");
    div.setAttribute("data-card-id", card.id.split("_")[0]);
    div.style.width = "calc(var(--paxRenCardScale) * 151px)";
    div.style.height = "calc(var(--paxRenCardScale) * 230px)";
    // div.style.background = 'blue';
    // div.classList.add('mygame-card-front');
    // div.id = `card-${card.id}-front`;
    // this.addTooltipHtml(div.id, `tooltip de ${card.type}`);
    if (!card.id.startsWith("FAKE")) {
      this.game.tooltipManager.addCardTooltip({
        nodeId: card.id.split("_")[0] + "-front",
        card,
      });
    }
  }

  setupBackDiv(card: TableauCard, div: HTMLElement) {
    div.classList.add("pr_card");
    div.setAttribute(
      "data-card-id",
      card.region === EAST ? "EAST_BACK" : "WEST_BACK"
    );
    div.style.width = "calc(var(--paxRenCardScale) * 151px)";
    div.style.height = "calc(var(--paxRenCardScale) * 230px)";
  }

  isCardVisible({ location }: TableauCard) {
    if (location.startsWith("deck")) {
      return false;
    }
    if (location === "market_west_0" || location === "market_east_0") {
      return false;
    }
    return true;
  }
  Ì;
}
