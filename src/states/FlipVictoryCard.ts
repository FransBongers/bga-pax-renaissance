class FlipVictoryCardState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringFlipVictoryCardArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringFlipVictoryCardArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving ConfirmTurnState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: "${tkn_playerName} must flip an inactive Victory Card",
      args: {
        tkn_playerName: this.game.playerManager.getPlayer({playerId: activePlayerId}).getName()
      },
      nonActivePlayers: true,
    });
  }

  //  .####.##....##.########.########.########..########....###.....######..########
  //  ..##..###...##....##....##.......##.....##.##.........##.##...##....##.##......
  //  ..##..####..##....##....##.......##.....##.##........##...##..##.......##......
  //  ..##..##.##.##....##....######...########..######...##.....##.##.......######..
  //  ..##..##..####....##....##.......##...##...##.......#########.##.......##......
  //  ..##..##...###....##....##.......##....##..##.......##.....##.##....##.##......
  //  .####.##....##....##....########.##.....##.##.......##.....##..######..########

  // ..######..########.########.########...######.
  // .##....##....##....##.......##.....##.##....##
  // .##..........##....##.......##.....##.##......
  // ..######.....##....######...########...######.
  // .......##....##....##.......##..............##
  // .##....##....##....##.......##........##....##
  // ..######.....##....########.##.........######.

  private updateInterfaceInitialStep() {
    this.game.clearPossible();
    this.game.clientUpdatePageTitle({
      text: "${tkn_playerName} must flip an inactive Victory Card",
      args: {
        tkn_playerName: '${you}'
      },
    });
    this.setVictoryCardsSelectable();
  }

  private updateInterfaceConfirmSelectCard({card}: {card: VictoryCard}) {
    const node = document.getElementById(`${card.id}-back`);
    if (!node) {
      return;
    }
    node.classList.add(PR_SELECTED);
    this.game.clientUpdatePageTitle({
      text: "Flip ${titleActive}?",
      args: {
        titleActive: _(card.titleActive),
      },
    });
    this.game.addConfirmButton({
      callback: () =>
        this.game.takeAction({
          action: "actFlipVictoryCard",
          args: {
            cardId: card.id,
          },
        }),
    });
    this.game.addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private setVictoryCardsSelectable() {
    this.args.victoryCards.forEach((card) => {
      const node = document.getElementById(`${card.id}-back`);
      if (!node) {
        return;
      }
      node.classList.add(PR_SELECTABLE);
      this.game._connections.push(
        dojo.connect(node, "onclick", this, () =>
          this.updateInterfaceConfirmSelectCard({ card })
        )
      );
    });
  }

  //  ..######..##.......####..######..##....##
  //  .##....##.##........##..##....##.##...##.
  //  .##.......##........##..##.......##..##..
  //  .##.......##........##..##.......#####...
  //  .##.......##........##..##.......##..##..
  //  .##....##.##........##..##....##.##...##.
  //  ..######..########.####..######..##....##

  // .##.....##....###....##....##.########..##.......########..######.
  // .##.....##...##.##...###...##.##.....##.##.......##.......##....##
  // .##.....##..##...##..####..##.##.....##.##.......##.......##......
  // .#########.##.....##.##.##.##.##.....##.##.......######....######.
  // .##.....##.#########.##..####.##.....##.##.......##.............##
  // .##.....##.##.....##.##...###.##.....##.##.......##.......##....##
  // .##.....##.##.....##.##....##.########..########.########..######.
}
