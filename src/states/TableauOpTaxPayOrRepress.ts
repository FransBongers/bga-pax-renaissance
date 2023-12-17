class TableauOpTaxPayOrRepressState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringTableauOpTaxPayOrRepressArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringTableauOpTaxPayOrRepressArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving TableauOpTaxState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} must pay or Repress Concession"),
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
    this.game.setLocationSelected({ id: this.args.empire.id });
    this.game.setTokenSelected({ id: this.args.token.id });
    this.game.clientUpdatePageTitle({
      text: _(
        "Your ${tkn_mapToken} is taxed. ${tkn_playerName} must pay 1 ${tkn_florin} to China or Repress your ${tkn_mapToken}"
      ),
      args: {
        tkn_playerName: "${you}",
        tkn_mapToken: tknMapToken(this.args.token.id),
        tkn_florin: tknFlorin(),
      },
    });

    this.game.addPrimaryActionButton({
      id: "pay_btn",
      text: _("Pay"),
      callback: () =>
        this.game.takeAction({
          action: "actTableauOpTaxPayOrRepress",
          args: {
            pay: true,
          },
        }),
    });

    this.game.addPrimaryActionButton({
      id: "repress_btn",
      text: _("Repress"),
      callback: () =>
        this.game.takeAction({
          action: "actTableauOpTaxPayOrRepress",
          args: {
            pay: false,
          },
        }),
    });
    this.game.addUndoButtons(this.args);
  }

  
}
