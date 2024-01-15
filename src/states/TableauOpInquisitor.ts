class TableauOpInquisitorState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringTableauOpInquisitorArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringTableauOpInquisitorArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving TableauOpRepressState");
  }

  setDescription(
    activePlayerId: number,
    args: OnEnteringTableauOpInquisitorArgs
  ) {
    this.args = args;
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} must select a ${tkn_mapToken} to move"),
      args: {
        tkn_playerName: this.game.playerManager
          .getPlayer({ playerId: activePlayerId })
          .getName(),
        tkn_mapToken: tknMapToken(Object.keys(this.args.tokens)[0]),
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
      text: _("${tkn_playerName} must select a ${tkn_mapToken} to move"),
      args: {
        tkn_mapToken: tknMapToken(Object.keys(this.args.tokens)[0]),
        tkn_playerName: "${you}",
      },
    });

    this.setTokensSelectable();
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceSelectDestination(option: InquisitorOpOption) {
    const { token, destinations } = option;
    this.game.clearPossible();
    this.game.setTokenSelected({ id: token.id });

    this.game.clientUpdatePageTitle({
      text: _(
        "${tkn_playerName} must select a card to move ${tkn_mapToken} to"
      ),
      args: {
        tkn_mapToken: tknMapToken(Object.keys(this.args.tokens)[0]),
        tkn_playerName: "${you}",
      },
    });
    this.setCardsSelectable(option);
  }

  private updateInterfaceConfirm({
    token,
    destination,
  }: {
    token: Token;
    destination: EmpireCard | TableauCard;
  }) {
    this.game.clearPossible();

    this.game.setTokenSelected({ id: token.id });
    this.game.setCardSelected({ id: destination.id });
    this.game.clientUpdatePageTitle({
      text: _("Move ${tkn_mapToken} to ${cardName}?"),
      args: {
        tkn_mapToken: tknMapToken(token.id),
        cardName:
          destination.type === EMPIRE_CARD
            ? destination[destination.side].name
            : destination.name,
      },
    });
    this.game.addConfirmButton({
      callback: () =>
        this.game.takeAction({
          action: "actTableauOpInquisitor",
          args: {
            tokenId: token.id,
            destinationId: destination.id,
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

  private setCardsSelectable(option: InquisitorOpOption) {
    option.destinations.forEach((destination) => {
      this.game.setCardSelectable({
        id: destination.id,
        callback: () =>
          this.updateInterfaceConfirm({
            token: option.token,
            destination,
          }),
      });
    });
  }

  private setTokensSelectable() {
    Object.values(this.args.tokens).forEach((option: InquisitorOpOption) => {
      this.game.setTokenSelectable({
        id: option.token.id,
        callback: (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.updateInterfaceSelectDestination(option)
        },
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
