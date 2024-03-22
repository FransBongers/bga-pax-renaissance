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
      text: _("${you} must select a card to sell"),
      args: {
        you: "${you}",
      },
    });

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

    const callback = () =>
      this.game.takeAction({
        action: "actPlayerAction",
        args: {
          action: "sellCard",
          cardId: card.id,
          royalCouple: false,
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

  private updateInterfaceConfirmRoyalCouple({ king, queens }: RoyalCouple) {
    this.game.clearPossible();
    this.game.setCardSelected({ id: king.id });
    queens.forEach((queen) => {
      this.game.setCardSelected({ id: queen.id });
    });

    this.game.clientUpdatePageTitle({
      text: _(
        "Sell ${queenNames} and ${kingName} for ${amount} ${tkn_florin} ?"
      ),
      args: {
        kingName: king[king.side].name,
        queenNames: this.getQueenNamesLog({ queens }),
        amount: this.getTotalAmount({ king, queens }),
        tkn_florin: tknFlorin(),
      },
    });

    const callback = () =>
      this.game.takeAction({
        action: "actPlayerAction",
        args: {
          action: "sellCard",
          cardId: king.id,
          royalCouple: true,
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

  private getQueenNamesLog({ queens }: { queens: QueenCard[] }) {
    let log = "";
    let args = {};

    queens.forEach((queen, index) => {
      const separator = index === 0 ? "" : ", ";
      const key = "${queenName_" + index + "}";
      log = log + separator + key;
      args[`queenName_${index}`] = _(queen.name);
    });

    return {
      log,
      args,
    };
  }

  private getTotalAmount({ king, queens }: RoyalCouple) {
    let total = king.sellValue;
    queens.forEach((queen) => {
      total = total + queen.sellValue;
    });
    return total;
  }

  private setCardsSelectable() {
    this.args.cards.forEach((card: EmpireCard | TableauCard) => {
      this.game.setCardSelectable({
        id: card.id,
        callback: () => this.updateInterfaceConfirm({ card }),
      });
    });
  }

  private setRoyalCouplesSelectable() {
    this.args.royalCouples.forEach((couple: RoyalCouple) => {
      const { king, queens } = couple;
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
      queens.forEach((queen) =>
        this.game.setCardSelectable({
          id: queen.id,
          callback: () => this.updateInterfaceConfirmRoyalCouple(couple),
        })
      );
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
