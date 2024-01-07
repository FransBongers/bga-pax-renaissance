class AbilityActionSelectApostasyState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringAbilityActionSelectApostastStateArgs;

  private apostasyTextMap = {
    [APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT]: _('Islamic-Catholic'),
    [APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT]: _('Reformist-Catholic'),
    [APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT]: _('Reformist-Islamic'),
  }

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringAbilityActionSelectApostastStateArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving AbilityActionSelectApostastStateState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} must choose an apostasy to perform"),
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
      text: _("${tkn_playerName} must choose an apostasy to perform"),
      args: {
        tkn_playerName: "${you}",
      },
    });

    this.addButtons();
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceConfirm({apostasy}: {apostasy: string;}) {
    this.game.clearPossible();
    this.game.clientUpdatePageTitle({
      text: _("Perform ${tkn_oneShot} apostasy?"),
      args: {
        tkn_oneShot: apostasy,
      },
    });

    this.game.addConfirmButton({
      callback: () =>
        this.game.takeAction({
          action: "actAbilityActionSelectApostasy",
          args: {
            apostasy,
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

  private addButtons() {
    this.args.options.forEach((apostasy, index) => {
      this.game.addPrimaryActionButton({
        id: `apostasy_btn_${index}`,
        text: this.apostasyTextMap[apostasy],
        callback: () => this.updateInterfaceConfirm({apostasy})
      })
    })
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
