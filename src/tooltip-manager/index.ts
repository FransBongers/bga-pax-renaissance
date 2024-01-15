//  .########..#######...#######..##.......########.####.########.
//  ....##....##.....##.##.....##.##..........##.....##..##.....##
//  ....##....##.....##.##.....##.##..........##.....##..##.....##
//  ....##....##.....##.##.....##.##..........##.....##..########.
//  ....##....##.....##.##.....##.##..........##.....##..##.......
//  ....##....##.....##.##.....##.##..........##.....##..##.......
//  ....##.....#######...#######..########....##....####.##.......

//  .##.....##....###....##....##....###.....######...########.########.
//  .###...###...##.##...###...##...##.##...##....##..##.......##.....##
//  .####.####..##...##..####..##..##...##..##........##.......##.....##
//  .##.###.##.##.....##.##.##.##.##.....##.##...####.######...########.
//  .##.....##.#########.##..####.#########.##....##..##.......##...##..
//  .##.....##.##.....##.##...###.##.....##.##....##..##.......##....##.
//  .##.....##.##.....##.##....##.##.....##..######...########.##.....##

class TooltipManager {
  private game: PaxRenaissanceGame;
  // This can't be used since some versions of safari don't support it
  // private idRegex = /(?<=id=")[a-z]*_[0-9]*_[0-9]*(?=")/;
  private idRegex = /id="[a-z]*_[0-9]*_[0-9]*"/;
  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  public addTextToolTip({nodeId, text}: {nodeId: string; text: string;}) {
    this.game.framework().addTooltip(nodeId, _(text), '', 500);
  }

  public removeTooltip(nodeId: string) {
    this.game.framework().removeTooltip(nodeId);
  }

  public setupTooltips() {
  }

  public addCardTooltip({ nodeId, card }: { nodeId: string; card: TableauCard }): void {
    const html = tplTableauCardTooltip({ card, game: this.game });
    this.game.framework().addTooltipHtml(nodeId, html, 500);
  }

  public addEmpireCardTooltip({ nodeId, card }: { nodeId: string; card: EmpireCard }): void {
    const html = tplEmireCardTooltip({ card, });
    this.game.framework().addTooltipHtml(nodeId, html, 500);
  }

  public addVictoryCardTooltip({ nodeId, card }: { nodeId: string; card: VictoryCard }): void {
    const html = tplVictoryCardTooltip({ card, game: this.game });
    this.game.framework().addTooltipHtml(nodeId, html, 500);
  }
}
