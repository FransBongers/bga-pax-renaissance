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
    debug("Leaving PlaceAgentState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} may place Agents"),
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

    this.updatePageTitle();
    this.setLocationsSelectable();

    if (this.args.optionalAction) {
      this.game.addSkipButton({
        callback: () =>
          this.game.takeAction({
            action: "actPlaceAgent",
            args: {
              agent: this.args.agents[0],
              locationId: null,
            },
          }),
      });
    }
  }

  private updateInterfaceConfirmCard({
    id,
    card,
  }: {
    id: string;
    card: EmpireCard | TableauCard;
  }) {
    this.game.clearPossible();
    this.game.setCardSelected({ id: card.id });

    const {} = card;
    // TODO handle cases where there are two different agents

    this.game.clientUpdatePageTitle({
      text: _("Place ${tkn_mapToken} on ${location}?"),
      args: {
        tkn_playerName: "${you}",
        tkn_mapToken: this.createMapTokenId(),
        location: _(card.type === TABLEAU_CARD ? card.name : card.nameKing),
      },
    });

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

  private updateInterfaceConfirmLocation({
    id,
    location,
  }: {
    id: string;
    location: PlaceAgentLocation;
  }) {
    this.game.clearPossible();
    this.game.setLocationSelected({ id });

    this.updatePageTitleConfirmLocation({ location });
    // TODO handle cases where there are two different agents

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

  private createMapTokenId() {
    const agent = this.args.agents[0];
    let id = "";
    if (agent.type === PAWN) {
      const bank = this.game.playerManager
        .getPlayer({ playerId: this.game.getPlayerId() })
        .getBank();
      id = `${bank}_pawn`;
    } else {
      id = `${agent.religion}_${agent.type}`;
    }
    return id;
  }

  private setLocationsSelectable() {
    Object.entries(this.args.locations).forEach(([id, location]) => {
      if (location?.type === TABLEAU_CARD || location?.type === EMPIRE_CARD) {
        this.game.setCardSelectable({
          id: location.id,
          callback: () =>
            this.updateInterfaceConfirmCard({ id, card: location }),
        });
      } else {
        this.game.setLocationSelectable({
          id,
          callback: () => this.updateInterfaceConfirmLocation({ id, location }),
        });
      }
    });
  }

  private updatePageTitle() {
    this.game.clientUpdatePageTitle({
      text: this.args.optionalAction
        ? _("${tkn_playerName} may select a location to place ${tkn_mapToken}")
        : _(
            "${tkn_playerName} must select a location to place ${tkn_mapToken}"
          ),
      args: {
        tkn_playerName: "${you}",
        tkn_mapToken: this.createMapTokenId(),
      },
    });
  }

  private updatePageTitleConfirmLocation({
    location,
  }: {
    location: PlaceAgentLocation;
  }) {
    const { name, cost, repressed } = location;
    if (repressed) {
      this.game.clientUpdatePageTitle({
        text:
          cost > 0
            ? _(
                "Place ${tkn_mapToken} on ${location} and pay ${cost} ${tkn_florin} to Repress ${tkn_mapToken_repressed} ?"
              )
            : _(
                "Place ${tkn_mapToken} on ${location} and Repress ${tkn_mapToken_repressed} ?"
              ),
        args: {
          tkn_playerName: "${you}",
          tkn_mapToken: this.createMapTokenId(),
          location: _(name),
          cost,
          tkn_florin: tknFlorin(),
          tkn_mapToken_repressed: tknMapToken(repressed.id),
        },
      });
    } else {
      this.game.clientUpdatePageTitle({
        text: _("Place ${tkn_mapToken} on ${location}?"),
        args: {
          tkn_playerName: "${you}",
          tkn_mapToken: this.createMapTokenId(),
          location: _(name),
        },
      });
    }
  }

  // private createAgentLog() {
  //   const {type, religion} = this.args.agents[0];

  //   const isPawn = type === PAWN;

  //   const result = {
  //     log: isPawn ? '${tkn_pawn}' : '${tkn_mapToken}',
  //     args: {}
  //   };

  //   if (isPawn) {
  //     result.args['tkn_pawn'] =`${this.game.playerManager.getPlayer({playerId: this.game.getPlayerId()}).getBank() }_pawn`;
  //   } else {
  //     result.args['tkn_mapToken'] =`${religion}_${type}`;
  //   }

  //   return result;
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
