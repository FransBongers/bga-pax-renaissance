class TableauCardManager extends CardManager<EmpireCard | TableauCard> {
  constructor(public game: PaxRenaissanceGame) {
    super(game, {
      getId: (card) => card.id,
      setupDiv: (card, div) => {
        // div.classList.add("pr_card");
        if (card.type === TABLEAU_CARD) {
          div.style.width = "calc(var(--paxRenCardScale) * 151px)";
          div.style.height = "calc(var(--paxRenCardScale) * 230px)";
        } else {
          div.style.width = "calc(var(--paxRenCardScale) * 151px)";
          div.style.height = "calc(var(--paxRenCardScale) * 151px)";
        }
        div.insertAdjacentHTML('beforeend', tplTokensContainer({id: card.id}));
        // div.style.position = 'relative';
      },
      setupFrontDiv: (card, div: HTMLElement) => this.setupFrontDiv(card, div),
      setupBackDiv: (card, div: HTMLElement) => this.setupBackDiv(card, div),
      isCardVisible: (card) => this.isCardVisible(card),
      animationManager: game.animationManager,
    });
  }

  // `<div id="pr_empire_${empire}" class="pr_square_card" data-card-id="null" style="position: absolute; top: calc(var(--paxRenCardScale) * ${top}px); left: calc(var(--paxRenCardScale) * ${left}px);"></div>`

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

  isCardVisible({ location }: EmpireCard | TableauCard) {
    if (location.startsWith("deck")) {
      return false;
    }
    if (location === "market_west_0" || location === "market_east_0") {
      return false;
    }
    return true;
  }
}
