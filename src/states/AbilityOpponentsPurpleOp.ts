class AbilityOpponentsPurpleOpState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringAbilityOpponentsPurpleOpStateArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringAbilityOpponentsPurpleOpStateArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving AbilityActionSelectApostastStateState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} may choose a purple Op to perform"),
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
      text: _("${tkn_playerName} may select a card to perform a purple Op"),
      args: {
        tkn_playerName: "${you}",
      },
    });

    this.setCardsSelectable();
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceSelectOp({cardId, ops}: {cardId: string, ops: TableauOp[]}) {
    this.game.clearPossible();
    this.game.setCardSelected({id: cardId});

    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} may select an Op to perform"),
      args: {
        tkn_playerName: "${you}",
      },
    });

    this.addButtons({ cardId, ops})
    this.game.addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private setCardsSelectable() {
    Object.entries(this.args.options).forEach(([cardId, ops]) => {
      this.game.setCardSelectable({id: cardId, callback: () => {
        this.updateInterfaceSelectOp({cardId, ops});
      }})
    });
  }

  private addButtons({cardId, ops}: {cardId: string; ops: TableauOp[]}) {
    ops.forEach((op, index) => {
      this.game.addPrimaryActionButton({
        id: `op_btn_${index}`,
        text: _(op.name),
        callback: () =>
          this.game.takeAction({
            action: "actAbilityOpponentsPurpleOp",
            args: {
              cardId,
              tableauOpId: op.id,
            },
          }),
      })
    })
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
