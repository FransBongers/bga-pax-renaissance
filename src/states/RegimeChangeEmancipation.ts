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
        "${tkn_playerName} may select a Repressed Token to move onto the Map"
      ),
      args: {
        tkn_playerName: "${you}",
      },
    });
    this.game.addSkipButton({
      callback: () =>
        this.game.takeAction({
          action: "actRegimeChangeEmancipation",
          args: {
            tokenId: null,
            locationId: null,
          },
        }),
    });
    this.setTokensSelectable();
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceSelectLocation({
    locations,
    tokenId,
  }: {
    locations: (Border | City)[];
    tokenId: string;
  }) {
    this.game.clearPossible();
    this.game.setTokenSelected({ id: tokenId });

    this.game.clientUpdatePageTitle({
      text: _(
        "${tkn_playerName} must select a ${borderOrCity} to move ${tkn_mapToken} onto"
      ),
      args: {
        tkn_playerName: "${you}",
        borderOrCity:
          this.args.tokens.find((token) => token.id === tokenId).type === PAWN
            ? _("Border")
            : _("City"),
        tkn_mapToken: tknMapToken(tokenId),
      },
    });
    this.game.addCancelButton();
    this.setLocationsSelectable({ locations, tokenId });
  }

  private updateInterfaceConfirmLocation({
    location,
    tokenId,
  }: {
    tokenId: string;
    location: Border | City;
  }) {
    this.game.clearPossible();
    this.game.setLocationSelected({ id: location.id });
    this.game.setTokenSelected({ id: tokenId });

    this.game.clientUpdatePageTitle({
      text: _("Move ${tkn_mapToken} onto ${locationName}?"),
      args: {
        tkn_mapToken: tknMapToken(tokenId),
        locationName: _(location.name),
      },
    });

    this.game.addConfirmButton({
      callback: () => {
        this.game.clearPossible();
        this.game.takeAction({
          action: "actRegimeChangeEmancipation",
          args: {
            tokenId: tokenId,
            locationId: location.id,
          },
        });
      },
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

  // private addAgentButtons() {
  //   this.args.agents.forEach((agent, index) => {
  //     this.game.addPrimaryActionButton({
  //       id: `agent_button_${index}`,
  //       text: `${agent.type} agent`,
  //       // text: this.game.format_string_recursive("${tkn_mapToken} Agent", {
  //       //   tkn_mapToken: tknMapToken(this.createAgentMapTokenId(agent)),
  //       // }),
  //       callback: () => this.updateInterfaceConfirmSelectAgent({ agent }),
  //     });
  //   });
  // }

  // private createAgentMapTokenId(agent: Agent) {
  //   let id = "";
  //   if (agent.type === PAWN) {
  //     const bank = this.game.playerManager
  //       .getPlayer({ playerId: this.game.getPlayerId() })
  //       .getBank();
  //     id = `${bank}_pawn`;
  //   } else {
  //     id = `${agent.religion}_${agent.type}`;
  //   }
  //   return id;
  // }

  private setLocationsSelectable({
    locations,
    tokenId,
  }: {
    locations: (Border | City)[];
    tokenId: string;
  }) {
    locations.forEach((location) => {
      this.game.setLocationSelectable({
        id: location.id,
        callback: () =>
          this.updateInterfaceConfirmLocation({ location, tokenId }),
      });
    });
  }

  private setTokensSelectable() {
    Object.entries(this.args.options).forEach(([tokenId, locations]) => {
      this.game.setTokenSelectable({
        id: tokenId,
        callback: () =>
          this.updateInterfaceSelectLocation({ locations, tokenId }),
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
