class Supply {
  private game: PaxRenaissanceGame;
  private chessPieceCounters: {
    [CATHOLIC]: {
      [BISHOP]: ChessPieceCounter;
      [KNIGHT]: ChessPieceCounter;
      [PIRATE]: ChessPieceCounter;
      [ROOK]: ChessPieceCounter;
    };
    [ISLAMIC]: {
      [BISHOP]: ChessPieceCounter;
      [KNIGHT]: ChessPieceCounter;
      [PIRATE]: ChessPieceCounter;
      [ROOK]: ChessPieceCounter;
    };
    [REFORMIST]: {
      [BISHOP]: ChessPieceCounter;
      [KNIGHT]: ChessPieceCounter;
      [PIRATE]: ChessPieceCounter;
      [ROOK]: ChessPieceCounter;
    };
    banks: {
      [COEUR]?: ChessPieceCounter;
      [FUGGER]?: ChessPieceCounter;
      [MARCHIONNI]?: ChessPieceCounter;
      [MEDICI]?: ChessPieceCounter;
    }
  } = {
    [CATHOLIC]: {
      [BISHOP]: new ChessPieceCounter(),
      [KNIGHT]: new ChessPieceCounter(),
      [PIRATE]: new ChessPieceCounter(),
      [ROOK]: new ChessPieceCounter(),
    },
    [ISLAMIC]: {
      [BISHOP]: new ChessPieceCounter(),
      [KNIGHT]: new ChessPieceCounter(),
      [PIRATE]: new ChessPieceCounter(),
      [ROOK]: new ChessPieceCounter(),
    },
    [REFORMIST]: {
      [BISHOP]: new ChessPieceCounter(),
      [KNIGHT]: new ChessPieceCounter(),
      [PIRATE]: new ChessPieceCounter(),
      [ROOK]: new ChessPieceCounter(),
    },
    banks: {}
  };

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
    const gamedatas = game.gamedatas;

    this.setupChessPieceCounters({gamedatas});
  }

  private setupChessPieceCounters({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    console.log('setupChessPieceCounters');
    [BISHOP, KNIGHT, ROOK, PIRATE].forEach((type) => {
      RELIGIONS.forEach((religion) => {
        const counter: ChessPieceCounter = this.chessPieceCounters[religion][type];
        counter.setup({religion, type, value: gamedatas.tokens.supply[religion][type]});
      })
    });

    const entries = Object.entries(gamedatas.tokens.supply.banks);
    console.log('entries',entries);
    entries.forEach(([bank, count]) => {
      console.log('entry', bank, count);
      this.chessPieceCounters.banks[bank] = new ChessPieceCounter();
      const counter: ChessPieceCounter = this.chessPieceCounters.banks[bank] 
      counter.setup({bank, type: PAWN, value: count});
    })
  }

  public incValue({bank, religion, type, value}: {bank?: string; religion?: string; type: string; value: number;}) {
    let counter = null;
    if (type === PAWN) {
      counter = this.chessPieceCounters?.banks?.[bank];
    } else {
      counter = this.chessPieceCounters?.[religion]?.[type];
    }
    
    if (!counter) {
      return;
    }
    counter.incValue(value);
  }
}