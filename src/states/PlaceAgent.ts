class PlaceAgentState implements State {
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
      text: "${tkn_playerName} must select a location to place ${agents}",
      args: {
        tkn_playerName: "${you}",
        agents: this.createAgentLog(),
        // empireName: _(this.args.empire.name)
      },
    });
    this.setLocationsSelectable();
  }

  private updateInterfaceConfirmLocation({
    id,
    name,
  }: {
    id: string;
    name: string;
  }) {
    this.game.clearPossible();
    this.game.setLocationSelected({ id });
    
    // TODO handle cases where there are two different agents
    this.game.clientUpdatePageTitle({
      text: "Place ${agents} on ${location}?",
      args: {
        tkn_playerName: "${you}",
        agents: this.createAgentLog(),
        location: _(name),
      },
    });
    // const { religion, levyIcon } = this.args.possibleLevies[cityId].levy;
    // this.game.clientUpdatePageTitle({
    //   text: "Place ${tkn_mapToken} in ${cityName}?",
    //   args: {
    //     tkn_mapToken: [religion, levyIcon].join("_"),
    //     cityName: _(this.args.possibleLevies[cityId].cityName),
    //   },
    // });
    this.game.addConfirmButton({
      callback: () =>
        this.game.takeAction({
          action: "actPlaceAgent",
          args: {
            agent: this.args.agents[0],
            locationId: id,
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

  private setLocationsSelectable() {
    Object.values(this.args.locations).forEach(({ id, name }) => {
      this.game.setLocationSelectable({
        id,
        callback: () => this.updateInterfaceConfirmLocation({ id, name }),
      });
    });
  }

  private createAgentLog() {
    const {type, religion} = this.args.agents[0];

    const isPawn = type === PAWN;

    const result = {
      log: isPawn ? '${tkn_pawn}' : '${tkn_mapToken}',
      args: {}
    };

    if (isPawn) {
      result.args['tkn_pawn'] =`${this.game.playerManager.getPlayer({playerId: this.game.getPlayerId()}).getBank() }_pawn`;
    } else {
      result.args['tkn_mapToken'] =`${religion}_${type}`;
    }

    return result;
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
