const tplChessPiece = ({ id }: { id: string }) => {
  const type = id.split('_')[0];
  const religion = id.split('_')[1];
  return `<div id="${id}" class="pr_chess_piece pr_${type}" data-religion="${religion}"></div>`;
};

const tplGameMapMarket = () => `
  ${MARKET_WEST_CONFIG.map(({top, left}, index) => `<div id="pr_market_west_${index}" class="pr_market" style="top: calc(var(--paxRenMapScale) * ${top}px); left: calc(var(--paxRenMapScale) * ${left}px);"></div>`).join('') }
  <div id="pr_market_west_deck_container" class="pr_market" style="top: calc(var(--paxRenCardScale) * 950px); left: calc(var(--paxRenCardScale) * 1095px);">
    <div id="pr_market_west_deck"></div>
  </div>
  ${MARKET_EAST_CONFIG.map(({top, left}, index) => `<div id="pr_market_east_${index}" class="pr_market" style="top: calc(var(--paxRenMapScale) * ${top}px); left: calc(var(--paxRenMapScale) * ${left}px);"></div>`).join('') }
  <div id="pr_market_east_deck_container" class="pr_market" style="top:  calc(var(--paxRenCardScale) * 1200px); left: calc(var(--paxRenCardScale) * 1095px);">
    <div id="pr_market_east_deck"></div>
  </div>
`;

const tplGameMapEmpireCards = () => `
  ${Object.entries(EMPIRE_CARD_CONFIG).map(([empire, {top, left}]) => `<div id="pr_empire_${empire}" class="pr_square_card" data-card-id="null" style="top: calc(var(--paxRenCardScale) * ${top}px); left: calc(var(--paxRenCardScale) * ${left}px);"></div>`).join('')}
`;

const tplGameMapMapCards = () => {
  const htmlArray = Object.entries(MAP_CONFIG).map(
    ([empire, data]) => `
  <div id="pr_empire_${empire}" class="pr_map_card" data-card-id="medieval_${empire}" style="top: calc(var(--paxRenMapScale) * ${data.top}px); left: calc(var(--paxRenMapScale) * ${data.left}px);">
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
  <div class="pr_square_card" data-card-id="victory_renaissance_inactive" style="top: calc(var(--paxRenCardScale) * 120.5px); left: calc(var(--paxRenCardScale) * 135.5px);"></div>
  <div class="pr_square_card" data-card-id="victory_globalization_inactive" style="top: calc(var(--paxRenCardScale) * 296px); left: calc(var(--paxRenCardScale) * 135.5px);"></div>
  <div class="pr_square_card" data-card-id="victory_imperial_inactive" style="top: calc(var(--paxRenCardScale) * 578px); left: calc(var(--paxRenCardScale) * 135.5px);"></div>
  <div class="pr_square_card" data-card-id="victory_holy_inactive" style="top: calc(var(--paxRenCardScale) * 753.5px); left: calc(var(--paxRenCardScale) * 135.5px);"></div>
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
    ${tplGameMapMarket()}
  </div>
</div>`;

// <div class="pr_chess_piece pr_bishop" data-religion="reformist" style="top: 831px; left: 1056px;"></div>
// <i class="fa-regular fa-magnifying-glass-plus"></i>
// <div class="pr_chess_piece pr_pawn" data-color="purple" style="top: 656px; left: 1028px;"></div>
// <div class="pr_chess_piece pr_knight" data-religion="catholic" style="top: 389px; left: 1056px;"></div>
// <div class="pr_chess_piece pr_rook" data-religion="islamic" style="top: 533px; left: 890px;"></div>
