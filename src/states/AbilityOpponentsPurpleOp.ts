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

    this.setOperationsSelectable();
    this.game.addUndoButtons(this.args);
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
        cardName: _(
          card.type === EMPIRE_CARD ? card[card.side].name : card.name
        ),
      },
    });
    this.game.addConfirmButton({
      callback: () =>
        this.game.takeAction({
          action: "actAbilityOpponentsPurpleOp",
          args: {
            cardId: card.id,
            tableauOpId: operation.id,
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

  private setOperationsSelectable() {
    Object.entries(this.args.options).forEach(([cardId, operations]) => {
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
            this.updateInterfaceConfirmOp({ card, operation });
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
