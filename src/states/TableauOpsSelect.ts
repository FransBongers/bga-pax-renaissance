class TableauOpsSelectState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringTableauOpsSelectArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringTableauOpsSelectArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving TableauOpsSelectState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} may select Ops to perform"),
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
      text: _("${tkn_playerName} may select a card to perform Ops"),
      args: {
        tkn_playerName: "${you}",
      },
    });

    this.setCardsSelectable();
    if (this.args.optional) {
      this.game.addSkipButton({
        callback: () =>
          this.game.takeAction({
            // text: 'Done',
            action: "actTableauOpsSelect",
            args: {
              cardId: null,
              tableauOpId: null,
            },
          }),
      });
    }
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceConfirm({
    cardId,
    ops,
  }: {
    cardId: string;
    ops: TableauOp[];
  }) {
    this.game.clearPossible();
    this.game.setCardSelected({ id: cardId });
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} may choose an Op to perform"),
      args: {
        tkn_playerName: "${you}",
      },
    });
    ops.forEach((tableauOp, index) => {
      this.game.addPrimaryActionButton({
        id: `${tableauOp.id}_${index}_btn`,
        text: _(tableauOp.name),
        callback: () =>
          this.game.takeAction({
            action: "actTableauOpsSelect",
            args: {
              cardId,
              tableauOpId: tableauOp.id,
            },
          }),
      });
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

  private setCardsSelectable() {
    Object.keys(this.args.availableOps).forEach((id: string) => {
      const card = this.args.tableauCards.find((card) => card.id === id);

      this.game.setCardSelectable({
        id,
        callback: () =>
          this.updateInterfaceConfirm({
            cardId: id,
            ops: this.args.availableOps[id],
          }),
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
