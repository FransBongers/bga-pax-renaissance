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
    debug("Leaving FlipVictoryCardState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} must flip an inactive Victory Card"),
      args: {
        tkn_playerName: this.game.playerManager
          .getPlayer({ playerId: activePlayerId })
          .getName(),
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
      text: _("${tkn_playerName} must flip an inactive Victory Card"),
      args: {
        tkn_playerName: "${you}",
      },
    });
    this.setVictoryCardsSelectable();
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceConfirmSelectCard({ card }: { card: VictoryCard }) {
    this.game.clearPossible();
    const node = document.getElementById(`${card.id}-back`);
    if (!node) {
      return;
    }
    node.classList.add(PR_SELECTED);
    this.game.clientUpdatePageTitle({
      text: _("Flip ${titleActive}?"),
      args: {
        titleActive: _(card.active.title),
      },
    });

    const callback = () =>
      this.game.takeAction({
        action: "actFlipVictoryCard",
        args: {
          cardId: card.id,
        },
      });

    if (
      this.game.settings.get({
        id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
      }) === ENABLED
    ) {
      callback();
    } else {
      this.game.addConfirmButton({
        callback,
      });
    }

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
      this.game.setCardSelectable({
        id: card.id,
        callback: () => this.updateInterfaceConfirmSelectCard({ card }),
      });
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
