//  .##.....##....###....########..##....##.########.########
//  .###...###...##.##...##.....##.##...##..##..........##...
//  .####.####..##...##..##.....##.##..##...##..........##...
//  .##.###.##.##.....##.########..#####....######......##...
//  .##.....##.#########.##...##...##..##...##..........##...
//  .##.....##.##.....##.##....##..##...##..##..........##...
//  .##.....##.##.....##.##.....##.##....##.########....##...

class Market {
  private game: PaxRenaissanceGame;
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
          fakeCardGenerator: (deckId: string) => this.getFakeCard({deckId, region: EAST}),
        }
      ),
      [WEST]: new Deck(
        this.game.cardManager,
        document.getElementById("pr_market_west_deck"),
        {
          cardNumber: gamedatas.market.deckCounts[WEST].cardCount,
          fakeCardGenerator: (deckId: string) => this.getFakeCard({deckId, region: WEST}),
        }
      ),
    };

    this.stocks = {
      [EAST]: [],
      [WEST]: [],
    };
    for (let i = 0; i <= 5; i++) {
      this.stocks[EAST][i] = new LineStock<TableauCard>(
        this.game.cardManager,
        document.getElementById(`pr_market_east_${i}`)
      );
      this.stocks[WEST][i] = new LineStock<TableauCard>(
        this.game.cardManager,
        document.getElementById(`pr_market_west_${i}`)
      );
    }
  }

  async setupMarket({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    gamedatas.market.cards.forEach((card) => {
      const { id, location } = card;
      const [market, region, column] = location.split("_");
      const stock = this.getStock({ region, column: Number(column) });
      stock.addCard(card);
    });
  }

  public getDeck({
    region,
  }: {
    region: 'east' | 'west';
  }): Deck<TableauCard> {
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

  private getFakeCard({deckId, region}: {deckId: string; region: 'east' | 'west'}): TableauCard {
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
}
