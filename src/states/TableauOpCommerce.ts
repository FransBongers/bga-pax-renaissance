class TableauOpCommerceState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringTableauOpCommerceArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringTableauOpCommerceArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving TableauOpCommerceState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} may take one Florin"),
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
        "${tkn_playerName} must select a card in the market to take 1 ${tkn_florin} from"
      ),
      args: {
        tkn_florin: tknFlorin(),
        tkn_playerName: "${you}",
      },
    });

    this.setCardsSelectable();
    this.setSpacesSelectable();
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceConfirm({ card }: { card: TableauCard }) {
    this.game.clearPossible();
    const isTradeFairCard = Number(card.location.split("_")[2]) === 0;
    this.game.setCardSelected({ id: card.id });
    this.game.clientUpdatePageTitle({
      text: _("Take ${tkn_florin} from ${cardName}?"),
      args: {
        tkn_florin: tknFlorin(),
        cardName: isTradeFairCard ? _("trade fair card") : _(card.name),
      },
    });

    const callback = () =>
      this.game.takeAction({
        action: "actTableauOpCommerce",
        args: {
          cardId: card.id,
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

  private updateInterfaceConfirmSpace({ space }: { space: string }) {
    this.game.clearPossible();
    this.game.setLocationSelected({ id: space });
    this.game.clientUpdatePageTitle({
      text: _("Take ${tkn_florin} from ${cardName}?"),
      args: {
        tkn_florin: tknFlorin(),
        cardName: _("trade fair space"),
      },
    });

    const callback = () =>
      this.game.takeAction({
        action: "actTableauOpCommerce",
        args: {
          space,
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

  private setCardsSelectable() {
    this.args.options.cards.forEach((card: TableauCard) => {
      this.game.setCardSelectable({
        id: card.id,
        callback: () =>
          this.updateInterfaceConfirm({
            card,
          }),
      });
    });
  }

  private setSpacesSelectable() {
    this.args.options.spaces.forEach((space: string) => {
      this.game.setLocationSelectable({
        id: space,
        callback: () =>
          this.updateInterfaceConfirmSpace({
            space,
          }),
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
