const tplCardTooltipContainer = ({ card, content }: { card: string; content: string }): string => {
  return `<div class="pr_card_tooltip">
  <div class="pr_card_tooltip_inner_container">
    ${content}
  </div>
  ${card}
</div>`;
};


const tplTableauCardTooltip = ({card}: {card: TableauCard}) => {
  const dataCardId = card.id.split('_')[0];
  console.log('dataCardId',dataCardId);
  return tplCardTooltipContainer({
    card: `<div class="pr_card" data-card-id="${card.id.split('_')[0]}"></div>`,
    content: `
      <span class="pr_title">${_(card.name)}</span>
      ${card.flavorText.map((text) => `<span class="pr_flavor_text">${_(text)}</span>`).join('')}
    `
  })
}