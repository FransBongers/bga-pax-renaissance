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
  }

  // private updateInterfaceSelectEmpire({
  //   token,
  //   empires,
  // }: {
  //   token: Token;
  //   empires: Empire[];
  // }) {
  //   this.game.clearPossible();
  //   this.game.setTokenSelected({ id: token.id });

  //   this.game.clientUpdatePageTitle({
  //     text: _("${tkn_playerName} must select the Empire to Tax"),
  //     args: {
  //       tkn_playerName: "${you}",
  //     },
  //   });

  //   empires.forEach((empire) => {
  //     this.game.setLocationSelectable({
  //       id: empire.id,
  //       callback: () => this.updateInterfaceConfirm({ token, empire }),
  //     });
  //   });
  // }

  // private updateInterfaceConfirm({
  //   token,
  //   empire,
  // }: {
  //   token: Token;
  //   empire: Empire;
  // }) {
  //   this.game.clearPossible();
  //   this.game.setTokenSelected({ id: token.id });
  //   this.game.setLocationSelected({ id: empire.id });
  //   this.game.clientUpdatePageTitle({
  //     text: _("Tax ${tkn_mapToken} in ${tkn_boldText}?"),
  //     args: {
  //       tkn_mapToken: tknMapToken(token.id),
  //       tkn_boldText: _(empire.name),
  //     },
  //   });
  //   this.game.addConfirmButton({
  //     callback: () =>
  //       this.game.takeAction({
  //         action: "actTableauOpTax",
  //         args: {
  //           tokenId: token.id,
  //           empireId: empire.id,
  //         },
  //       }),
  //   });
  //   this.game.addCancelButton();
  // }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  // private setTokensSelectable() {
  //   Object.values(this.args.tokens).forEach(({ token, empires }) => {
  //     this.game.setTokenSelectable({
  //       id: token.id,
  //       callback: () => {
  //         if (empires.length > 1) {
  //           this.updateInterfaceSelectEmpire({
  //             token,
  //             empires,
  //           });
  //         } else {
  //           this.updateInterfaceConfirm({
  //             token,
  //             empire: empires[0],
  //           });
  //         }
  //       },
  //     });
  //   });
  // }

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
