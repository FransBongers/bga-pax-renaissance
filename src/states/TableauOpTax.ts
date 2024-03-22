class TableauOpTaxState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringTableauOpTaxArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringTableauOpTaxArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving TableauOpTaxState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} must select a Concession to Tax"),
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
      text: _("${you} must select a Concession to Tax"),
      args: {
        you: "${you}",
      },
    });

    this.setTokensSelectable();
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceSelectEmpire({
    token,
    empires,
  }: {
    token: Token;
    empires: Empire[];
  }) {
    this.game.clearPossible();
    this.game.setTokenSelected({ id: token.id });

    this.game.clientUpdatePageTitle({
      text: _("${you} must select the Empire to Tax"),
      args: {
        you: "${you}",
      },
    });

    empires.forEach((empire) => {
      this.game.setLocationSelectable({
        id: empire.id,
        callback: () => this.updateInterfaceConfirm({ token, empire }),
      });
    });
  }

  private updateInterfaceConfirm({
    token,
    empire,
  }: {
    token: Token;
    empire: Empire;
  }) {
    this.game.clearPossible();
    this.game.setTokenSelected({ id: token.id });
    this.game.setLocationSelected({ id: empire.id });
    this.game.clientUpdatePageTitle({
      text: _("Tax ${tkn_mapToken} in ${tkn_boldText}?"),
      args: {
        tkn_mapToken: tknMapToken(token.id),
        tkn_boldText: _(empire.name),
      },
    });

    const callback = () =>
      this.game.takeAction({
        action: "actTableauOpTax",
        args: {
          tokenId: token.id,
          empireId: empire.id,
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

  private setTokensSelectable() {
    Object.values(this.args.tokens).forEach(({ token, empires }) => {
      this.game.setTokenSelectable({
        id: token.id,
        callback: () => {
          if (empires.length > 1) {
            this.updateInterfaceSelectEmpire({
              token,
              empires,
            });
          } else {
            this.updateInterfaceConfirm({
              token,
              empire: empires[0],
            });
          }
        },
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
