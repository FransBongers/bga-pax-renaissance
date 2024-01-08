const getTotalHeightQueens = ({ queens }: { queens: QueenCard[] }) => {
  let totalHeight = 0;
  queens.forEach((queen) => {
    totalHeight = totalHeight + queen.height;
  });
  return totalHeight;
};

const tplTokensContainer = ({ id }: { id: string }) => `
  <div id="${id}_tokens" class="pr_card_tokens_container"></div>`;

const tplVassalsContainer = ({ id }: { id: string }) => `
  <div id="vassals_${id}" class="pr_vassals_container"></div>`;

const tplQueen = ({ queen }: { queen: QueenCard; }) => {
  return `<div id="${queen.id}-front" class="pr_card" data-card-id="${
    queen.id.split("_")[0]
  }">
    <div id="${queen.id}_tokens" class="pr_card_tokens_container"></div>
  </div>`;
};

const tplQueenContainer = ({
  id,
}: {
  id: string;
}) => {
  return `
  <div id="queens_${id}" class="pr_queens_container">
    
  </div>`;
};

