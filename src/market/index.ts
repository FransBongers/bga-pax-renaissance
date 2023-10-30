//  .##.....##....###....########..##....##.########.########
//  .###...###...##.##...##.....##.##...##..##..........##...
//  .####.####..##...##..##.....##.##..##...##..........##...
//  .##.###.##.##.....##.########..#####....######......##...
//  .##.....##.#########.##...##...##..##...##..........##...
//  .##.....##.##.....##.##....##..##...##..##..........##...
//  .##.....##.##.....##.##.....##.##....##.########....##...

class Market {
  private game: PaxRenaissanceGame;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
    const gamedatas = game.gamedatas;

    this.setupMarket({ gamedatas });
  }

  setupMarket({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    gamedatas.market.forEach((card) => {
      const {id, location} = card;
      if (location === 'market_west_0' || location === 'market_east_0') {
        return;
      }
      const node = document.getElementById(`pr_${location}`);
      if (!node) {
        debug('Unable to get market node');
      }
      node.setAttribute('data-card-id',id.split('_')[0]);
    });
  }
}
