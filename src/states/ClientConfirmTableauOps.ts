class ClientConfirmTableauOpsState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringClientConfirmTableauOpsArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringClientConfirmTableauOpsArgs) {
    this.args = args;
    console.log("confirm ops args", this.args);
    if (!this.args.availableOps.eastAndWest) {
      this.updateInterfaceConfirm();
    } else {
      this.updateInterfaceInitialStep();
    }
  }

  onLeavingState() {
    debug("Leaving ClientConfirmTableauOpsState");
  }

  setDescription(activePlayerId: number) {}

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
    // this.game.setCardSelected({ id: this.args.victoryCard.id });

    this.game.clientUpdatePageTitle({
      text: _("Perform East and West ops in one action?"),
      args: {},
    });
    this.game.addConfirmButton({
      callback: () =>
        this.game.takeAction({
          action: "actPlayerAction",
          args: {
            action: `tableauOps`,
            region: EAST_AND_WEST,
            firstOp: this.args.firstOp,
          },
        }),
    });
    this.game.addSecondaryActionButton({
      id: "region_ops_btn",
      text: this.args.region === EAST ? _("East ops only") : _("West ops only"),
      callback: () =>
        this.game.takeAction({
          action: "actPlayerAction",
          args: {
            action: `tableauOps`,
            region: this.args.region,
            firstOp: this.args.firstOp,
          },
        }),
    });
    this.game.addCancelButton();
  }

  private updateInterfaceConfirm() {
    this.game.clearPossible();
    const text =
      this.args.region === EAST
        ? _("Perform Tableau Ops East?")
        : _("Perform Tableau Ops West?");
    this.game.clientUpdatePageTitle({
      text,
      args: {},
    });
    this.game.addConfirmButton({
      callback: () =>
        this.game.takeAction({
          action: "actPlayerAction",
          args: {
            action: `tableauOps`,
            region: this.args.region,
            firstOp: this.args.firstOp,
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
