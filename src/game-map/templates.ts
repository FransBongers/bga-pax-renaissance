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
          <div id="pr_${empire}_coat_of_arms" class="pr_empire_throne_coat_of_arms pr_coat_of_arms"></div>
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

  const tplGameMapTheocraciesCounter = ({religion}: {religion: string;}) => `
  <div class="pr_supreme_religion_token_counter">
  <div class="pr_supreme_religion_tokens_theocracies_icon_container">
    <div class="pr_token pr_pirate" data-separator="${religion}"></div>
    <div class="pr_token pr_knight" data-separator="${religion}" style="margin-left: calc(var(--paxRenMapScale) * -20px);"></div>
    <div class="pr_token pr_rook" data-separator="${religion}" style="margin-left: calc(var(--paxRenMapScale) * -8px);"></div>
  </div>
  <span id="pr_tokens_theocracies_counter_${religion}"></span>
</div>
  `

  const tplGameMapSupremeReligion = () => `
  <div id="pr_supreme_religion_container">
    <div class="pr_religion_icons">
      <div id="pr_catholic_icon" class="pr_religion_icon" data-religion="catholic"></div>
      <div id="pr_islamic_icon" class="pr_religion_icon" data-religion="islamic"></div>
      <div id="pr_reformist_icon" class="pr_religion_icon" data-religion="reformist"></div>
    </div>
    <div id="pr_supreme_religion_bishops">
      <div class="pr_supreme_religion_bishop_counter" style="margin-left: calc(var(--paxRenMapScale) * 26px);">
        <div id="bishop_catholic_sr" class="pr_token pr_bishop" data-separator="catholic"></div>
        <span id="pr_supreme_religion_bishop_counter_catholic"></span>
      </div>
      <div class="pr_supreme_religion_bishop_counter">
        <div id="bishop_islamic_sr" class="pr_token pr_bishop" data-separator="islamic"></div>
        <span id="pr_supreme_religion_bishop_counter_islamic"></span>
      </div>
      <div class="pr_supreme_religion_bishop_counter" style="margin-right: calc(var(--paxRenMapScale) * 19px);">
        <div id="bishop_reformist_sr" class="pr_token pr_bishop" data-separator="reformist"></div>
        <span id="pr_supreme_religion_bishop_counter_reformist"></span>
      </div>
    </div>
    <div id="pr_supreme_religion_tokens_theocracies">
      ${RELIGIONS.map((religion) => tplGameMapTheocraciesCounter({religion})).join('')}
    </div>
  </div>
  `
  // <span>Supreme Religion</span>
const tplGameMap = ({ageOfReformation = false}: {ageOfReformation?: boolean}) => `
  <div id="pr_game_map">
    ${tplGameMapVictoryCards({ageOfReformation})}
    ${tplGameMapEmpireCards()}
    ${tplGameMapMapCards()}
    ${tplGameMapMapBorders()}
    ${tplGameMapSupremeReligion()}
    ${tplGameMapSupply({title: _('Supply')})}
    ${tplGameMapMarket()}
  </div>`;
