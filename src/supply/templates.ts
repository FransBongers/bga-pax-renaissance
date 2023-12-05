
const SUPPLY_CHESS_PIECES_CONFIG: {
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

const tplChessPieceCounter = ({id, bank, religion, type}: {id: string; bank?: string; religion?: string; type: string}) => {
  return `
    <div class="pr_chess_piece_counter_container">
      <span id="${id}_counter" ></span>
      <div class="pr_chess_piece_counter_chess_piece">
        ${type === PAWN ? tplPawn({id, bank}) :  tplChessPiece({id, type, religion})}
      </div>
    </div>`
}

const tplGameMapSupply = () => {
  return `
    <div id="pr_supply">
      
    </div>
  `
}
// ${SUPPLY_CHESS_PIECES_CONFIG.map(({type, religion}) => tplChessPiece({id: `${type}_${religion}_supply`, type, religion})).join('')}