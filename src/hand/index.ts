// .##.....##....###....##....##.########.
// .##.....##...##.##...###...##.##.....##
// .##.....##..##...##..####..##.##.....##
// .#########.##.....##.##.##.##.##.....##
// .##.....##.#########.##..####.##.....##
// .##.....##.##.....##.##...###.##.....##
// .##.....##.##.....##.##....##.########.

class Hand {
  private game: PaxRenaissanceGame;
  private hand: LineStock<EmpireCard | TableauCard>;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
    this.setupHand();
  }

  clearInterface() {
    this.hand.removeAll();
  }

  updateHand() {
    
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

    this.hand = new LineStock<EmpireCard |TableauCard>(
      this.game.tableauCardManager,
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
    return this.hand.getCards() as TableauCard[];
  }

  public getStock(): LineStock<EmpireCard | TableauCard> {
    return this.hand;
  }
}
