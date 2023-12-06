class BishopPacificationState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringBishopPacificationArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringBishopPacificationArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving ConfirmTurnState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: "${tkn_playerName} may select a Token to Kill",
      args: {
        tkn_playerName: this.game.playerManager.getPlayer({playerId: activePlayerId}).getName()
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
      text: "${tkn_playerName} may choose a Token to Kill",
      args: {
        tkn_playerName: '${you}'
      },
    });
    this.game.addSecondaryActionButton({
      id: "skip_button",
      text: _("Skip"),
      callback: () =>
        this.game.takeAction({
          action: "actBishopPacification",
          args: {
            tokenId: null,
          },
        }),
    });
    this.setTokensSelectable();
  }

  private updateInterfaceConfirm({token}: {token: Token}) {
    this.game.clearPossible();
    this.game.setTokenSelected({id: token.id});

    this.game.clientUpdatePageTitle({
      text: "Kill ${tkn_mapToken} ?",
      args: {
        tkn_mapToken: tknMapToken(token.id),
      },
    });
    this.game.addConfirmButton({
      callback: () =>
        this.game.takeAction({
          action: "actBishopPacification",
          args: {
            tokenId: token.id,
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

  private setTokensSelectable() {
    this.args.tokens.forEach((token) => {
      this.game.setTokenSelectable({
        id: token.id,
        callback: () => this.updateInterfaceConfirm({ token }),
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
