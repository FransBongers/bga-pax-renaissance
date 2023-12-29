class PlaceLevySelectCityState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringPlaceLevySelectCityArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringPlaceLevySelectCityArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving PlaceLevySelectCityState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} must select a City to place a Levy"),
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
      text: _("${tkn_playerName} must select a City in ${empireName} to place a Levy"),
      args: {
        tkn_playerName: "${you}",
        empireName: _(this.args.empire.name)
      },
    });
    Object.keys(this.args.possibleLevies).forEach((cityId) => {
      this.game.setLocationSelectable({
        id: cityId,
        callback: () => this.updateInterfaceConfirmPlaceLevy({cityId}),
      });
    });
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceConfirmPlaceLevy({cityId}: {cityId: string;}) {
    this.game.clearPossible();
    this.game.setLocationSelected({id: cityId});
    const {separator, levyIcon} = this.args.possibleLevies[cityId].levy;
    this.game.clientUpdatePageTitle({
      text: _("Place ${tkn_mapToken} in ${cityName}?"),
      args: {
        tkn_mapToken: [separator, levyIcon].join('_'),
        cityName: _(this.args.possibleLevies[cityId].cityName)
      },
    });
    this.game.addConfirmButton({
      callback: () =>
        this.game.takeAction({
          action: "actPlaceLevySelectCity",
          args: {
            cityId,
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
