class Supply {
  private game: PaxRenaissanceGame;
  private tokenCounters: {
    [CATHOLIC]: {
      [BISHOP]: TokenCounter;
      [KNIGHT]: TokenCounter;
      [PIRATE]: TokenCounter;
      [ROOK]: TokenCounter;
    };
    [ISLAMIC]: {
      [BISHOP]: TokenCounter;
      [KNIGHT]: TokenCounter;
      [PIRATE]: TokenCounter;
      [ROOK]: TokenCounter;
    };
    [REFORMIST]: {
      [BISHOP]: TokenCounter;
      [KNIGHT]: TokenCounter;
      [PIRATE]: TokenCounter;
      [ROOK]: TokenCounter;
    };
    banks: {
      [COEUR]?: TokenCounter;
      [FUGGER]?: TokenCounter;
      [MARCHIONNI]?: TokenCounter;
      [MEDICI]?: TokenCounter;
    };
  } = {
    [CATHOLIC]: {
      [BISHOP]: new TokenCounter(),
      [KNIGHT]: new TokenCounter(),
      [PIRATE]: new TokenCounter(),
      [ROOK]: new TokenCounter(),
    },
    [ISLAMIC]: {
      [BISHOP]: new TokenCounter(),
      [KNIGHT]: new TokenCounter(),
      [PIRATE]: new TokenCounter(),
      [ROOK]: new TokenCounter(),
    },
    [REFORMIST]: {
      [BISHOP]: new TokenCounter(),
      [KNIGHT]: new TokenCounter(),
      [PIRATE]: new TokenCounter(),
      [ROOK]: new TokenCounter(),
    },
    banks: {},
  };

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
    const gamedatas = game.gamedatas;

    this.setupTokenCounters({ gamedatas });
  }

  public updateInterdace({
    gamedatas,
  }: {
    gamedatas: PaxRenaissanceGamedatas;
  }) {
    [BISHOP, KNIGHT, ROOK, PIRATE].forEach((type) => {
      RELIGIONS.forEach((religion) => {
        const counter: TokenCounter = this.tokenCounters[religion][type];
        counter.setValue(gamedatas.tokens.supply[religion][type]);
      });
    });

    const entries = Object.entries(gamedatas.tokens.supply.banks);
    entries.forEach(([bank, count]) => {
      const counter: TokenCounter = this.tokenCounters.banks[bank];
      counter.setValue(count);
    });
  }

  private setupTokenCounters({
    gamedatas,
  }: {
    gamedatas: PaxRenaissanceGamedatas;
  }) {
    [BISHOP, KNIGHT, ROOK, PIRATE].forEach((type) => {
      RELIGIONS.forEach((religion) => {
        const counter: TokenCounter = this.tokenCounters[religion][type];
        counter.setup({
          separator: religion,
          type,
          value: gamedatas.tokens.supply[religion][type],
        });
      });
    });

    const entries = Object.entries(gamedatas.tokens.supply.banks);
    entries.forEach(([bank, count]) => {
      this.tokenCounters.banks[bank] = new TokenCounter();
      const counter: TokenCounter = this.tokenCounters.banks[bank];
      counter.setup({ separator: bank, type: PAWN, value: count });
    });
  }

  public incValue({
    bank,
    religion,
    type,
    value,
  }: {
    bank?: string;
    religion?: string;
    type: string;
    value: number;
  }) {
    let counter = null;
    if (type === PAWN) {
      counter = this.tokenCounters?.banks?.[bank];
    } else {
      counter = this.tokenCounters?.[religion]?.[type];
    }

    if (!counter) {
      return;
    }
    counter.incValue(value);
  }
}
