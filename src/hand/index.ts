// .##.....##....###....##....##.########.
// .##.....##...##.##...###...##.##.....##
// .##.....##..##...##..####..##.##.....##
// .#########.##.....##.##.##.##.##.....##
// .##.....##.#########.##..####.##.....##
// .##.....##.##.....##.##...###.##.....##
// .##.....##.##.....##.##....##.########.

class Hand {
  private game: PaxRenaissanceGame;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
    this.setupHand();
  }

  public setupHand() {
    const node: HTMLElement = $('game_play_area');
    node.insertAdjacentHTML('beforeend', tplHand());

    const handWrapper = $('pr_floating_hand_wrapper');
    $('pr_floating_hand_button').addEventListener('click', () => {
      if (handWrapper.dataset.open && handWrapper.dataset.open == 'hand') {
        delete handWrapper.dataset.open;
      } else {
        handWrapper.dataset.open = 'hand';
      }
    });
  }

}
