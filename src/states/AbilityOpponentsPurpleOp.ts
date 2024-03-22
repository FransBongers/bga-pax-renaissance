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
      text: _("${you} may select a card to perform a purple Op"),
      args: {
        you: "${you}",
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

    const callback = () =>
      this.game.takeAction({
        action: "actAbilityOpponentsPurpleOp",
        args: {
          cardId: card.id,
          tableauOpId: operation.id,
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

  private setOperationsSelectable() {
    Object.entries(this.args.options).forEach(([cardId, operations]) => {
      const card = this.args.tableauCards.find((card) => card.id === cardId);

      operations.forEach((operation) => {
        const operationId = `${card.id}_${operation.id}${
          card.type === EMPIRE_CARD ? `_${card.side}` : ""
        }`;
        this.game.setLocationSelectable({
          id: operationId,
          callback: () => {
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
