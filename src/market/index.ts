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
    [EAST]: LineStock<TableauCard>;
    [WEST]: LineStock<TableauCard>;
  };
  private deckCounters: {
    [EAST]: Counter;
    [WEST]: Counter;
  } = {
    [EAST]: new ebg.counter(),
    [WEST]: new ebg.counter(),
  };
  private stocks: {
    [EAST]: LineStock<TableauCard>[];
    [WEST]: LineStock<TableauCard>[];
  };

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
    const gamedatas = game.gamedatas;

    this.setupDecks({ gamedatas });
    this.setupStocks({ gamedatas });
    this.setupMarket({ gamedatas });
  }

  setupDecks({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    this.decks = {
      [EAST]: new LineStock(
        this.game.tableauCardManager,
        document.getElementById("pr_market_east_deck")
      ),
      [WEST]: new LineStock(
        this.game.tableauCardManager,
        document.getElementById("pr_market_west_deck")
      ),
    };

    CARDINAL_DIRECTIONS.forEach((region) => {
      this.deckCounters[region].create(`pr_market_${region}_deck_counter`);
      this.deckCounters[region].setValue(gamedatas.market.deckCounts[region].cardCount);
    });
    const comets = {
      comet1: EAST,
      comet2: EAST,
      comet3: WEST,
      comet4: WEST,
    };
    Object.entries(comets).forEach(([comet, region]) => {
      if (!gamedatas.market.deckCounts[region][comet]) {
        this.setCometOpacity(comet);
      }
    });
  }

  setupStocks({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
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
        this.game.tableauCardManager,
        document.getElementById(`pr_market_east_${i}_stock`)
      );
      this.counters[EAST][i] = new ebg.counter();
      this.counters[EAST][i].create(`pr_market_east_${i}_counter`);
      this.stocks[WEST][i] = new LineStock<TableauCard>(
        this.game.tableauCardManager,
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
        value: gamedatas.market.florins[`market_${EAST}_${i}_florins`] || 0,
      });
      this.setFlorinValue({
        column: i,
        region: WEST,
        value: gamedatas.market.florins[`market_${WEST}_${i}_florins`] || 0,
      });
    }
  }

  async drawCard(card: TableauCard): Promise<void> {
    await this.decks[card.region].addCard({ ...card, location: "deck" });
    this.deckCounters[card.region].incValue(-1);
    if (card.id.startsWith('COMET')) {
      this.setCometOpacity(card.id.split('_')[0].toLowerCase());
    }
    const [_, region, column] = card.location.split("_");
    await this.getStock({ region, column: Number(column) }).addCard(card);
  }

  public getDeck({
    region,
  }: {
    region: "east" | "west";
  }): LineStock<TableauCard> {
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

  // private getFakeCard({
  //   deckId,
  //   region,
  // }: {
  //   deckId: string;
  //   region: "east" | "west";
  // }): TableauCard {
  //   return {
  //     id: `FAKE-${region}`,
  //     type: "tableauCard",
  //     region,
  //     location: `deck_${region}`,
  //     flavorText: [],
  //     state: 0,
  //     name: "",
  //     used: 0,
  //   };
  // }

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

  public setFlorinValue({
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

  public getFlorins({
    region,
    column,
  }: {
    region: "east" | "west";
    column: number;
  }) {
    return this.counters[region][column].getValue();
  }

  private checkNone({ node, value }: { node: HTMLElement; value: number }) {
    if (value === 0) {
      node.classList.add(PR_NONE);
    } else {
      node.classList.remove(PR_NONE);
    }
  }

  private setCometOpacity(comet: string) {
    const node = document.getElementById(`pr_deck_counter_${comet}`);
    if (node) {
      node.classList.add(PR_NONE);
    }
  }

  // ....###....##....##.####.##.....##....###....########.####..#######..##....##
  // ...##.##...###...##..##..###...###...##.##......##.....##..##.....##.###...##
  // ..##...##..####..##..##..####.####..##...##.....##.....##..##.....##.####..##
  // .##.....##.##.##.##..##..##.###.##.##.....##....##.....##..##.....##.##.##.##
  // .#########.##..####..##..##.....##.#########....##.....##..##.....##.##..####
  // .##.....##.##...###..##..##.....##.##.....##....##.....##..##.....##.##...###
  // .##.....##.##....##.####.##.....##.##.....##....##....####..#######..##....##

  public async moveFlorinAnimation({
    index,
    fromId,
    toId,
  }: {
    index: number;
    fromId: string;
    toId: string;
  }) {
    const from = document.getElementById(fromId);
    const to = document.getElementById(toId);
    const node = document.getElementById(`pr_game_map`);
    // const node = document.getElementById(`pr_player_panel_2371053`);

    node.insertAdjacentHTML(
      "beforeend",
      tplIcon({
        id: `temp_florin_${index}`,
        icon: "florin",
        style: "position: absolute;",
      })
    );

    const element = document.getElementById(`temp_florin_${index}`);

    // Get the top, left coordinates of two elements
    const elementRect = element.getBoundingClientRect();
    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();

    // Calculate the top and left positions
    const top = toRect.top - elementRect.top;
    const left = toRect.left - elementRect.left;

    element.style.top = `${pxNumber(element.style.top) + top}px`;
    element.style.left = `${pxNumber(element.style.left) + left}px`;

    await this.game.animationManager.play(
      new BgaSlideAnimation<BgaAnimationWithOriginSettings>({
        element,
        transitionTimingFunction: "ease-in-out",
        fromRect,
      })
    );
    element.remove();
  }

  public async moveFlorinFromPlayerCounter({
    florinLocation,
    index,
    playerId,
  }: {
    florinLocation: string;
    index: number;
    playerId: number;
  }): Promise<void> {
    const [_, region, column] = florinLocation.split("_");
    this.game.playerManager
      .getPlayer({ playerId })
      .counters.florins.incValue(-1);

    if (this.game.animationManager.animationsActive()) {
      await this.moveFlorinAnimation({
        index,
        fromId: `pr_florins_counter_${playerId}_icon`,
        toId: `pr_${florinLocation}`,
      });
    }

    this.incFlorinValue({
      region: region as "east" | "west",
      column: Number(column),
      value: 1,
    });
  }

  public async moveFlorinToPlayerCounter({
    florinLocation,
    index,
    playerId,
  }: {
    florinLocation: string;
    index: number;
    playerId: number;
  }): Promise<boolean> {
    const [_, region, column] = florinLocation.split("_");

    this.incFlorinValue({
      region: region as "east" | "west",
      column: Number(column),
      value: -1,
    });

    if (this.game.animationManager.animationsActive()) {
      await this.moveFlorinAnimation({
        index,
        toId: `pr_florins_counter_${playerId}_icon`,
        fromId: `pr_${florinLocation}`,
      });
    }

    this.game.playerManager
      .getPlayer({ playerId })
      .counters.florins.incValue(1);
    return true;
  }

  public async payFlorins({
    placedFlorins,
    playerId,
  }: {
    placedFlorins: string[];
    playerId: number;
  }): Promise<void> {
    let promises: Promise<void>[] = [];
    for (let i = 0; i < placedFlorins.length; i++) {
      // setTimeout(
      //   () =>
      promises.push(
        this.moveFlorinFromPlayerCounter({
          index: i,
          playerId,
          florinLocation: placedFlorins[i],
        })
      );
      //   i * 100
      // );
    }
    await Promise.all(promises);
    // const results = await Promise.all(promises);
    // return results.some((result) => result);
  }

  public async takeFlorins({
    playerId,
    florins,
    from,
  }: {
    playerId: number;
    florins: number;
    from: string;
  }) {
    let promises: Promise<boolean>[] = [];
    for (let i = 0; i < florins; i++) {
      setTimeout(
        () =>
          promises.push(
            this.moveFlorinToPlayerCounter({
              index: i,
              playerId,
              florinLocation: from,
            })
          ),
        i * 100
      );
    }
    await Promise.all(promises);
  }
}
