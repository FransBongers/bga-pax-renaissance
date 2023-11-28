class Supply {
  private game: PaxRenaissanceGame;
  private chessPieceCounters: {
    [CATHOLIC]: {
      [BISHOP]: ChessPieceCounter;
      [KNIGHT]: ChessPieceCounter;
      [ROOK]: ChessPieceCounter;
    };
    [ISLAMIC]: {
      [BISHOP]: ChessPieceCounter;
      [KNIGHT]: ChessPieceCounter;
      [ROOK]: ChessPieceCounter;
    };
    [REFORMIST]: {
      [BISHOP]: ChessPieceCounter;
      [KNIGHT]: ChessPieceCounter;
      [ROOK]: ChessPieceCounter;
    };
  } = {
    [CATHOLIC]: {
      [BISHOP]: new ChessPieceCounter(),
      [KNIGHT]: new ChessPieceCounter(),
      [ROOK]: new ChessPieceCounter(),
    },
    [ISLAMIC]: {
      [BISHOP]: new ChessPieceCounter(),
      [KNIGHT]: new ChessPieceCounter(),
      [ROOK]: new ChessPieceCounter(),
    },
    [REFORMIST]: {
      [BISHOP]: new ChessPieceCounter(),
      [KNIGHT]: new ChessPieceCounter(),
      [ROOK]: new ChessPieceCounter(),
    },
  };

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
    const gamedatas = game.gamedatas;

    this.setupChessPieceCounters({gamedatas});
  }

  private setupChessPieceCounters({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    console.log('setupChessPieceCounters');
    [BISHOP, KNIGHT, ROOK].forEach((type) => {
      RELIGIONS.forEach((religion) => {
        const counter: ChessPieceCounter = this.chessPieceCounters[religion][type];
        counter.setup({religion, type, value: gamedatas.tokens.supply[religion][type]});
      })
    })
  }

  public incValue({religion, type, value}: {religion: string; type: string; value: number;}) {
    const counter = this.chessPieceCounters?.[religion]?.[type];
    if (!counter) {
      return;
    }
    counter.incValue(value);
  }
}