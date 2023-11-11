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
      { wrap: "wrap" }
    );
  }

  public async addCard(card: TableauCard) {
    // const cardToAdd = {
    //   ...card,
    //   type: true,
    // };
    if (this.game.cardManager.animationsActive()) {
      const cardDiv = this.game.cardManager.getCardElement(card);
      cardDiv.style.zIndex = "20";
      await this.game.animationManager.playSequence([
        new BgaShowScreenCenterAnimation({
          element: cardDiv,
          transitionTimingFunction: "ease-in-out",
        }),
        new BgaPauseAnimation({}),
      ]);
      cardDiv.style.removeProperty("z-index");
      // opponentHandDiv.dataset.animated = 'false';
      await this.hand.addCard(card);
      // return this.addCardsToHand([this.game.getPlayerId() == opponentId ? { id: card.id } as Card : card]);
    } else {
      debug("no animations active");
      this.hand.addCard(card);
    }
    // const element = this.game.cardManager.getCardElement(card);
    // const fromElement: HTMLElement = element.parentElement;
    // const toElement = document.getElementById("pr_player_hand");

    // await this.hand.addCard(
    //   cardToAdd,
    //   {
    //     fromElement,
    //     animation: new BgaCumulatedAnimation({
    //       animations: [
    //         new BgaShowScreenCenterAnimation({
    //           element,
    //           transitionTimingFunction: "ease-in",
    //         }),
    //         new BgaPauseAnimation({ element }),
    //         new BgaAttachWithAnimation({
    //           animation: new BgaSlideAnimation({
    //             element,
    //             transitionTimingFunction: "ease-out",
    //           }),
    //           attachElement: toElement,
    //         }),
    //       ],
    //     }),
    //   },
    //   { visible: false }
    // );
    // this.hand.setCardVisible(card, true);
  }
}
