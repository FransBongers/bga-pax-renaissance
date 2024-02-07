const createEmpireCardContainerId = (card: EmpireCard) => {
  return `${card.empire}_container`;
}

const createEmpireCardContainer = (card: EmpireCard): EmpireCardContainer => {
  const {empire, state, location} = card;
  const container: EmpireCardContainer = {
    type: EMPIRE_CARD_CONTAINER,
    id: `${empire}_container`,
    empireId: empire,
    card,
    state,
    location,
  };
  return container;
}

const noMarriedQueensNoVassals = (card: TableauCard | EmpireCard): boolean => {
  if (card.isQueen && (card as QueenCard).hasKing) {
    return false;
  }
  return card.type === TABLEAU_CARD || !card.isVassal;
}

const getTotalHeightQueens = ({ queens }: { queens: QueenCard[] }) => {
  let totalHeight = 0;
  queens.forEach((queen) => {
    totalHeight = totalHeight + queen.height;
  });
  return totalHeight;
};

const tplOperationSelect = ({
  operation,
  cardId,
  side,
}: {
  operation: TableauOp;
  cardId: string;
  side: "king" | "republic" | null;
}): string =>
  `<div id="pr_${cardId}_${operation.id}${
    side ? `_${side}` : ""
  }" class="pr_tableau_op_select" style="top: calc(var(--paxRenCardScale) * ${
    operation.top
  }px); left: calc(var(--paxRenCardScale) * ${operation.left}px);"></div>`;

const tplTokensContainer = ({ id }: { id: string }) => `
  <div id="${id}_tokens" class="pr_card_tokens_container"></div>`;

const tplVassalsContainer = ({ id }: { id: string }) => `
  <div id="vassals_${id}" class="pr_vassals_container"></div>`;

const tplQueen = ({ queen }: { queen: QueenCard }) => {
  return `<div id="${queen.id}" class="pr_card" data-card-id="${
    queen.id.split("_")[0]
  }">
    <div id="${queen.id}_tokens" class="pr_card_tokens_container"></div>
  </div>`;
};

const tplQueenContainer = ({ id }: { id: string }) => {
  return `
  <div id="queens_${id}" class="pr_queens_container">
    
  </div>`;
};
