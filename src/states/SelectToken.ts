class SelectTokenState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringSelectTokenArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringSelectTokenArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving SelectTokenState");
  }

  setDescription(activePlayerId: number, args: OnEnteringSelectTokenArgs) {
    this.args = args;
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} must select a ${tkn_mapToken} to place"),
      args: {
        tkn_playerName: this.game.playerManager
          .getPlayer({ playerId: activePlayerId })
          .getName(),
        tkn_mapToken: tknMapToken(this.args.tokens[0].id),
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
      text: _("${tkn_playerName} must select a ${tkn_mapToken} to place"),
      args: {
        tkn_playerName: "${you}",
        tkn_mapToken: tknMapToken(this.args.tokens[0].id),
      },
    });
    this.setTokensSelectable();
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceConfirm({ id }: { id: string }) {
    this.game.clearPossible();
    this.game.setTokenSelected({ id });
    this.game.clientUpdatePageTitle({
      text: _("Select ${tkn_mapToken} ?"),
      args: {
        tkn_mapToken: tknMapToken(this.args.tokens[0].id),
      },
    });

    const callback = () =>
      this.game.takeAction({
        action: "actSelectToken",
        args: {
          tokenId: id,
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

  // private createMapTokenId() {
  //   const agent = this.args.agents[0];
  //   let id = '';
  //   if (agent.type === PAWN) {
  //     const bank = this.game.playerManager.getPlayer({playerId: this.game.getPlayerId()}).getBank();
  //     id = `${bank}_pawn`;
  //   } else {
  //     id = `${agent.religion}_${agent.type}`;
  //   }
  //   return id;
  // }

  private setTokensSelectable() {
    this.args.tokens.forEach(({ id }) => {
      this.game.setTokenSelectable({
        id,
        callback: () => this.updateInterfaceConfirm({ id }),
      });
    });
  }
}
