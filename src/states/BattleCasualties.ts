class BattleCasualtiesState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringBattleCasualtiesArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringBattleCasualtiesArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving BattleLocationState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} must select a Token to eliminate"),
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
        "${you} must select a Token to eliminate (${number} remaining)"
      ),
      args: {
        you: "${you}",
        number: this.args.numberToEliminate,
      },
    });
    this.setTokensSelectable();
    this.addAgentButtons();
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceConfirmSelectAgent({ agent }: { agent: Agent }) {
    this.game.clearPossible();

    this.game.clientUpdatePageTitle({
      text: _("Eliminate ${tkn_mapToken} Agent?"),
      args: {
        tkn_mapToken: this.createAgentMapTokenId(agent),
      },
    });

    const callback = () =>
      this.game.takeAction({
        action: "actBattleCasualties",
        args: {
          agent,
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

  private updateInterfaceConfirmSelectToken({
    token,
  }: {
    token: Token & { locationName: string };
  }) {
    this.game.clearPossible();
    this.game.setTokenSelected({ id: token.id });

    this.game.clientUpdatePageTitle({
      text: _("Eliminate ${tkn_mapToken} on ${locationName}?"),
      args: {
        tkn_mapToken: tknMapToken(token.id),
        locationName: _(token.locationName),
      },
    });

    const callback = () =>
      this.game.takeAction({
        action: "actBattleCasualties",
        args: {
          tokenId: token.id,
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

  private addAgentButtons() {
    const uniqueAgents = getUniqueAgents({ agents: this.args.agents });
    uniqueAgents.forEach((agent, index) => {
      this.game.addAgentButton({
        id: `agent_button_${index}`,
        agent,
        callback: () => this.updateInterfaceConfirmSelectAgent({ agent }),
      });
    });
  }

  private createAgentMapTokenId(agent: Agent) {
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

  private setTokensSelectable() {
    this.args.tokens.forEach((token) => {
      this.game.setTokenSelectable({
        id: token.id,
        callback: () => this.updateInterfaceConfirmSelectToken({ token }),
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
