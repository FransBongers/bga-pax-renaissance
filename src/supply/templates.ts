
const SUPPLY_TOKENS_CONFIG: {
  type: string;
  religion: string;
}[] = [
  {
    type: BISHOP,
    religion: CATHOLIC,
  },
  {
    type: BISHOP,
    religion: ISLAMIC,
  },
  {
    type: BISHOP,
    religion: REFORMIST,
  },
  {
    type: KNIGHT,
    religion: CATHOLIC,
  },
  {
    type: KNIGHT,
    religion: ISLAMIC,
  },
  {
    type: KNIGHT,
    religion: REFORMIST,
  },
  {
    type: ROOK,
    religion: CATHOLIC,
  },
  {
    type: ROOK,
    religion: ISLAMIC,
  },
  {
    type: ROOK,
    religion: REFORMIST,
  },
];

const tplTokenCounter = ({id, separator, type}: {id: string; separator: string; type: string}) => {
  return `
    <div class="pr_token_counter_container" data-token-type="${type}">
      <div class="pr_token_counter_token">
        ${tplToken({id, type, separator})}
      </div>
      <span id="${id}_counter" ></span>
    </div>`
}

const tplGameMapSupply = ({title}: {title: string;}) => {
  return `
    <div id="pr_supply">
      <span>${title}</span>
      <div id="pr_supply_counters">

      </div>
    </div>
  `
}
