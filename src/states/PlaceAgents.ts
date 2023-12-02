class PlaceAgentsState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringPlaceAgentsArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringPlaceAgentsArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving ConfirmTurnState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: "${tkn_playerName} may place Agents",
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
      text: "${tkn_playerName} must place an Agent",
      args: {
        tkn_playerName: "${you}",
        // empireName: _(this.args.empire.name)
      },
    });
    // Object.keys(this.args.possibleLevies).forEach((cityId) => {
    //   this.game.setCitySelectable({
    //     cityId,
    //     callback: () => this.updateInterfaceConfirmPlaceLevy({cityId}),
    //   });
    // });
  }

  // private updateInterfaceConfirmPlaceLevy({cityId}: {cityId: string;}) {
  //   this.game.clearPossible();
  //   this.game.setCitySelected({cityId});
  //   const {religion, levyIcon} = this.args.possibleLevies[cityId].levy;
  //   this.game.clientUpdatePageTitle({
  //     text: "Place ${tkn_mapToken} in ${cityName}?",
  //     args: {
  //       tkn_mapToken: [religion, levyIcon].join('_'),
  //       cityName: _(this.args.possibleLevies[cityId].cityName)
  //     },
  //   });
  //   this.game.addConfirmButton({
  //     callback: () =>
  //       this.game.takeAction({
  //         action: "actTradeFairLevy",
  //         args: {
  //           cityId,
  //         },
  //       }),
  //   });
  //   this.game.addCancelButton();
  // }

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
