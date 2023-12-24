const tplTokensContainer = ({id}: {id: string;}) => `
  <div id="${id}_tokens" class="pr_card_tokens_container"></div>`

  const tplVassalsContainer = ({id}: {id: string;}) => `
  <div id="vassals_${id}" class="pr_vassals_container"></div>`

  const tplQueenContainer = ({id, queen}: {id: string; queen: QueenCard | null}) => `
  <div id="queen_${id}" class="pr_queen_container" style="height: calc(var(--paxRenCardScale) * ${queen?.height || 0}px);">
    ${queen === null ? '' : `<div id="${queen.id}-front" class="pr_card" data-card-id="${queen.id.split("_")[0]}"></div>`}
  </div>`


  // style="height: calc(var(--paxRenCardScale) * ${queen.height}px);"