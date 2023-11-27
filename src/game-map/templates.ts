const tplChessPiece = ({ id, type, religion, color }: { id?: string; type: string; religion?: string; color?: string; }) => {
  return `<div ${id ? `id="${id}"` : ''} class="pr_chess_piece pr_${type}" ${religion ? `data-religion="${religion}"` : ''}${color ? `data-color="${color}"` : ''}></div>`;
};

const tplPawn = ({ id, type, bank }: { id: string; type: string; bank: string; }) => {
  return `<div id="${id}" class="pr_chess_piece pr_${type}" data-bank="${bank}"></div>`;
};


// <div id="pr_market_west_${index}_florins" class="pr_icon pr_none" data-icon="florin" data-region="west">
// <span id="pr_market_west_${index}_counter" class="pr_counter">5</span>
// </div>
// <div id="pr_market_east_${index}_florins" class="pr_icon pr_none" data-icon="florin" data-region="east">
// <span id="pr_market_east_${index}_counter" class="pr_counter"></span>
// </div>

const tplGameMapMarket = () => `
  ${MARKET_WEST_CONFIG.map(
    ({ top, left }, index) => `
  <div id="pr_market_west_${index}" class="pr_market" style="top: calc(var(--paxRenMapScale) * ${top}px); left: calc(var(--paxRenMapScale) * ${left}px);">
    <div id="pr_market_west_${index}_stock" class="pr_market_stock"></div>
    ${tplIcon({
      id: `pr_market_west_${index}_florins`,
      icon: "florin",
      classes: "pr_none",
      extra: 'data-region="west"',
      children: `<span id="pr_market_west_${index}_counter" class="pr_counter"></span>`,
    })}
  </div>`
  ).join("")}
  <div id="pr_market_west_deck_container" class="pr_market pr_card" data-card-id="WEST_BACK" style="top: calc(var(--paxRenCardScale) * 950px); left: calc(var(--paxRenCardScale) * 1095px);">
    <div id="pr_market_west_deck"></div>
    <div id="pr_market_west_deck_counter_container" class="pr_deck_counter">
      <span id="pr_market_west_deck_counter" class="pr_deck_counter_text"></span>
      <span class="pr_deck_counter_text">/</span>
      <div id="pr_deck_counter_comet3" class="pr_deck_counter_comet" data-card-id="COMET3"></div>
      <div id="pr_deck_counter_comet4" class="pr_deck_counter_comet" data-card-id="COMET4"></div>
    </div>
  </div>
  ${MARKET_EAST_CONFIG.map(
    ({ top, left }, index) => `
  <div id="pr_market_east_${index}" class="pr_market" style="top: calc(var(--paxRenMapScale) * ${top}px); left: calc(var(--paxRenMapScale) * ${left}px);">
    <div id="pr_market_east_${index}_stock" class="pr_market_stock"></div>
    ${tplIcon({
      id: `pr_market_east_${index}_florins`,
      icon: "florin",
      classes: "pr_none",
      extra: 'data-region="east"',
      children: `<span id="pr_market_east_${index}_counter" class="pr_counter"></span>`,
    })}
  </div>`
  ).join("")}
  <div id="pr_market_east_deck_container" class="pr_market pr_card" data-card-id="EAST_BACK" style="top: calc(var(--paxRenCardScale) * 1200px); left: calc(var(--paxRenCardScale) * 1095px);">
    <div id="pr_market_east_deck"></div>
    <div id="pr_market_east_deck_counter_container" class="pr_deck_counter">
      <span id="pr_market_east_deck_counter" class="pr_deck_counter_text"></span>
      <span class="pr_deck_counter_text">/</span>
      <div id="pr_deck_counter_comet1" class="pr_deck_counter_comet" data-card-id="COMET1"></div>
      <div id="pr_deck_counter_comet2" class="pr_deck_counter_comet" data-card-id="COMET2"></div>
    </div>
  </div>
`;

const tplGameMapEmpireCards = () => `
  ${Object.entries(EMPIRE_CARD_CONFIG)
    .map(
      ([empire, { top, left }]) =>
        `<div id="pr_empire_${empire}" class="pr_square_card" data-card-id="null" style="position: absolute; top: calc(var(--paxRenCardScale) * ${top}px); left: calc(var(--paxRenCardScale) * ${left}px);"></div>`
    )
    .join("")}
`;

const tplGameMapMapBorders = () => {
  return Object.entries(BORDER_CONFIG).map(([border, coords]) => `<div id="pr_${border}" class="pr_border" style="top: calc(var(--paxRenMapScale) * ${coords.top}px); left: calc(var(--paxRenMapScale) * ${coords.left}px);"></div>`).join('');
}

const tplGameMapMapCards = () => {
  const htmlArray = Object.entries(MAP_CONFIG).map(
    ([empire, data]) => `
  <div id="pr_empire_${empire}" class="pr_map_card" data-card-id="medieval_${empire}" style="top: calc(var(--paxRenMapScale) * ${
      data.top
    }px); left: calc(var(--paxRenMapScale) * ${data.left}px);">
    ${Object.entries(data.cities)
      .map(
        ([city, coords]) =>
          `<div id="pr_city_${city}" class="pr_city" style="top: calc(var(--paxRenMapScale) * ${coords.top}px); left: calc(var(--paxRenMapScale) * ${coords.left}px);"></div>`
      )
      .join("")}
  </div>
`
  );

  return htmlArray.join("");
};

const tplGameMapVictoryCards = () => `
  ${Object.entries(VICTORY_CARD_CONFIG)
    .map(
      ([victory, { top, left }]) =>
        `<div id="pr_${victory}_slot" class="pr_victory_slot" style="top: calc(var(--paxRenCardScale) * ${top}px); left: calc(var(--paxRenCardScale) * ${left}px);"></div>`
    )
    .join("")}
  `;

const tplGameMap = () => `
<div id="pr_game_map_container">
  <div class="pr_game_map_zoom_buttons">
    <button id="pr_game_map_zoom_out_button" type="button" class="bga-zoom-button bga-zoom-out-icon" style="margin-bottom: -5px;"></button>
    <button id="pr_game_map_zoom_in_button" type="button" class="bga-zoom-button bga-zoom-in-icon" style="margin-bottom: -5px;"></button>
  </div>
  <div id="pr_game_map">
    ${tplGameMapVictoryCards()}
    ${tplGameMapEmpireCards()}
    ${tplGameMapMapCards()}
    ${tplGameMapMapBorders()}
    ${tplGameMapSupply()}
    ${tplGameMapMarket()}
  </div>
</div>`;

// <div class="pr_chess_piece pr_bishop" data-religion="reformist" style="top: 831px; left: 1056px;"></div>
// <i class="fa-regular fa-magnifying-glass-plus"></i>
// <div class="pr_chess_piece pr_pawn" data-color="purple" style="top: 656px; left: 1028px;"></div>
// <div class="pr_chess_piece pr_knight" data-religion="catholic" style="top: 389px; left: 1056px;"></div>
// <div class="pr_chess_piece pr_rook" data-religion="islamic" style="top: 533px; left: 890px;"></div>
