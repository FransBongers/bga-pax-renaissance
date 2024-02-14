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

  public addTextToolTip({ nodeId, text }: { nodeId: string; text: string }) {
    this.game.framework().addTooltip(nodeId, _(text), "", 500);
  }

  public addIconTooltip({
    nodeId,
    iconHtml,
    text,
    title,
  }: {
    nodeId: string;
    iconHtml: string;
    text: string;
    title?: string;
  }) {
    const html = tplTooltipWithIcon({ iconHtml, text, title });
    this.game.framework().addTooltipHtml(nodeId, html, 250);
  }

  public removeTooltip(nodeId: string) {
    this.game.framework().removeTooltip(nodeId);
  }

  public setupTooltips() {}

  public addCardTooltip({
    nodeId,
    card,
  }: {
    nodeId: string;
    card: TableauCard;
  }): void {
    const html = tplTableauCardTooltip({ card, game: this.game });
    this.game.framework().addTooltipHtml(nodeId, html, 500);
  }

  public addEmpireCardTooltip({
    nodeId,
    card,
    religion,
  }: {
    nodeId: string;
    card: EmpireCard;
    religion?: string;
  }): void {
    const html = tplEmireCardTooltip({
      card,
      ageOfReformationPromo: this.game.gameOptions.ageOfReformationPromo,
      religion,
    });
    this.game.framework().addTooltipHtml(nodeId, html, 500);
  }

  public addVictoryCardTooltip({
    nodeId,
    card,
  }: {
    nodeId: string;
    card: VictoryCard;
  }): void {
    const html = tplVictoryCardTooltip({ card, game: this.game });
    this.game.framework().addTooltipHtml(nodeId, html, 500);
  }

  public cometCardInDrawDeckTooltip = ({ nodeId }: { nodeId: string }) => {
    this.removeTooltip(nodeId);

    this.game.framework().addTooltipHtml(
      nodeId,
      tplTextTooltip({
        text: _("Comet card is in the Draw Deck"),
      }),
      250
    );
  };

  public cometCardNoLongerInDrawDeckTooltip = ({ nodeId }: { nodeId: string }) => {
    this.removeTooltip(nodeId);

    this.game.framework().addTooltipHtml(
      nodeId,
      tplTextTooltip({
        text: _("Comet card is not in the Draw Deck"),
      }),
      250
    );
  };

  public setupDrawDeckTooltips = () => {
    const text = _("Number of cards in the ${region} Draw Deck");

    REGIONS.forEach((region) => {
      this.game.framework().addTooltipHtml(
        `pr_market_${region}_deck_counter`,
        tplTextTooltip({
          text: this.game.format_string_recursive(text, {
            region: region === EAST ? _("East") : _("West"),
          }),
        }),
        250
      );
    });
    [1, 2, 3, 4].forEach((number) => {
      this.cometCardInDrawDeckTooltip({
        nodeId: `pr_deck_counter_comet${number}`,
      });
    });
  };
}
