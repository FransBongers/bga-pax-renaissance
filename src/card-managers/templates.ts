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

const tplQueenContainer = ({
  id,
  queens,
}: {
  id: string;
  queens: QueenCard[];
}) => {
  let containerHeight = getTotalHeightQueens({ queens });
  return `
  <div id="queens_${id}" class="pr_queens_container" style="height: calc(var(--paxRenCardScale) * ${containerHeight}px);">
    ${queens
      .map(
        (queen) =>
          `<div id="${queen.id}-front" class="pr_card" data-card-id="${
            queen.id.split("_")[0]
          }">
            <div id="${queen.id}_tokens" class="pr_card_tokens_container"></div>
          </div>`
      )
      .join("")}
  </div>`;
};

// style="height: calc(var(--paxRenCardScale) * ${queen.height}px);"
