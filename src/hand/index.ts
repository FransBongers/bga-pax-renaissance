// .##.....##....###....##....##.########.
// .##.....##...##.##...###...##.##.....##
// .##.....##..##...##..####..##.##.....##
// .#########.##.....##.##.##.##.##.....##
// .##.....##.#########.##..####.##.....##
// .##.....##.##.....##.##...###.##.....##
// .##.....##.##.....##.##....##.########.

class Hand {
  private game: PaxRenaissanceGame;
  private hand: LineStock<TableauCard>;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
    this.setupHand();
  }

  public setupHand() {
    const node: HTMLElement = $("game_play_area");
    node.insertAdjacentHTML("beforeend", tplHand());

    const handWrapper = $("pr_floating_hand_wrapper");
    $("pr_floating_hand_button").addEventListener("click", () => {
      if (handWrapper.dataset.open && handWrapper.dataset.open == "hand") {
        delete handWrapper.dataset.open;
      } else {
        handWrapper.dataset.open = "hand";
      }
    });

    this.hand = new LineStock<TableauCard>(
      this.game.cardManager,
      document.getElementById("pr_player_hand"),
      { wrap: "wrap", gap: '12px', center: false }
    );
  }

  public async addCard(card: TableauCard): Promise<void> {
    await this.hand.addCard(card);
  }

  public async removeCard(card: TableauCard): Promise<void> {
    await this.hand.removeCard(card);
  }

  public getCards(): TableauCard[] {
    return this.hand.getCards();
  }

  public getStock(): LineStock<TableauCard> {
    return this.hand;
  }
}
