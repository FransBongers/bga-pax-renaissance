class RegimeChangeGoldenLibertyState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringRegimeChangeGoldenLibertyArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringRegimeChangeGoldenLibertyArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving RegimeChangeGoldenLibertyState");
  }

  setDescription(
    activePlayerId: number,
    args: OnEnteringRegimeChangeGoldenLibertyArgs
  ) {
    this.args = args;
    this.game.clientUpdatePageTitle({
      text: _(
        '${tkn_playerName} may change ${empireName} to a Medieval state'
      ),
      args: {
        tkn_playerName: this.game.playerManager
          .getPlayer({ playerId: activePlayerId })
          .getName(),
        empireName: this.args.empire.name,
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

    this.game.clientUpdatePageTitle({
      text: _(
        "Golden Liberty: ${you} may change ${empireName} to a Medieval state"
      ),
      args: {
        you: "${you}",
        empireName: this.args.empire.name,
      },
    });

    this.game.addPrimaryActionButton({
      id: "change_btn",
      text: _("Change"),
      callback: () =>
        this.game.takeAction({
          action: "actRegimeChangeGoldenLiberty",
          args: {
            change: true,
          },
        }),
    });

    this.game.addSkipButton({
      callback: () =>
        this.game.takeAction({
          action: "actRegimeChangeGoldenLiberty",
          args: {
            change: false,
          },
        }),
    })
    this.game.addUndoButtons(this.args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...


}
