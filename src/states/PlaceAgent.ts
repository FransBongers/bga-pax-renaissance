class PlaceAgentState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringPlaceAgentsArgs;
  private selectedAgent: Agent | null = null;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringPlaceAgentsArgs) {
    this.args = args;
    this.selectedAgent = null;
    const uniqueAgents = getUniqueAgents({ agents: args.agents });
    if (uniqueAgents.length > 1) {
      this.updateInterfaceSelectAgent({ agents: uniqueAgents });
    } else {
      this.updateInterfaceSelectLocation({ agent: uniqueAgents[0] });
    }
  }

  onLeavingState() {
    debug("Leaving PlaceAgentState");
  }

  setDescription(activePlayerId: number, args: OnEnteringPlaceAgentsArgs) {
    this.args = args;
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} may place Agents"),
      args: {
        tkn_playerName: this.game.playerManager
          .getPlayer({ playerId: activePlayerId })
          .getName(),
        // tkn_mapToken: this.createMapTokenId(activePlayerId),
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

  private updateInterfaceSelectAgent({ agents }: { agents: Agent[] }) {
    this.game.clearPossible();

    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} must select an Agent to place"),
      args: {
        tkn_playerName: "${you}",
      },
    });
    this.addAgentButtons({ agents });

    this.game.addPassButton({
      optionalAction: this.args.optionalAction,
      text: _("Do not place"),
    });
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceSelectLocation({ agent }: { agent: Agent }) {
    this.selectedAgent = agent;
    this.game.clearPossible();

    this.updatePageTitle();
    this.setLocationsSelectable();

    this.game.addPassButton({
      optionalAction: this.args.optionalAction,
      text: _("Do not place"),
    });
    this.game.addUndoButtons(this.args);
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
        location: _(
          card.type === EMPIRE_CARD ? card[card.side].name : card.name
        ),
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

  private updateInterfaceSelectEmpireToRepressTo({
    id,
    location,
  }: {
    id: string;
    location: PlaceAgentLocation;
  }) {
    this.game.clearPossible();
    this.game.setLocationSelected({ id });

    this.game.clientUpdatePageTitle({
      text: _(
        "${tkn_playerName} must select an empire to repress ${tkn_mapToken} to"
      ),
      args: {
        tkn_playerName: "${you}",
        tkn_mapToken: tknMapToken(location.tokenToRepress.token.id),
      },
    });

    location.tokenToRepress.empires.forEach((empire: Empire) => {
      this.game.setLocationSelectable({
        id: empire.id,
        callback: () =>
          this.updateInterfaceConfirmLocation({ id, location, empire }),
      });
    });
  }

  private updateInterfaceConfirmLocation({
    id,
    location,
    empire,
  }: {
    id: string;
    location: PlaceAgentLocation;
    empire?: Empire;
  }) {
    this.game.clearPossible();
    this.game.setLocationSelected({ id });
    if (empire) {
      this.game.setLocationSelected({ id: empire.id });
    }

    this.updatePageTitleConfirmLocation({ location, empire });
    // TODO handle cases where there are two different agents

    this.game.addConfirmButton({
      callback: () =>
        this.game.takeAction({
          action: "actPlaceAgent",
          args: {
            agent: this.selectedAgent,
            locationId: id,
            empireId: empire ? empire.id : null,
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

  private createMapTokenId(activePlayerId?: number) {
    const agent = this.selectedAgent;
    let id = "";
    if (agent.type === PAWN) {
      const bank = this.game.playerManager
        .getPlayer({ playerId: activePlayerId || this.game.getPlayerId() })
        .getBank();
      id = `${bank}_pawn`;
    } else {
      id = `${agent.separator}_${agent.type}`;
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
          callback: () => {
            if (location?.tokenToRepress?.empires) {
              this.updateInterfaceSelectEmpireToRepressTo({ id, location });
            } else {
              this.updateInterfaceConfirmLocation({ id, location });
            }
          },
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
    empire,
  }: {
    location: PlaceAgentLocation;
    empire?: Empire;
  }) {
    const { name, cost, tokenToRepress, tokenToKill } = location;
    if (tokenToRepress?.token) {
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
          tkn_mapToken_repressed: tknMapToken(tokenToRepress.token.id),
        },
      });
    } else if (tokenToKill) {
      this.game.clientUpdatePageTitle({
        text: _(
          "Place ${tkn_mapToken} on ${location} and Kill ${tkn_mapToken_killed} ?"
        ),
        args: {
          tkn_playerName: "${you}",
          tkn_mapToken: this.createMapTokenId(),
          location: _(name),
          tkn_mapToken_killed: tknMapToken(tokenToKill.id),
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

  private addAgentButtons({ agents }: { agents: Agent[] }) {
    agents.forEach((agent, index) => {
      this.game.addAgentButton({
        callback: () => {
          this.selectedAgent = agent;
          this.updateInterfaceSelectLocation({ agent });
        },
        id: `agent_${index}`,
        agent,
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
