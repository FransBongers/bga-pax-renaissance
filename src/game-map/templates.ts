const tplToken = ({
  id,
  type,
  separator,
}: {
  id?: string;
  type: string;
  separator: string;
}) => {
  return `<div ${
    id ? `id="${id}"` : ""
  } class="pr_token pr_${type}" data-separator="${separator}"></div>`;
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
  ${Object.entries(THRONES_CONFIG)
    .map(
      ([empire, { top, left, location, empireSquareId }]) =>
        `<div id="pr_${empire}_throne" class="pr_empire_throne pr_empire_throne_${location}" style="top: calc(var(--paxRenMapScale) * ${top}px); left: calc(var(--paxRenMapScale) * ${left}px);">
          <div id="pr_${empire}_coat_of_arms" class="pr_empire_throne_coat_of_arms"></div>
          <div id="${empireSquareId}_throne_tokens" class="pr_empire_throne_tokens"></div>
        </div>`
    )
    .join("")}
`;
// `<div id="pr_empire_${empire}" class="pr_square_card" data-card-id="null" style="position: absolute; top: calc(var(--paxRenCardScale) * ${top}px); left: calc(var(--paxRenCardScale) * ${left}px);"></div>`

const tplGameMapMapBorders = () => {
  return Object.entries(BORDER_CONFIG)
    .map(
      ([border, coords]) =>
        `<div id="pr_${border}" class="pr_border" style="top: calc(var(--paxRenMapScale) * ${coords.top}px); left: calc(var(--paxRenMapScale) * ${coords.left}px);"></div>`
    )
    .join("");
};

// style="top: calc(var(--paxRenMapScale) * ${coords.top}px); left: calc(var(--paxRenMapScale) * ${coords.left}px);"

const tplGameMapMapCards = () => {
  const htmlArray = Object.entries(MAP_CONFIG).map(
    ([empire, data]) => `
  <div id="pr_${empire}" class="pr_map_card" data-card-id="medieval_${empire}">
    ${Object.entries(data.cities)
      .map(([city, coords]) => {
        if (city === VENICE_2) {
          return `<div id="${city}_overlay" style="top: calc(var(--paxRenMapScale) * ${coords.top}px); left: calc(var(--paxRenMapScale) * ${coords.left}px); opacity: 0;">
                    <div id="pr_${city}" class="pr_city"></div>
                  </div>`;
        } else {
          return `<div id="pr_${city}" data-city-id="${city}" class="pr_city"></div>`;
        }        
      })
      .join("")}
  </div>
`
  );

  return htmlArray.join("");
};

const tplGameMapVictoryCards = ({ageOfReformation = false}: {ageOfReformation?: boolean}) => `
  ${Object.entries(VICTORY_CARD_CONFIG)
    .map(
      ([victory, { top, left }]) =>
        `<div id="pr_${victory}_slot" class="pr_victory_slot"${ageOfReformation ? ' data-map-type="ageOfReformation"' : ''}></div>`
    )
    .join("")}
  `;

const tplGameMap = ({ageOfReformation = false}: {ageOfReformation?: boolean}) => `
  <div id="pr_game_map">
    ${tplGameMapVictoryCards({ageOfReformation})}
    ${tplGameMapEmpireCards()}
    ${tplGameMapMapCards()}
    ${tplGameMapMapBorders()}
    ${tplGameMapSupply()}
    ${tplGameMapMarket()}
  </div>`;
