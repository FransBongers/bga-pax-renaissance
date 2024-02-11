class BattlePlaceAttackersState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringBattlePlaceAttackersArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringBattlePlaceAttackersArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving BattleLocationState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} must place surviving attackers"),
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
      text: _("${tkn_playerName} must select a surviving attacker to place"),
      args: {
        tkn_playerName: "${you}",
      },
    });
    this.setTokensSelectable();
    this.addAgentButtons();
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceAgentSelected({
    option,
  }: {
    option: PlaceAttackingAgentOption;
  }) {
    this.game.clearPossible();

    this.game.clientUpdatePageTitle({
      text: _(
        "${tkn_playerName} must select a ${borderOrCity} to place ${tkn_mapToken} onto"
      ),
      args: {
        tkn_playerName: "${you}",
        borderOrCity:
          option.agent.type === PAWN || option.agent.type === PIRATE
            ? _("Border")
            : _("City"),
        tkn_mapToken: this.createMapTokenId({ agent: option.agent }),
      },
    });

    option.locations.forEach((location) => {
      this.game.setLocationSelectable({
        id: location.id,
        callback: () =>
          this.updateInterfaceConfirmAgentLocation({
            agent: option.agent,
            location,
          }),
      });
    });
    this.game.addCancelButton();
  }

  private updateInterfaceConfirmAgentLocation({
    agent,
    location,
  }: {
    agent: Agent;
    location: Border | City;
  }) {
    this.game.clearPossible();
    this.game.setLocationSelected({ id: location.id });

    this.game.clientUpdatePageTitle({
      text: _("Place ${tkn_mapToken} onto ${locationName}?"),
      args: {
        tkn_mapToken: this.createMapTokenId({ agent }),
        locationName: _(location.name),
      },
    });

    const callback = () => {
      this.game.clearPossible();
      this.game.takeAction({
        action: "actBattlePlaceAttackers",
        args: {
          agent,
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

  private updateInterfaceTokenSelected({
    option,
  }: {
    option: PlaceAttackingRepressedTokenOption;
  }) {
    this.game.clearPossible();

    this.game.clientUpdatePageTitle({
      text: _(
        "${tkn_playerName} must select a ${borderOrCity} to place ${tkn_mapToken} onto"
      ),
      args: {
        tkn_playerName: "${you}",
        borderOrCity: option.token.type === PAWN ? _("Border") : _("City"),
        tkn_mapToken: tknMapToken(option.token.id),
      },
    });

    option.locations.forEach((location) => {
      this.game.setLocationSelectable({
        id: location.id,
        callback: () =>
          this.updateInterfaceConfirmTokenLocation({
            token: option.token,
            location,
          }),
      });
    });
    this.game.addCancelButton();
  }

  private updateInterfaceConfirmTokenLocation({
    token,
    location,
  }: {
    token: Token;
    location: Border | City;
  }) {
    this.game.clearPossible();
    this.game.setLocationSelected({ id: location.id });
    this.game.setTokenSelected({ id: token.id });

    this.game.clientUpdatePageTitle({
      text: _("Place ${tkn_mapToken} onto ${locationName}?"),
      args: {
        tkn_mapToken: tknMapToken(token.id),
        locationName: _(location.name),
      },
    });

    const callback = () => {
      this.game.clearPossible();
      this.game.takeAction({
        action: "actBattlePlaceAttackers",
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

  private createMapTokenId({ agent }: { agent: Agent }) {
    let id = "";
    if (agent.type === PAWN) {
      const bank = this.game.playerManager
        .getPlayer({ playerId: this.game.getPlayerId() })
        .getBank();
      id = `${bank}_pawn`;
    } else {
      id = `${agent.separator}_${agent.type}`;
    }
    return id;
  }

  private addAgentButtons() {
    const uniqueAgents = getUniqueAgents({
      agents: this.args.options.agents.map(
        (option: PlaceAttackingAgentOption) => option.agent
      ),
    });

    uniqueAgents.forEach((agent: Agent, index) => {
      const option = this.args.options.agents.find(
        (option) =>
          option.agent.separator === agent.separator &&
          option.agent.type === agent.type
      );
      if (!option) {
        return;
      }
      // this.game.addPrimaryActionButton({
      //   id: `agent_button_${index}`,
      //   text: `${option.agent.type} agent`,
      //   // text: this.game.format_string_recursive("${tkn_mapToken} Agent", {
      //   //   tkn_mapToken: tknMapToken(this.createAgentMapTokenId(agent)),
      //   // }),
      //   callback: () => this.updateInterfaceAgentSelected({ option }),
      // });
      this.game.addAgentButton({
        id: `agent_button_${index}`,
        agent: option.agent,
        callback: () => this.updateInterfaceAgentSelected({ option }),
      });
    });
  }

  // private createAgentMapTokenId(agent: Agent) {
  //   let id = "";
  //   if (agent.type === PAWN) {
  //     const bank = this.game.playerManager
  //       .getPlayer({ playerId: this.game.getPlayerId() })
  //       .getBank();
  //     id = `${bank}_pawn`;
  //   } else {
  //     id = `${agent.separator}_${agent.type}`;
  //   }
  //   return id;
  // }

  private setTokensSelectable() {
    this.args.options.repressedTokens.forEach(
      (option: PlaceAttackingRepressedTokenOption) => {
        this.game.setTokenSelectable({
          id: option.token.id,
          callback: () => this.updateInterfaceTokenSelected({ option }),
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
