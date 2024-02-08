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

    // this.setCardsSelectable();
    this.setOperationsSelectable();
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

  private updateInterfaceConfirmOp({
    card,
    operation,
  }: {
    card: TableauCard | EmpireCard;
    operation: TableauOp;
  }) {
    this.game.clearPossible();
    this.setOpSelected({ card, operation });

    this.game.clientUpdatePageTitle({
      text: _("Perform ${tkn_tableauOp} with ${cardName}?"),
      args: {
        tkn_tableauOp: operation.id,
        cardName: _(card.type === EMPIRE_CARD ? card[card.side].name : card.name),
      },
    });
    this.game.addConfirmButton({
      callback: () =>
      this.game.takeAction({
        action: "actTableauOpsSelect",
        args: {
          cardId: card.id,
          tableauOpId: operation.id,
        },
      }),
    })
    this.game.addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private setOperationsSelectable() {
    Object.entries(this.args.availableOps).forEach(([cardId, operations]) => {
      const card = this.args.tableauCards.find((card) => card.id === cardId);

      operations.forEach((operation) => {
        const operationId = `${card.id}_${operation.id}${
          card.type === EMPIRE_CARD ? `_${card.side}` : ""
        }`;
        console.log("operationId", operationId);
        this.game.setLocationSelectable({
          id: operationId,
          callback: () => {
            console.log("clicked", card.id, operation.id);
            this.updateInterfaceConfirmOp({card, operation});
          },
        });
      });
    });
  }

  private setOpSelected({
    card,
    operation,
  }: {
    card: TableauCard | EmpireCard;
    operation: TableauOp;
  }) {
    const operationId = `${card.id}_${operation.id}${
      card.type === EMPIRE_CARD ? `_${card.side}` : ""
    }`;
    console.log("operationId", operationId);
    this.game.setLocationSelected({
      id: operationId,
    });
  }

  // private setCardsSelectable() {
  //   Object.keys(this.args.availableOps).forEach((id: string) => {
  //     const card = this.args.tableauCards.find((card) => card.id === id);

  //     this.game.setCardSelectable({
  //       id,
  //       callback: () =>
  //         this.updateInterfaceConfirm({
  //           cardId: id,
  //           ops: this.args.availableOps[id],
  //         }),
  //     });
  //   });
  // }

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
