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
    this.setOperationsSelectable();
    this.setVictoryCardsSelectable();
    this.addActionButtons();
    // this.addTest();
    this.game.addPassButton({ optionalAction: this.args.optionalAction });
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceSelectCardToPurchase() {
    this.game.clearPossible();
    this.setMarketCardsSelectable();
    this.game.clientUpdatePageTitle({
      text: _("${you} must select a card to purchase"),
      args: {
        you: "${you}",
      },
    });
    this.game.addCancelButton();
  }

  private updateInterfaceConfirmPurchase({
    card,
    column,
  }: {
    card: TableauCard;
    column: number;
  }) {
    this.game.clearPossible();

    this.game.setCardSelected({ id: card.id });
    this.game.clientUpdatePageTitle({
      text: _("Purchase ${cardName} for ${amount} ${tkn_florin} ?"),
      args: {
        amount: column,
        cardName: _(card.name),
        tkn_florin: _("Florin(s)"),
      },
    });
    const callback = () =>
      this.game.takeAction({
        action: "actPlayerAction",
        args: {
          action: "purchaseCard",
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

  private updateInterfaceSelectHandCard() {
    this.game.clearPossible();
    this.setHandCardsSelectable();
    this.game.clientUpdatePageTitle({
      text: _("${you} must select a card to play"),
      args: {
        you: "${you}",
      },
    });
    this.game.addCancelButton();
  }

  private updateInterfaceOnClickHandCard({ card }: { card: TableauCard }) {
    this.game.clearPossible();
    this.game.setCardSelected({ id: card.id });

    this.game.clientUpdatePageTitle({
      text: _("Play ${cardName} to tableau?"),
      args: {
        cardName: _(card.name),
      },
    });

    const callback = () =>
      this.game.takeAction({
        action: "actPlayerAction",
        args: {
          action: "playCard",
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

  private updateInterfaceSelectVictory() {
    this.game.clearPossible();
    this.setVictoryCardsSelectable();
    this.game.clientUpdatePageTitle({
      text: _("${you} must select a Victory to declare"),
      args: {
        you: "${you}",
      },
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

  private addActionButtons() {
    // Purchase card action
    if (this.args.cardsPlayerCanPurchase.length > 0) {
      this.game.addPrimaryActionButton({
        id: "purchase_card_btn",
        text: _("Purchase"),
        callback: () => this.updateInterfaceSelectCardToPurchase(),
      });
    }

    // Play card
    const handCards = this.game.hand.getCards();
    if (handCards.length > 0) {
      this.game.addPrimaryActionButton({
        id: "play_card_btn",
        text: _("Play"),
        callback: () => this.updateInterfaceSelectHandCard(),
      });
    }

    // Sell card
    if (
      this.args._private.cardsPlayerCanSell.cards.length +
        this.args._private.cardsPlayerCanSell.royalCouples.length >
      0
    ) {
      this.game.addPrimaryActionButton({
        id: "sell_card_btn",
        text: _("Sell"),
        callback: () =>
          this.game
            .framework()
            .setClientState<OnEnteringClientSellCardArgs>(
              CLIENT_SELL_CARD_STATE,
              {
                args: this.args._private.cardsPlayerCanSell,
              }
            ),
      });
    }

    // Tableau Ops
    REGIONS.forEach((region) => {
      if (Object.keys(this.args.availableOps[region]).length > 0) {
        this.game.addPrimaryActionButton({
          id: `${region}_ops_btn`,
          text: region === EAST ? _("Tableau Ops East") : _("Tableau Ops West"),
          callback: () =>
            this.game
              .framework()
              .setClientState<OnEnteringClientConfirmTableauOpsArgs>(
                CLIENT_CONFIRM_TABLEAU_OPS,
                {
                  args: {
                    availableOps: this.args.availableOps,
                    region,
                    firstOp: null,
                  },
                }
              ),
        });
      }
    });

    // Trade fair
    if (this.args.tradeFair.west) {
      this.game.addPrimaryActionButton({
        id: "trade_fair_west_btn",
        text: _("Trade Fair West"),
        callback: () =>
          this.game
            .framework()
            .setClientState<OnEnteringClientStartTradeFairArgs>(
              CLIENT_START_TRADE_FAIR_STATE,
              {
                args: {
                  ...this.args.tradeFair.west,
                  action: "actPlayerAction",
                },
              }
            ),
      });
    }
    if (this.args.tradeFair.east) {
      this.game.addPrimaryActionButton({
        id: "trade_fair_east_btn",
        text: _("Trade Fair East"),
        callback: () =>
          this.game
            .framework()
            .setClientState<OnEnteringClientStartTradeFairArgs>(
              CLIENT_START_TRADE_FAIR_STATE,
              {
                args: {
                  ...this.args.tradeFair.east,
                  action: "actPlayerAction",
                },
              }
            ),
      });
    }

    // Claim Victory
    if (this.args.declarableVictories.length > 0) {
      this.game.addPrimaryActionButton({
        id: "declare_victory_btn",
        text: _("Declare Victory"),
        callback: () => this.updateInterfaceSelectVictory(),
      });
    }

    // Extra abilities
    if (Object.entries(this.args.abilityActions).length > 0) {
      this.game.addPrimaryActionButton({
        id: "abiliy_action_btn",
        text: _("Use action from ability"),
        callback: () =>
          this.game
            .framework()
            .setClientState<OnEnteringClientUseAbiltyActionArgs>(
              CLIENT_USE_ABILITY_ACTION_STATE,
              {
                args: this.args.abilityActions,
              }
            ),
      });
    }
  }

  private addTest() {}

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
      this.game.setCardSelectable({
        id: card.id,
        callback: () => this.updateInterfaceOnClickHandCard({ card }),
      });
    });
  }

  private setMarketCardsSelectable() {
    this.args.cardsPlayerCanPurchase.forEach((card) => {
      const { id, location } = card;
      const [market, region, column] = location.split("_");

      this.game.setCardSelectable({
        id: card.id,
        callback: () =>
          this.updateInterfaceConfirmPurchase({ card, column: Number(column) }),
      });
    });
  }

  private setTradeFairSelectable() {
    REGIONS.forEach((region) => {
      if (!this.args.tradeFair[region]) {
        return;
      }
      this.game.setCardSelectable({
        id: this.args.tradeFair[region].card.id,
        callback: () =>
          this.game
            .framework()
            .setClientState<OnEnteringClientStartTradeFairArgs>(
              CLIENT_START_TRADE_FAIR_STATE,
              {
                args: {
                  ...this.args.tradeFair[region],
                  action: "actPlayerAction",
                },
              }
            ),
      });
    });
  }

  private setOperationsSelectable() {
    REGIONS.forEach((region) => {
      Object.entries(this.args.availableOps[region]).forEach(
        ([cardId, operations]) => {
          const card: TableauCard | EmpireCard = cardId.startsWith(
            "EmpireSquare"
          )
            ? this.game.gamedatas.empireSquares.find(
                (square) => square.id === cardId
              )
            : this.game.gamedatas.staticData.tableauCards[cardId.split("_")[0]];
          operations.forEach((operation) => {
            const operationId = `${card.id}_${operation.id}${
              card.type === EMPIRE_CARD ? `_${card.side}` : ""
            }`;

            this.game.setLocationSelectable({
              id: operationId,
              callback: () =>
                this.game
                  .framework()
                  .setClientState<OnEnteringClientConfirmTableauOpsArgs>(
                    CLIENT_CONFIRM_TABLEAU_OPS,
                    {
                      args: {
                        availableOps: this.args.availableOps,
                        region,
                        firstOp: {
                          tableauOpId: operation.id,
                          cardId,
                        },
                      },
                    }
                  ),
            });
          });
        }
      );
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
