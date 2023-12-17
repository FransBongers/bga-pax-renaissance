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
      text: _("${tkn_playerName} may perform actions"),
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
    this.setVictoryCardsSelectable();
    this.addActionButtons();
    // this.addTest();
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceConfirmPurchase({
    card,
    column,
  }: {
    card: TableauCard;
    column: number;
  }) {
    this.game.clearPossible();
    // const node = document.getElementById(`${card.idit("_")[0]}-front`);
    // if (node) {
    //   node.classList.add(PR_SELECTED);
    // }
    this.game.setCardSelected({ id: card.id });
    this.game.clientUpdatePageTitle({
      text: _("Purchase ${cardName} for ${amount} ${tkn_florin} ?"),
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

  private updateInterfaceOnClickHandCard({ card }: { card: TableauCard }) {
    this.game.clearPossible();
    this.game.setCardSelected({ id: card.id });
    // const node = document.getElementById(`${card.id.split("_")[0]}-front`);
    // if (node) {
    //   node.classList.add(PR_SELECTED);
    // }
    this.game.clientUpdatePageTitle({
      text: _("Play or sell ${cardName}?"),
      args: {
        cardName: _(card.name),
      },
    });
    //
    this.game.addPrimaryActionButton({
      id: "play_card_button",
      text: _("Play"),
      callback: () =>
        this.game.takeAction({
          action: "actPlayerAction",
          args: {
            action: "playCard",
            cardId: card.id,
          },
        }),
    });
    this.game.addPrimaryActionButton({
      id: "sell_card_button",
      text: _("Sell"),
      // text: this.game.format_string_recursive(
      //   "Sell for ${amount} ${tkn_florin}",
      //   {
      //     amount: 2,
      //     tkn_florin: _("Florin(s)"),
      //   }
      // ),
      callback: () =>
        this.game.takeAction({
          action: "actPlayerAction",
          args: {
            action: "sellCard",
            cardId: card.id,
          },
        }),
    });
    // this.game.addConfirmButton({
    //   callback: () =>
    //     this.game.takeAction({
    //       action: "actPlayerAction",
    //       args: {
    //         action: "sellCard",
    //         cardId: card.id,
    //       },
    //     }),
    // });
    this.game.addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private addActionButtons() {
    REGIONS.forEach((region) => {
      if (Object.keys(this.args.availableOps[region]).length > 0) {
        this.game.addPrimaryActionButton({
          id: `${region}_ops_btn`,
          text: region === EAST ? _("Tableau Ops East") : _("Tableau Ops West"),
          callback: () =>
            this.game.takeAction({
              action: "actPlayerAction",
              args: {
                action: `tableauOps`,
                region,
              },
            }),
        });
      }
    });
  }

  private addTest() {
    this.game.addPrimaryActionButton({
      text: "Test",
      id: "test_button",
      callback: () => {
        console.log("Testing");
        const card = this.game.gameMap
          .getEmpireSquareStock({ empireId: ENGLAND })
          .getCards()[0];
        console.log("card", card);

        const node = document.getElementById("EmpireSquare_Aragon");
        console.log("node", node);
        node.style.minHeight = `calc(var(--paxRenCardScale) * ${2 * 151}px)`;

        console.log(this.game.tableauCardManager.vassalStocks);
        this.game.tableauCardManager.vassalStocks[ARAGON].addCard(card);
      },
    });

    this.game.addPrimaryActionButton({
      text: "Test2",
      id: "test2_button",
      callback: () => {
        console.log("Testing");
        const card = this.game.gameMap
          .getEmpireSquareStock({ empireId: HOLY_ROMAN_EMIRE })
          .getCards()[0];
        console.log("card", card);

        const node = document.getElementById("EmpireSquare_Aragon");
        console.log("node", node);
        node.style.minHeight = `calc(var(--paxRenCardScale) * ${3 * 151}px)`;

        console.log(this.game.tableauCardManager.vassalStocks);
        this.game.tableauCardManager.vassalStocks[ARAGON].addCard(card);
      },
    });

    this.game.addPrimaryActionButton({
      text: "Test3",
      id: "test3_button",
      callback: () => {
        console.log("Testing");
        const card = this.game.gameMap
          .getEmpireSquareStock({ empireId: HUNGARY })
          .getCards()[0];
        console.log("card", card);

        const node = document.getElementById("EmpireSquare_Aragon");
        console.log("node", node);
        node.style.minHeight = `calc(var(--paxRenCardScale) * ${4 * 151}px)`;

        console.log(this.game.tableauCardManager.vassalStocks);
        this.game.tableauCardManager.vassalStocks[ARAGON].addCard(card);
      },
    });
  }

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
      const nodeId = `${id}-front`;
      const node = $(nodeId);
      if (node === null) {
        return;
      }
      node.classList.add(PR_SELECTABLE);
      this.game._connections.push(
        dojo.connect(node, "onclick", this, () =>
          this.updateInterfaceOnClickHandCard({ card })
        )
      );
    });
  }

  private setMarketCardsSelectable() {
    this.args.cardsPlayerCanPurchase.forEach((card) => {
      const { id, location } = card;
      const [market, region, column] = location.split("_");
      const nodeId = `${id}-front`;
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
    REGIONS.forEach((region) => {
      if (!this.args.tradeFair[region]) {
        return;
      }
      this.game.setCardSelectable({
        id: this.args.tradeFair[region].card.id,
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

  private setVictoryCardsSelectable() {
    this.args.declarableVictories.forEach((victoryCard) => {
      this.game.setCardSelectable({
        id: victoryCard.id,
        callback: () =>
          this.game
            .framework()
            .setClientState<OnEnteringClientDeclareVictoryArgs>(
              CLIENT_DECLARE_VICTORY_STATE,
              {
                args: {
                  victoryCard,
                },
              }
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
