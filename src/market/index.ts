//  .##.....##....###....########..##....##.########.########
//  .###...###...##.##...##.....##.##...##..##..........##...
//  .####.####..##...##..##.....##.##..##...##..........##...
//  .##.###.##.##.....##.########..#####....######......##...
//  .##.....##.#########.##...##...##..##...##..........##...
//  .##.....##.##.....##.##....##..##...##..##..........##...
//  .##.....##.##.....##.##.....##.##....##.########....##...

class Market {
  private game: PaxRenaissanceGame;
  private counters: {
    [EAST]: Counter[];
    [WEST]: Counter[];
  };
  private decks: {
    [EAST]: Deck<TableauCard>;
    [WEST]: Deck<TableauCard>;
  };
  private stocks: {
    [EAST]: LineStock<TableauCard>[];
    [WEST]: LineStock<TableauCard>[];
  };

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
    const gamedatas = game.gamedatas;

    this.setupDecksAndStocks({ gamedatas });
    this.setupMarket({ gamedatas });
  }

  setupDecksAndStocks({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    this.decks = {
      [EAST]: new Deck(
        this.game.cardManager,
        document.getElementById("pr_market_east_deck"),
        {
          cardNumber: gamedatas.market.deckCounts[EAST].cardCount,
          fakeCardGenerator: (deckId: string) =>
            this.getFakeCard({ deckId, region: EAST }),
        }
      ),
      [WEST]: new Deck(
        this.game.cardManager,
        document.getElementById("pr_market_west_deck"),
        {
          cardNumber: gamedatas.market.deckCounts[WEST].cardCount,
          fakeCardGenerator: (deckId: string) =>
            this.getFakeCard({ deckId, region: WEST }),
        }
      ),
    };

    this.stocks = {
      [EAST]: [],
      [WEST]: [],
    };
    this.counters = {
      [EAST]: [],
      [WEST]: [],
    };
    for (let i = 0; i <= 5; i++) {
      this.stocks[EAST][i] = new LineStock<TableauCard>(
        this.game.cardManager,
        document.getElementById(`pr_market_east_${i}_stock`)
      );
      this.counters[EAST][i] = new ebg.counter();
      this.counters[EAST][i].create(`pr_market_east_${i}_counter`);
      this.stocks[WEST][i] = new LineStock<TableauCard>(
        this.game.cardManager,
        document.getElementById(`pr_market_west_${i}_stock`)
      );
      this.counters[WEST][i] = new ebg.counter();
      this.counters[WEST][i].create(`pr_market_west_${i}_counter`);
    }
  }

  async setupMarket({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    gamedatas.market.cards.forEach((card) => {
      const { id, location } = card;
      const [market, region, column] = location.split("_");
      const stock = this.getStock({ region, column: Number(column) });
      stock.addCard(card);
    });
    for (let i = 0; i <= 5; i++) {
      this.setFlorinValue({
        column: i,
        region: EAST,
        value: gamedatas.market.florins[EAST][i],
      });
      this.setFlorinValue({
        column: i,
        region: WEST,
        value: gamedatas.market.florins[WEST][i],
      });
    }
  }

  public getDeck({ region }: { region: "east" | "west" }): Deck<TableauCard> {
    return this.decks[region];
  }

  public getStock({
    region,
    column,
  }: {
    region: string;
    column: number;
  }): LineStock<TableauCard> {
    return this.stocks[region][column];
  }

  private getFakeCard({
    deckId,
    region,
  }: {
    deckId: string;
    region: "east" | "west";
  }): TableauCard {
    return {
      id: `FAKE-${region}`,
      type: "tableauCard",
      region,
      location: `deck_${region}`,
      flavorText: [],
      state: 0,
      name: "",
      used: 0,
    };
  }

  public incFlorinValue({
    region,
    column,
    value,
  }: {
    region: "east" | "west";
    column: number;
    value: number;
  }) {
    const currentValue = this.counters[region][column].getValue();
    this.counters[region][column].incValue(value);
    const node = document.getElementById(
      `pr_market_${region}_${column}_florins`
    );
    if (node !== null) {
      this.checkNone({ node, value: currentValue + value });
    }
  }

  private setFlorinValue({
    region,
    column,
    value,
  }: {
    region: "east" | "west";
    column: number;
    value: number;
  }) {
    this.counters[region][column].setValue(value);
    const node = document.getElementById(
      `pr_market_${region}_${column}_florins`
    );
    if (node !== null) {
      this.checkNone({ node, value });
    }
  }

  private checkNone({ node, value }: { node: HTMLElement; value: number }) {
    if (value === 0) {
      node.classList.add(PR_NONE);
    } else {
      node.classList.remove(PR_NONE);
    }
  }
}
