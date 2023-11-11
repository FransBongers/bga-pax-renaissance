const tplChessPiece = ({ id }: { id: string }) => {
  const type = id.split('_')[0];
  const religion = id.split('_')[1];
  return `<div id="${id}" class="pr_chess_piece pr_${type}" data-religion="${religion}"></div>`;
};

const tplGameMapMarket = () => `
  <div id="pr_market_west_0" class="pr_market" style="top: 950px; left: 93px;"></div>
  <div id="pr_market_west_1" class="pr_market" style="top: 950px; left: 256px;"></div>
  <div id="pr_market_west_2" class="pr_market" style="top: 950px; left: 425px;"></div>
  <div id="pr_market_west_3" class="pr_market" style="top: 950px; left: 594px;"></div>
  <div id="pr_market_west_4" class="pr_market" style="top: 950px; left: 762px;"></div>
  <div id="pr_market_west_5" class="pr_market" style="top: 950px; left: 931px;"></div>
  <div id="pr_market_west_deck_container" class="pr_market" style="top: 950px; left: 1095px;">
    <div id="pr_market_west_deck"></div>
  </div>
  <div id="pr_market_east_0" class="pr_market" style="top: 1200px; left: 93px;"></div>
  <div id="pr_market_east_1" class="pr_market" style="top: 1200px; left: 256px;"></div>
  <div id="pr_market_east_2" class="pr_market" style="top: 1200px; left: 425px;"></div>
  <div id="pr_market_east_3" class="pr_market" style="top: 1200px; left: 594px;"></div>
  <div id="pr_market_east_4" class="pr_market" style="top: 1200px; left: 762px;"></div>
  <div id="pr_market_east_5" class="pr_market" style="top: 1200px; left: 931px;"></div>
  <div id="pr_market_east_deck_container" class="pr_market" style="top: 1200px; left: 1095px;">
    <div id="pr_market_east_deck"></div>
  </div>
`;

const tplGameMapEmpireCards = () => `
<div id="pr_empire_england" class="pr_square_card" data-card-id="null" style="top: 120px; left: 349px;"></div>
  <div id="pr_empire_france" class="pr_square_card" data-card-id="null" style="top: 120px; left: 526px;"></div>
  <div id="pr_empire_holy_roman_empire" class="pr_square_card" data-card-id="null" style="top: 120px; left: 700px;"></div>
  <div id="pr_empire_hungary" class="pr_square_card" data-card-id="null" style="top: 120px; left: 876px;"></div>
  <div id="pr_empire_byzantium" class="pr_square_card" data-card-id="null" style="top: 120px; left: 1052px;"></div>
  <div id="pr_empire_portugal" class="pr_square_card" data-card-id="null" style="top: 754px; left: 349px;"></div>
  <div id="pr_empire_aragon" class="pr_square_card" data-card-id="null" style="top: 754px; left: 526px;"></div>
  <div id="pr_empire_papal_states" class="pr_square_card" data-card-id="null" style="top: 754px; left: 700px;"></div>
  <div id="pr_empire_ottoman" class="pr_square_card" data-card-id="null" style="top: 754px; left: 876px;"></div>
  <div id="pr_empire_mamluk" class="pr_square_card" data-card-id="null" style="top: 754px; left: 1052px;"></div>
`;

const tplGameMapMapCards = () => {


  const htmlArray = Object.entries(MAP_CONFIG).map(
    ([empire, data]) => `
  <div id="pr_empire_${empire}" class="pr_map_card" data-card-id="medieval_${empire}" style="top: ${
      data.top
    }px; left: ${data.left}px">
    ${Object.entries(data.cities)
      .map(
        ([city, coords]) =>
          `<div id="pr_city_${city}" class="pr_city" style="top: ${coords.top}px; left: ${coords.left}px"></div>`
      )
      .join("")}
  </div>
`
  );

  return htmlArray.join("");
};

const tplGameMapVictoryCards = () => `
  <div class="pr_square_card" data-card-id="victory_renaissance_inactive" style="top: 120.5px; left: 135.5px;"></div>
  <div class="pr_square_card" data-card-id="victory_globalization_inactive" style="top: 296px; left: 135.5px;"></div>
  <div class="pr_square_card" data-card-id="victory_imperial_inactive" style="top: 578px; left: 135.5px;"></div>
  <div class="pr_square_card" data-card-id="victory_holy_inactive" style="top: 753.5px; left: 135.5px;"></div>
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
