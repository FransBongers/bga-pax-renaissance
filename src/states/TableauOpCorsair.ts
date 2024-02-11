class TableauOpCorsairState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringTableauOpCorsairArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringTableauOpCorsairArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving TableauOpCorsairState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} must move a Pirate"),
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
      text: _("${tkn_playerName} must select a Pirate to move"),
      args: {
        tkn_florin: tknFlorin(),
        tkn_playerName: "${you}",
      },
    });

    this.setTokensSelectable();
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceSelectDestination({
    option,
  }: {
    option: CorsairOpOption;
  }) {
    this.game.clearPossible();
    const { token, destinations } = option;
    this.game.setTokenSelected({ id: token.id });
    this.game.clientUpdatePageTitle({
      text: _(
        "${tkn_playerName} must select a Sea Border to move ${tkn_mapToken} into"
      ),
      args: {
        tkn_mapToken: tknMapToken(option.token.id),
        tkn_playerName: "${you}",
      },
    });
    this.setDestinationBordersSelectable({ option });

    this.game.addCancelButton();
  }

  private updateInterfaceConfirm({
    destination,
    token,
  }: {
    token: Token;
    destination: CorsairOpDestination;
  }) {
    this.game.clearPossible();
    this.game.setTokenSelected({ id: token.id });
    this.game.setLocationSelected({ id: destination.border.id });

    this.game.clientUpdatePageTitle({
      text:
        destination.token !== null
          ? _(
              "Move ${tkn_mapToken} into ${borderName} and Kill ${tkn_mapToken_2}?"
            )
          : _("Move ${tkn_mapToken} into ${borderName}?"),
      args: {
        tkn_mapToken: tknMapToken(token.id),
        tkn_mapToken_2:
          destination.token !== null ? tknMapToken(destination.token.id) : "",
        borderName: _(destination.border.name),
      },
    });

    const callback = () =>
      this.game.takeAction({
        action: "actTableauOpCorsair",
        args: {
          tokenId: token.id,
          destinationId: destination.border.id,
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

  private setDestinationBordersSelectable({
    option,
  }: {
    option: CorsairOpOption;
  }) {
    Object.entries(option.destinations).forEach(([borderId, destination]) => {
      this.game.setLocationSelectable({
        id: borderId,
        callback: () =>
          this.updateInterfaceConfirm({
            token: option.token,
            destination,
          }),
      });
    });
  }

  private setTokensSelectable() {
    Object.entries(this.args.options).forEach(([tokenId, option]) => {
      this.game.setTokenSelectable({
        id: tokenId,
        callback: () =>
          this.updateInterfaceSelectDestination({
            option,
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
