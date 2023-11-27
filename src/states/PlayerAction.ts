class PlayerActionState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringPlayerActionArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringPlayerActionArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving PlayerActionsState");
  }

  setDescription(activePlayerId: number) {
    console.log("setDescription playerAction", activePlayerId);
    this.game.clientUpdatePageTitle({
      text: "${tkn_playerName} may perform actions",
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
    this.updatePageTitle();
    this.setMarketCardsSelectable();
    this.setHandCardsSelectable();
    this.setTradeFairSelectable();
  }

  private updateInterfaceConfirmPurchase({
    card,
    column,
  }: {
    card: TableauCard;
    column: number;
  }) {
    this.game.clearPossible();
    const node = document.getElementById(`${card.id.split("_")[0]}-front`);
    if (node) {
      node.classList.add(PR_SELECTED);
    }
    this.game.clientUpdatePageTitle({
      text: "Purchase ${cardName} for ${amount} ${tkn_florin} ?",
      args: {
        amount: column,
        cardName: _(card.name),
        tkn_florin: _("Florin(s)"),
      },
    });
    this.game.addConfirmButton({
      callback: () =>
        this.game.takeAction({
          action: "actPlayerAction",
          args: {
            action: "purchaseCard",
            cardId: card.id,
          },
        }),
    });
    this.game.addCancelButton();
  }

  private updateInterfaceConfirmSellCard({ card }: { card: TableauCard }) {
    this.game.clearPossible();
    const node = document.getElementById(`${card.id.split("_")[0]}-front`);
    if (node) {
      node.classList.add(PR_SELECTED);
    }
    this.game.clientUpdatePageTitle({
      text: "Sell ${cardName} for ${amount} ${tkn_florin} ?",
      args: {
        amount: 2,
        cardName: _(card.name),
        tkn_florin: _("Florin(s)"),
      },
    });
    this.game.addConfirmButton({
      callback: () =>
        this.game.takeAction({
          action: "actPlayerAction",
          args: {
            action: "sellCard",
            cardId: card.id,
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

  private updatePageTitle() {
    const remainingActions = this.args.remainingActions;

    let titleText = _("${tkn_playerName} may perform an action");

    if (remainingActions === 1) {
      titleText += _(" (1 remaining)");
    } else if (remainingActions === 2) {
      titleText += _(" (2 remaining)");
    }

    this.game.clientUpdatePageTitle({
      text: titleText,
      args: {
        tkn_playerName: "${you}",
      },
    });
  }

  private setHandCardsSelectable() {
    const cards = this.game.hand.getCards();
    cards.forEach((card) => {
      const { id } = card;
      const nodeId = `${id.split("_")[0]}-front`;
      const node = $(nodeId);
      if (node === null) {
        return;
      }
      node.classList.add(PR_SELECTABLE);
      this.game._connections.push(
        dojo.connect(node, "onclick", this, () =>
          this.updateInterfaceConfirmSellCard({ card })
        )
      );
    });
  }

  private setMarketCardsSelectable() {
    console.log("setMarketCardsSelectable");
    this.args.cardsPlayerCanPurchase.forEach((card) => {
      const { id, location } = card;
      const [market, region, column] = location.split("_");
      const nodeId = `${id.split("_")[0]}-front`;
      const node = $(nodeId);
      if (node === null) {
        return;
      }
      node.classList.add(PR_SELECTABLE);
      this.game._connections.push(
        dojo.connect(node, "onclick", this, () =>
          this.updateInterfaceConfirmPurchase({ card, column: Number(column) })
        )
      );
      // this.game._connections.push(dojo.connect(node, 'onClick', () => {
      //   console.log('click');
      //   this.updateInterfaceConfirmPurchase({card, column: Number(column)});
      // }));
    });
  }

  private setTradeFairSelectable() {
    CARDINAL_DIRECTIONS.forEach((region) => {
      if (!this.args.tradeFair[region]) {
        return;
      }
      this.game.setCardSelectable({
        card: this.args.tradeFair[region].card,
        back: true,
        callback: () =>
          this.game
            .framework()
            .setClientState<OnEnteringClientStartTradeFairArgs>(
              CLIENT_START_TRADE_FAIR_STATE,
              { args: this.args.tradeFair[region] }
            ),
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
