class RegimeChangeEmancipationState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringRegimeChangeEmancipationArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringRegimeChangeEmancipationArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving RegimeChangeEmancipationState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} may move Repress Tokens onto the Map"),
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
      text: _(
        "${you} may select a Repressed Token to move onto the Map"
      ),
      args: {
        you: "${you}",
      },
    });
    this.game.addPassButton({
      optionalAction: this.args.optionalAction,
      text: _("Done"),
    });
    this.setTokensSelectable();
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceSelectLocation({
    locations,
    token,
  }: {
    locations: (Border | City)[];
    token: Token;
  }) {
    this.game.clearPossible();
    this.game.setTokenSelected({ id: token.id });

    this.game.clientUpdatePageTitle({
      text: _(
        "${you} must select a ${borderOrCity} to move ${tkn_mapToken} onto"
      ),
      args: {
        you: "${you}",
        borderOrCity: token.type === PAWN ? _("Border") : _("City"),
        tkn_mapToken: tknMapToken(token.id),
      },
    });
    this.game.addCancelButton();
    this.setLocationsSelectable({ locations, token });
  }

  private updateInterfaceConfirmLocation({
    location,
    token,
  }: {
    token: Token;
    location: Border | City;
  }) {
    this.game.clearPossible();
    this.game.setLocationSelected({ id: location.id });
    this.game.setTokenSelected({ id: token.id });

    this.game.clientUpdatePageTitle({
      text: _("Move ${tkn_mapToken} onto ${locationName}?"),
      args: {
        tkn_mapToken: tknMapToken(token.id),
        locationName: _(location.name),
      },
    });

    const callback = () => {
      this.game.clearPossible();
      this.game.takeAction({
        action: "actRegimeChangeEmancipation",
        args: {
          tokenId: token.id,
          locationId: location.id,
        },
      });
    };

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

  private setLocationsSelectable({
    locations,
    token,
  }: {
    locations: (Border | City)[];
    token: Token;
  }) {
    locations.forEach((location) => {
      this.game.setLocationSelectable({
        id: location.id,
        callback: () =>
          this.updateInterfaceConfirmLocation({ location, token }),
      });
    });
  }

  private setTokensSelectable() {
    Object.entries(this.args.options).forEach(
      ([tokenId, { locations, token }]) => {
        this.game.setTokenSelectable({
          id: tokenId,
          callback: () =>
            this.updateInterfaceSelectLocation({ locations, token }),
        });
      }
    );
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
