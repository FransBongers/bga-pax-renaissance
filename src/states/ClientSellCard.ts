class ClientSellCardState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringClientSellCardArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringClientSellCardArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving ClientSellCardState");
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
    this.setCardsSelectable();
    this.setRoyalCouplesSelectable();

    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} must select a card to sell"),
      args: {
        tkn_playerName: "${you}",
      },
    });

    // this.game.addConfirmButton({
    //   callback: () =>         this.game.takeAction({
    //     action: "actPlayerAction",
    //     args: {
    //       action: "tradeFair",
    //       region: this.args.city.emporium,
    //     },
    //   }),
    // });
    this.game.addCancelButton();
  }

  private updateInterfaceConfirm({ card }: { card: TableauCard | EmpireCard }) {
    this.game.clearPossible();
    this.game.setCardSelected({ id: card.id });

    this.game.clientUpdatePageTitle({
      text: _("Sell ${cardName} for ${amount} ${tkn_florin} ?"),
      args: {
        cardName: card.type === TABLEAU_CARD ? card.name : card[card.side].name,
        amount: card.sellValue,
        tkn_florin: tknFlorin(),
      },
    });
    this.game.addConfirmButton({
      callback: () =>
        this.game.takeAction({
          action: "actPlayerAction",
          args: {
            action: "sellCard",
            cardId: card.id,
            royalCouple: false,
          },
        }),
    });
    this.game.addCancelButton();
  }

  private updateInterfaceConfirmRoyalCouple({ king, queen }: RoyalCouple) {
    this.game.clearPossible();
    this.game.setCardSelected({ id: king.id });
    this.game.setCardSelected({ id: queen.id });

    this.game.clientUpdatePageTitle({
      text: _("Sell ${kingName} and ${queenName} for ${amount} ${tkn_florin} ?"),
      args: {
        kingName: king[king.side].name,
        queenName: queen.name,
        amount: king.sellValue + queen.sellValue,
        tkn_florin: tknFlorin(),
      },
    });
    this.game.addConfirmButton({
      callback: () =>
        this.game.takeAction({
          action: "actPlayerAction",
          args: {
            action: "sellCard",
            cardId: king.id,
            royalCouple: true,
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

  private setCardsSelectable() {
    this.args.cards.forEach(
      (card: EmpireCard | TableauCard) => {
        this.game.setCardSelectable({
          id: card.id,
          callback: () => this.updateInterfaceConfirm({ card }),
        });
      }
    );
  }

  private setRoyalCouplesSelectable() {
    this.args.royalCouples.forEach(
      (couple: RoyalCouple) => {
        const {king, queen} = couple;
        // const node = document.getElementById(king.id);
        // if (!node) {
        //   return;
        // }
        // node.classList.add(PR_SELECTABLE);
        // this.game._connections.push(
        //   dojo.connect(node, "onclick", this, () => this.updateInterfaceConfirmRoyalCouple(couple))
        // );
        this.game.setCardSelectable({
          id: king.id,
          callback: () => this.updateInterfaceConfirmRoyalCouple(couple),
        });
        this.game.setCardSelectable({
          id: queen.id,
          callback: () => this.updateInterfaceConfirmRoyalCouple(couple),
        });
      }
    );
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
