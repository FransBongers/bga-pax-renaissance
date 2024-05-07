//  .##....##..#######..########.####.########
//  .###...##.##.....##....##.....##..##......
//  .####..##.##.....##....##.....##..##......
//  .##.##.##.##.....##....##.....##..######..
//  .##..####.##.....##....##.....##..##......
//  .##...###.##.....##....##.....##..##......
//  .##....##..#######.....##....####.##......

//  .##.....##....###....##....##....###.....######...########.########.
//  .###...###...##.##...###...##...##.##...##....##..##.......##.....##
//  .####.####..##...##..####..##..##...##..##........##.......##.....##
//  .##.###.##.##.....##.##.##.##.##.....##.##...####.######...########.
//  .##.....##.#########.##..####.#########.##....##..##.......##...##..
//  .##.....##.##.....##.##...###.##.....##.##....##..##.......##....##.
//  .##.....##.##.....##.##....##.##.....##..######...########.##.....##

class NotificationManager {
  private game: PaxRenaissanceGame;
  private subscriptions: unknown[];

  constructor(game) {
    this.game = game;
    this.subscriptions = [];
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  setupNotifications() {
    debug('notifications subscriptions setup');

    dojo.connect(this.game.framework().notifqueue, 'addToLog', () => {
      this.game.addLogClass();
    });

    const notifs: [id: string, wait: number][] = [
      // checked
      ['log', undefined],
      ['activateAbility', undefined],
      ['changeEmpireToMedievalState', undefined],
      ['changeEmpireToTheocracy', undefined],
      ['changeEmpireSquare', undefined],
      ['clearTurn', undefined],
      ['coronation', undefined],
      ['deactivateAbility', undefined],
      ['declareVictory', undefined],
      ['discardCard', undefined],
      ['discardQueen', undefined],
      ['flipEmpireCard', undefined],
      ['flipVictoryCard', undefined],
      ['moveEmpireSquare', undefined],
      ['moveToken', undefined],
      ['moveTokensWithinConstantinople', undefined],
      ['oldMaid', undefined],
      ['payFlorinsToChina', undefined],
      ['placeToken', undefined],
      ['playCard', undefined],
      ['purchaseCard', undefined],
      ['refreshHand', undefined],
      ['refreshMarket', undefined],
      ['refreshUI', undefined],
      ['repressToken', undefined],
      ['returnToSupply', undefined],
      ['returnToThrone', undefined],
      ['sellCard', undefined],
      ['sellRoyalCouple', undefined],
      ['tableauOpCommerce', undefined],
      ['tableauOpTaxPay', undefined],
      ['tradeFairConvene', undefined],
      ['tradeFairEmporiumSubsidy', undefined],
      // ["tradeFairPlaceLevy", undefined],
      ['tradeFairProfitDispersalPirates', undefined],
      ['tradeFairProfitDispersalPlayer', undefined],
    ];

    // example: https://github.com/thoun/knarr/blob/main/src/knarr.ts
    notifs.forEach((notif) => {
      this.subscriptions.push(
        dojo.subscribe(notif[0], this, (notifDetails: Notif<unknown>) => {
          debug(`notif_${notif[0]}`, notifDetails); // log notif params (with Tisaac log method, so only studio side)
          // Show log messags in page title
          let msg = this.game.format_string_recursive(
            notifDetails.log,
            notifDetails.args as Record<string, unknown>
          );
          if (msg != '') {
            $('gameaction_status').innerHTML = msg;
            $('pagemaintitletext').innerHTML = msg;
          }

          const promise = this[`notif_${notif[0]}`](notifDetails);

          // tell the UI notification ends
          promise?.then(() =>
            this.game.framework().notifqueue.onSynchronousNotificationEnd()
          );
        })
      );

      // if (notif[2] !== undefined) {
      //   this.game
      //     .framework()
      //     .notifqueue.setIgnoreNotificationCheck(notif[0], notif[2]);
      // }
      // make all notif as synchronous
      // make all notif as synchronous
      this.game.framework().notifqueue.setSynchronous(notif[0], notif[1]);
    });
  }

  // .##....##..#######..########.####.########..######.
  // .###...##.##.....##....##.....##..##.......##....##
  // .####..##.##.....##....##.....##..##.......##......
  // .##.##.##.##.....##....##.....##..######....######.
  // .##..####.##.....##....##.....##..##.............##
  // .##...###.##.....##....##.....##..##.......##....##
  // .##....##..#######.....##....####.##........######.

  async notif_log(notif: Notif<unknown>) {
    // this is for debugging php side
    debug('notif_log', notif.args);
    return Promise.resolve();
  }

  async notif_clearTurn(notif: Notif<NotifClearTurnArgs>) {
    const { notifIds } = notif.args;
    this.game.cancelLogs(notifIds);
  }

  async notif_activateAbility(notif: Notif<NotifActivateAbilityArgs>) {
    const { ability, playerId, data, ownerId } = notif.args;

    const player = this.getPlayer({ playerId });

    switch (ability) {
      case SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_1:
      case SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_2:
        if (ownerId == null) {
          break;
        }
        this.getPlayer({
          playerId: ownerId,
        }).counters.republic.incValue(1);
        break;
      case SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS:
        this.game.gameMap.setVenice2Visibility(true);
        break;
      case SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_1:
      case SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_2:
        if (ownerId == null) {
          break;
        }
        const concessionChange = this.getPlayer({
          playerId: ownerId,
        }).counters.prestige.patron.getValue();
        this.getPlayer({ playerId: ownerId }).counters.concessions.incValue(
          concessionChange
        );
        player.activateAbility({ ability });
        break;
      case SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY:
        const valueChange =
          ownerId !== null
            ? this.getPlayer({
                playerId: ownerId,
              }).counters.prestige.patron.getValue()
            : 0;
        this.game.gameMap.supremeReligion.islamic.bishops.incValue(valueChange);
        player.activateAbility({ ability });
        break;
      case SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_1:
      case SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_2:
      case SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_3:
        if (ownerId == null) {
          break;
        }
        const lawChange = this.getPlayer({
          playerId: ownerId,
        }).counters.prestige.patron.getValue();
        this.getPlayer({ playerId: ownerId }).counters.prestige.law.incValue(
          lawChange
        );
        player.activateAbility({ ability });
        break;
      case SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS:
        if (ownerId == null) {
          break;
        }
        this.game.gameMap.supremeReligion.reformist.bishops.incValue(
          data.bishops
        );
        this.game.gameMap.supremeReligion.reformist.tokens.incValue(
          data.tokens
        );
        player.activateAbility({ ability });
        break;
      default:
        debug('Unhandled ability: ', ability);
    }
  }

  async notif_deactivateAbility(notif: Notif<NotifDeactivateAbilityArgs>) {
    const { ability, data, playerId, ownerId } = notif.args;

    const player = this.getPlayer({ playerId });

    switch (ability) {
      case SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_1:
      case SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_2:
        if (ownerId == null) {
          break;
        }
        this.getPlayer({
          playerId: ownerId,
        }).counters.republic.incValue(-1);
        break;
      case SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS:
        this.game.gameMap.setVenice2Visibility(false);
        break;
      case SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_1:
      case SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_2:
        if (ownerId == null) {
          break;
        }
        const concessionChange =
          this.getPlayer({
            playerId: ownerId,
          }).counters.prestige.patron.getValue() * -1;
        this.getPlayer({ playerId: ownerId }).counters.concessions.incValue(
          concessionChange
        );
        player.deactivateAbility({ ability });
        break;
      case SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY:
        const valueChange =
          ownerId !== null
            ? this.getPlayer({
                playerId: ownerId,
              }).counters.prestige.patron.getValue() * -1
            : 0;
        this.game.gameMap.supremeReligion.islamic.bishops.incValue(valueChange);
        player.deactivateAbility({ ability });
        break;
      case SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_1:
      case SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_2:
      case SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_3:
        if (ownerId == null) {
          break;
        }
        const lawChange =
          this.getPlayer({
            playerId: ownerId,
          }).counters.prestige.patron.getValue() * -1;
        this.getPlayer({ playerId: ownerId }).counters.prestige.law.incValue(
          lawChange
        );
        player.deactivateAbility({ ability });
        break;
      case SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS:
        if (ownerId == null) {
          break;
        }
        this.game.gameMap.supremeReligion.reformist.bishops.incValue(
          -data.bishops
        );
        this.game.gameMap.supremeReligion.reformist.tokens.incValue(
          -data.tokens
        );
        player.deactivateAbility({ ability });
        break;
      default:
        debug('Unhandled ability: ', ability);
    }
  }

  async notif_changeEmpireToMedievalState(
    notif: Notif<NotifChangeEmpireToMedievalStateArgs>
  ) {
    const { empire, tokensInEmpire, fromReligion } = notif.args;
    this.game.gameMap.setEmpireReligion({
      empireId: empire.id,
      religion: MEDIEVAL,
    });
    const count = tokensInEmpire.filter(
      (token) => token.separator === fromReligion
    ).length;
    this.game.gameMap.supremeReligion[fromReligion].tokens.incValue(-count);
  }

  async notif_changeEmpireToTheocracy(
    notif: Notif<NotifChangeEmpireToTheocracyArgs>
  ) {
    const { empire, religionId: religion, tokensInEmpire } = notif.args;
    this.game.gameMap.setEmpireReligion({ empireId: empire.id, religion });
    const count = tokensInEmpire.filter(
      (token) => token.separator === religion
    ).length;
    this.game.gameMap.supremeReligion[religion as Religion].tokens.incValue(
      count
    );
  }

  // Used to change king side of Papal States empire square
  async notif_changeEmpireSquare(notif: Notif<NotifChangeEmpireSquareArgs>) {
    const { oldEmpireSquare, newEmpireSquare, religion } = notif.args;

    const papalStatesIndex = this.game.gamedatas.gameMap.empires.findIndex(
      (empire) => empire.id === PAPAL_STATES
    );
    this.game.gamedatas.gameMap.empires[papalStatesIndex].religion = religion;

    const node = document.getElementById(`${oldEmpireSquare.id}-front`);
    if (node) {
      node.setAttribute('data-religion', religion);
    }
    this.game.tooltipManager.removeTooltip(oldEmpireSquare.id);
    this.game.tooltipManager.addEmpireCardTooltip({
      nodeId: newEmpireSquare.id,
      card: newEmpireSquare,
      religion,
    });
    if (
      // Note old and new card data should always be equal here
      // except for specific king side data
      oldEmpireSquare.owningPlayerId &&
      newEmpireSquare.owningPlayerId &&
      oldEmpireSquare.side === KING &&
      newEmpireSquare.side === KING
    ) {
      const player = this.getPlayer({
        playerId: oldEmpireSquare.owningPlayerId,
      });
      this.removePrestige({ player, prestige: oldEmpireSquare.king.prestige });
      this.addPrestige({ player, prestige: newEmpireSquare.king.prestige });
    }
    this.game.tableauCardManager.updateCardInformations(newEmpireSquare);
  }

  async notif_coronation(notif: Notif<NotifCoronationArgs>) {
    const { queen, king, playerId } = notif.args;
    // TODO: check why we need to call removeCard first
    await this.game.tableauCardManager.removeCard(queen);
    // await this.game.tableauCardManager.updateCardInformations(king);
    await this.game.tableauCardManager.addQueen({ king, queen });
  }

  async notif_declareVictory(notif: Notif<NotifDeclareVictoryArgs>) {
    const { playerId } = notif.args;
    this.game.framework().scoreCtrl[playerId].toValue(1);
  }

  // TODO: refactor and check what is still needed
  async notif_discardCard(notif: Notif<NotifDiscardCardArgs>) {
    const {
      adjustPrestige,
      playerId,
      card,
      fromLocationId,
      toLocationId,
      wasVassalTo,
      wasQueenTo: king,
      wasOldMaid,
    } = notif.args;
    if (card.type === TABLEAU_CARD && toLocationId === DISCARD) {
      await this.game.discard.addCard(card);
    } else if (card.type === EMPIRE_CARD) {
      await this.game.gameMap
        .getEmpireSquareStock({ empireId: card.empire })
        .addCard(card);
    }
    const player = this.getPlayer({ playerId });
    if (fromLocationId.startsWith('hand_')) {
      player.incHandCards((card as TableauCard).region, -1);
      this.game.openHandsModal.removeCard({
        playerId,
        card: card as TableauCard,
      });
    }

    if (wasOldMaid) {
      player.tableau.checkOldMaidContainerHeight();
    }
    if (adjustPrestige) {
      // TODO: check discarding of republics
      if (card.type === EMPIRE_CARD) {
        // TODO: check this. Empires don't get discarded with this function anymore?
        this.removeEmpireSquarePrestige({
          empireSquare: card,
          side: card.side,
          playerId,
        });
      } else {
        this.removePrestige({
          player: this.getPlayer({ playerId }),
          prestige: card.prestige,
        });
      }
    }
  }

  async notif_discardQueen(notif: Notif<NotifDiscardQueenArgs>) {
    const { playerId, queen, king, fromTableau, fromOldMaid } = notif.args;
    const player = this.getPlayer({ playerId });

    if (fromTableau || fromOldMaid) {
      queen.prestige.forEach((item) =>
        player.counters.prestige[item].incValue(-1)
      );
    } else {
      // Only from hand left
      player.incHandCards(queen.region, -1);
      this.game.openHandsModal.removeCard({
        playerId,
        card: queen,
      });
    }

    this.game.discard.addCard(queen);

    if (king === null) {
      player.tableau.checkOldMaidContainerHeight();
    }
  }

  async notif_flipEmpireCard(notif: Notif<NotifFlipEmpireCardArgs>) {
    const { playerId, card, formerSuzerain } = notif.args;
    const oldSide = card.side === REPUBLIC ? KING : REPUBLIC;
    const player = this.getPlayer({ playerId });

    this.game.gameMap.updateCoatOfArms({ card });

    this.removePrestige({ prestige: card[oldSide].prestige, player });
    player.counters[oldSide].incValue(-1);

    const container = createEmpireCardContainer(card);
    if (formerSuzerain !== null) {
      await player.tableau.addCard(container);
    } else {
      this.game.tableauCardManager.updateCardInformations(container);
      player.tableau.tableau[container.location.split('_')[1]].sortStock();
    }
    this.game.tableauCardManager.updateCardInformations(card);

    const empireSquareIndex = this.game.gamedatas.empireSquares.findIndex(
      (square: EmpireCard) => square.id === card.id
    );
    if (empireSquareIndex >= 0) {
      this.game.gamedatas.empireSquares[empireSquareIndex] = card;
    }

    this.addPrestige({ prestige: card[card.side].prestige, player });
    player.counters[card.side].incValue(1);
  }

  async notif_flipVictoryCard(notif: Notif<NotifFlipVictoryCardArgs>) {
    const { playerId, card } = notif.args;
    this.game.victoryCardManager.flipCard(card);
    return Promise.resolve();
  }

  async notif_moveEmpireSquare(notif: Notif<NotifMoveEmpireSquareArgs>) {
    const { playerId, card, origin, destination } = notif.args;

    this.game.gameMap.updateCoatOfArms({ card });

    if (origin.type === EMPIRE_SQUARE_ORIGIN_TABLEAU) {
      this.removeEmpireSquarePrestige({
        empireSquare: card,
        side: origin.side,
        playerId: origin.ownerId,
      });
    }

    if (destination.type === KING) {
      const newOwner = this.getPlayer({ playerId: destination.ownerId });
      const container = createEmpireCardContainer(card);

      await newOwner.tableau.addCard(container);
    } else if (destination.type === VASSAL) {
      await this.game.tableauCardManager.addVassal({
        vassal: card,
        suzerain: destination.suzerain,
      });
    }
    this.game.tableauCardManager.updateCardInformations(card);

    this.addEmpireSquarePrestige({
      empireSquare: card,
      side: KING,
      playerId: destination.ownerId,
    });

    // if (from.type === EMPIRE_SQUARE_ORIGIN_THRONE) {
    //   this.addPrestige({ prestige: card[card.side].prestige, player });
    // }

    // this.handleEmpireSquareOririnData({ card, from });
  }

  async notif_moveToken(notif: Notif<NotifMoveTokenArgs>) {
    const { playerId, token, from, to } = notif.args;

    const tokenNode = document.getElementById(token.id);

    if (!tokenNode) {
      return;
    }
    const isPawn = token.type === PAWN;

    this.adjustSupremeReligionCounters({
      token,
      location: from,
      addOrRemove: 'remove',
    });
    if (isPawn && from.type === BORDER) {
      this.game.playerManager
        .getPlayerForBank({ bank: token.id.split('_')[1] })
        .counters.concessions.incValue(-1);
    }

    const node = document.getElementById(
      token['type'] === BISHOP
        ? `${token.location}_tokens`
        : `pr_${token.location}`
    );

    await this.game.animationManager.attachWithAnimation(
      new BgaSlideAnimation({ element: tokenNode }),
      node
    );

    this.adjustSupremeReligionCounters({
      token,
      location: to,
      addOrRemove: 'add',
    });
    if (isPawn && to.type === BORDER) {
      this.game.playerManager
        .getPlayerForBank({ bank: token.id.split('_')[1] })
        .counters.concessions.incValue(1);
    }
  }

  async notif_moveTokensWithinConstantinople(
    notif: Notif<NotifMoveTokensWithinContantinopleArgs>
  ) {
    const { tokens } = notif.args;
    const animations = [];
    tokens.forEach((token) => {
      const tokenNode = document.getElementById(token.id);
      const cityNode = document.getElementById(`pr_${token.location}`);
      if (!(tokenNode && cityNode)) {
        return;
      }
      animations.push(
        this.game.animationManager.attachWithAnimation(
          new BgaSlideAnimation({ element: tokenNode }),
          cityNode
        )
      );
    });
    await Promise.all(animations);
  }

  async notif_oldMaid(notif: Notif<NotifOldMaidArgs>) {
    const { playerId, card } = notif.args;
    const player = this.getPlayer({ playerId });
    await player.tableau.addOldMaid(card);
  }

  async notif_payFlorinsToChina(notif: Notif<NotifPayFlorinsToChinaArgs>) {
    const { playerId, amount } = notif.args;
    if (amount === 0) {
      return;
    }
    this.getPlayer({ playerId }).incFlorins(-amount);
    await this.game.market.moveFlorinAnimation({
      fromId: `pr_florins_counter_${playerId}_icon`,
      toId: 'pr_china',
      index: 0,
    });
  }

  async notif_placeToken(notif: Notif<NotifPlaceTokenArgs>) {
    const { token, fromLocationId, to } = notif.args;

    const split = token.id.split('_');
    const isPawn = split[0] === PAWN;
    const isBishop = split[0] === BISHOP;
    const fromSupply = fromLocationId.startsWith('supply');
    if (fromSupply && isPawn) {
      this.game.supply.incValue({
        bank: split[1],
        type: split[0],
        value: -1,
      });
    } else if (fromSupply) {
      this.game.supply.incValue({
        religion: split[1],
        type: split[0],
        value: -1,
      });
    }

    let node: HTMLElement;
    if (isBishop) {
      // Always place bishop on card
      node = document.getElementById(`${token.location}_tokens`);
    } else if (token.location.startsWith('EmpireSquare_')) {
      // console.log()
      // Other repressed tokens. Place based on setting
      const repressTokensToThrones =
        this.game.settings.get({
          id: REPRESS_TOKENS_TO_THRONES,
        }) === ENABLED;
      node = repressTokensToThrones
        ? document.getElementById(`${token.location}_throne_tokens`)
        : document.getElementById(`${token.location}_tokens`);
    } else {
      // Tokens that go in cities, borders etc.
      node = document.getElementById(`pr_${token.location}`);
    }
    // const node = document.getElementById(
    //   isBishop || token.location.startsWith("EmpireSquare_")
    //     ? `${token.location}_tokens`
    //     : `pr_${token.location}`
    // );
    if (!node) {
      return;
    }

    if (fromSupply) {
      node.insertAdjacentHTML('beforeend', tplToken(token));
      const element = document.getElementById(token.id);
      const fromRect = document
        .getElementById(`${token.type}_${token.separator}_supply`)
        ?.getBoundingClientRect();
      await this.game.animationManager.play(
        new BgaSlideAnimation({
          element,
          transitionTimingFunction: 'linear',
          fromRect,
        })
      );
    } else {
      const tokenNode = document.getElementById(token.id);
      if (tokenNode) {
        await this.game.animationManager.attachWithAnimation(
          new BgaSlideAnimation({ element: tokenNode }),
          node
        );
      }
    }

    this.adjustSupremeReligionCounters({
      token,
      location: to,
      addOrRemove: 'add',
    });
    if (isPawn) {
      this.game.playerManager
        .getPlayerForBank({ bank: split[1] })
        .counters.concessions.incValue(1);
    }

    return Promise.resolve();
  }

  async notif_playCard(notif: Notif<NotifPlayCardArgs>) {
    const { playerId, card } = notif.args;
    const player = this.getPlayer({ playerId });

    player.incHandCards(card.region, -1);
    this.game.openHandsModal.removeCard({ playerId, card });
    await player.tableau.addCard(card);
    this.addPrestige({ player, prestige: card.prestige });
    // card.prestige.forEach((prestige) =>
    //   player.counters.prestige[prestige].incValue(1)
    // );
    // return Promise.resolve();
  }

  async notif_purchaseCard(notif: Notif<NotifPurchaseCardArgs>) {
    const { playerId, card, placedFlorins, takenFlorins, discard } = notif.args;
    const player = this.getPlayer({ playerId });

    await this.game.market.payFlorins({ placedFlorins, playerId });
    await this.game.market.takeFlorins({
      playerId,
      florins: takenFlorins,
      from: card.location,
    });

    if (!discard) {
      await player.addCardToHand({ card });
      this.game.openHandsModal.addCard({ playerId, card });
    } else {
      await this.getStockMarketLocation({ location: card.location }).removeCard(
        card
      );
    }
  }

  async notif_refreshHand(notif: Notif<NotifRefreshHandArgs>) {
    const { playerId, hand } = notif.args;
    this.game.hand.clearInterface();
    this.game.hand.getStock().addCards(hand);
  }

  async notif_refreshMarket(notif: Notif<NotifRefreshMarketArgs>) {
    this.game.clearPossible();
    const { cardMoves, cardDraws } = notif.args;

    let index = 0;
    // Shift cards
    for (let move of cardMoves) {
      index += 1;
      const { from, to, card } = move;
      const [_, fromRegion, fromColumn] = from.split('_');
      const [_2, toRegion, toCol] = to.split('_');
      card.location = to;
      const florinsOnCard = this.game.market.getFlorins({
        region: fromRegion as 'east' | 'west',
        column: Number(fromColumn),
      });
      this.game.market.setFlorinValue({
        region: fromRegion as 'east' | 'west',
        column: Number(fromColumn),
        value: 0,
      });
      const promises: Promise<unknown>[] = [
        this.game.market
          .getStock({
            region: toRegion as 'east' | 'west',
            column: Number(toCol),
          })
          .addCard(card),
      ];
      if (florinsOnCard > 0) {
        promises.push(
          this.game.market.moveFlorinAnimation({
            fromId: `pr_${from}_florins`,
            toId: `pr_${to}_florins`,
            index,
            htmlFlorinChildren: `<span class="pr_counter">${florinsOnCard}</span>`,
          })
        );
      }
      await Promise.all(promises);
      this.game.market.setFlorinValue({
        region: toRegion as 'east' | 'west',
        column: Number(toCol),
        value:
          florinsOnCard +
          this.game.market.getFlorins({
            region: toRegion as 'east' | 'west',
            column: Number(toCol),
          }),
      });
      if (Number(toCol) === 0) {
        this.game.tooltipManager.removeTooltip(card.id);
      }
    }

    // Draw cards
    for (let card of cardDraws) {
      await this.game.market.drawCard(card);
    }
  }

  async notif_refreshUI(notif: Notif<NotifRefreshUIArgs>) {
    const { datas: gamedatas } = notif.args;
    const updatedGamedatas = {
      ...this.game.gamedatas,
      ...gamedatas,
    };
    this.game.gamedatas = updatedGamedatas;
    this.game.clearInterface();
    this.game.victoryCardManager.updateInterface({ gamedatas });
    this.game.gameMap.updateInterface({ gamedatas });
    this.game.market.updateMarket({ gamedatas });
    this.game.supply.updateInterdace({ gamedatas });
    this.game.playerManager.updatePlayers({ gamedatas });
    this.game.openHandsModal.updateInterface({ gamedatas });
  }

  async notif_repressToken(notif: Notif<NotifRepressTokenArgs>) {
    const { playerId, token, cost, from } = notif.args;

    if (cost < 0) {
      await this.game.market.moveFlorinAnimation({
        fromId: 'pr_china',
        index: 0,
        toId: `pr_florins_counter_${playerId}_icon`,
      });
    }
    this.getPlayer({ playerId }).incFlorins(-cost);
    if (cost > 0) {
      await this.game.market.moveFlorinAnimation({
        toId: 'pr_china',
        index: 0,
        fromId: `pr_florins_counter_${playerId}_icon`,
      });
    }
    const element = document.getElementById(token.id);
    const empireSquareId = token.location;

    this.adjustSupremeReligionCounters({
      token,
      location: from,
      addOrRemove: 'remove',
    });
    if (token.type === PAWN) {
      this.game.playerManager
        .getPlayerForBank({ bank: token.separator })
        .counters.concessions.incValue(-1);
    }

    const repressTokensToThrones =
      this.game.settings.get({
        id: REPRESS_TOKENS_TO_THRONES,
      }) === ENABLED;

    const toNode =
      token.type === BISHOP || !repressTokensToThrones
        ? document.getElementById(`${empireSquareId}_tokens`)
        : document.getElementById(`${empireSquareId}_throne_tokens`);

    // TODO: move to empire card
    if (!(element && toNode)) {
      return;
    }

    await this.game.animationManager.attachWithAnimation(
      new BgaSlideAnimation({ element }),
      toNode
    );
  }

  async notif_returnToThrone(notif: Notif<NotifReturnToThroneArgs>) {
    const { king, fromSide, playerId, suzerain } = notif.args;

    this.game.gameMap.updateCoatOfArms({ card: king });

    const player = this.getPlayer({ playerId });
    player.counters[fromSide].incValue(-1);

    let prestige = king[fromSide].prestige;
    king.queens.forEach((queen) => {
      prestige.push(...queen.prestige);
    });

    this.removePrestige({ player, prestige });
    this.game.tableauCardManager.updateCardInformations(king);
    await this.game.gameMap
      .getEmpireSquareStock({ empireId: king.empire })
      .addCard(createEmpireCardContainer(king));
  }

  // TODO: check if we can replace this with discardCard
  async notif_sellCard(notif: Notif<NotifSellCardArgs>) {
    const { playerId, card, value } = notif.args;
    const player = this.getPlayer({ playerId });
    player.incFlorins(value);
  }

  async notif_returnToSupply(notif: Notif<NotifReturnToSupplyArgs>) {
    const { playerId, token, from } = notif.args;

    this.adjustSupremeReligionCounters({
      token,
      location: from,
      addOrRemove: 'remove',
    });
    if (token.type === PAWN && !from.id.startsWith('EmpireSquare')) {
      this.game.playerManager
        .getPlayerForBank({ bank: token.separator })
        .counters.concessions.incValue(-1);
    }

    const node = document.getElementById(token.id);
    if (node) {
      await this.game.animationManager.attachWithAnimation(
        new BgaSlideAnimation({ element: node }),
        document.getElementById(`${token.type}_${token.separator}_supply`)
      );
      node.remove();
    }
    const split = token.id.split('_');
    if (split[0] === PAWN) {
      this.game.supply.incValue({
        bank: split[1],
        type: split[0],
        value: 1,
      });
    } else {
      this.game.supply.incValue({
        religion: split[1],
        type: split[0],
        value: 1,
      });
    }

    return Promise.resolve();
  }

  async notif_sellRoyalCouple(notif: Notif<NotifSellRoyalCoupleArgs>) {
    const { playerId, value } = notif.args;
    this.getPlayer({ playerId }).incFlorins(value);
  }

  async notif_tableauOpCommerce(notif: Notif<NotifTableauOpCommerceArgs>) {
    const { playerId, location } = notif.args;
    const [_, region, column] = location.split('_');
    this.game.market.incFlorinValue({
      region: region as 'east' | 'west',
      column: Number(column),
      value: -1,
    });
    await this.game.market.moveFlorinAnimation({
      toId: `pr_florins_counter_${playerId}_icon`,
      fromId: `pr_market_${region}_${column}_florins`,
      index: 1,
    });
    this.getPlayer({ playerId }).incFlorins(1);
  }

  async notif_tableauOpTaxPay(notif: Notif<NotifTableauOpTaxPayArgs>) {
    const { playerId } = notif.args;
    this.getPlayer({ playerId }).incFlorins(-1);
    await this.game.market.moveFlorinAnimation({
      fromId: `pr_florins_counter_${playerId}_icon`,
      toId: 'pr_china',
      index: 0,
    });
  }

  async notif_tradeFairConvene(notif: Notif<NotifTradeFairConveneArgs>) {
    const { florinsFromChina, region } = notif.args;
    await this.game.market.moveFlorinAnimation({
      fromId: 'pr_china',
      toId: `pr_market_${region}_0_florins`,
      index: 1,
    });
    this.game.market.incFlorinValue({
      region: region as 'east' | 'west',
      column: 0,
      value: florinsFromChina,
    });
    const stock = this.game.market.getStock({ region, column: 0 });
    const card = stock.getCards()[0];
    stock.removeCard(card);
    return Promise.resolve();
  }

  async notif_tradeFairEmporiumSubsidy(
    notif: Notif<NotifTradeFairEmporiumSubsidyArgs>
  ) {
    const { amount, playerId, region } = notif.args;
    this.game.market.incFlorinValue({
      region: region as 'east' | 'west',
      column: 0,
      value: -amount,
    });
    await this.game.market.moveFlorinAnimation({
      toId: `pr_florins_counter_${playerId}_icon`,
      fromId: `pr_market_${region}_0_florins`,
      index: 1,
    });
    this.getPlayer({ playerId }).incFlorins(amount);
    // return Promise.resolve();
  }

  async notif_tradeFairProfitDispersalPirates(
    notif: Notif<NotifTradeFairProfitDispersalPiratesArgs>
  ) {
    const { region } = notif.args;
    this.game.market.incFlorinValue({
      region: region as 'east' | 'west',
      column: 0,
      value: -1,
    });
    await this.game.market.moveFlorinAnimation({
      toId: `pr_china`,
      fromId: `pr_market_${region}_0_florins`,
      index: 1,
    });
    return Promise.resolve();
  }

  async notif_tradeFairProfitDispersalPlayer(
    notif: Notif<NotifTradeFairProfitDispersalPlayerArgs>
  ) {
    const { region, playerId, amount } = notif.args;
    this.game.market.incFlorinValue({
      region: region as 'east' | 'west',
      column: 0,
      value: -amount,
    });
    await this.game.market.moveFlorinAnimation({
      toId: `pr_florins_counter_${playerId}_icon`,
      fromId: `pr_market_${region}_0_florins`,
      index: 1,
    });
    this.getPlayer({ playerId }).incFlorins(amount);
    return Promise.resolve();
  }

  notif_smallRefreshInterface(notif: Notif<NotifSmallRefreshInterfaceArgs>) {
    const updatedGamedatas = {
      ...this.game.gamedatas,
      ...notif.args,
    };
    this.game.clearInterface();
    this.game.gamedatas = updatedGamedatas;
    this.game.playerManager.updatePlayers({ gamedatas: updatedGamedatas });
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private adjustSupremeReligionCounters({
    token,
    location,
    addOrRemove,
  }: {
    token: Token;
    location: City | Border | TableauCard | EmpireCard | null;
    addOrRemove: 'add' | 'remove';
  }) {
    const add = addOrRemove === 'add';

    if (token.type === PAWN || !location) {
      return;
    } else if (token.type === BISHOP) {
      this.game.gameMap.supremeReligion[
        token.separator as Religion
      ].bishops.incValue(add ? 1 : -1);
    } else if (
      (token.type === KNIGHT || token.type === ROOK) &&
      location.type === CITY &&
      token.separator === location.empire.religion
    ) {
      this.game.gameMap.supremeReligion[
        token.separator as Religion
      ].tokens.incValue(add ? 1 : -1);
    } else if (token.type === PIRATE && location.type === BORDER) {
      const pirateAbilityActive =
        this.game.playerManager.anyPlayerHasActiveAbility({
          ability: SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS,
        });
      location.adjacentEmpires.forEach((empire) => {
        if (empire.religion === token.separator) {
          this.game.gameMap.supremeReligion[
            token.separator as Religion
          ].tokens.incValue(add ? 1 : -1);
        }
        if (
          pirateAbilityActive &&
          empire.religion === REFORMIST &&
          token.separator === ISLAMIC
        ) {
          this.game.gameMap.supremeReligion.reformist.tokens.incValue(
            add ? 1 : -1
          );
        }
      });

      if (pirateAbilityActive && token.separator === ISLAMIC) {
        this.game.gameMap.supremeReligion.reformist.bishops.incValue(
          add ? 1 : -1
        );
      }
    }
  }

  private addEmpireSquarePrestige({
    empireSquare,
    side,
    playerId,
  }: {
    empireSquare: EmpireCard;
    side: 'republic' | 'king';
    playerId: number;
  }) {
    const owner = this.getPlayer({ playerId });
    owner.counters[side].incValue(1);

    const prestige = empireSquare[side].prestige.concat(
      this.getQueensPrestige({ queens: empireSquare.queens })
    );
    this.addPrestige({ player: owner, prestige });
  }

  private removeEmpireSquarePrestige({
    empireSquare,
    side,
    playerId,
  }: {
    empireSquare: EmpireCard;
    side: 'republic' | 'king';
    playerId: number;
  }) {
    const owner = this.getPlayer({ playerId });
    owner.counters[side].incValue(-1);

    const prestige = empireSquare[side].prestige.concat(
      this.getQueensPrestige({ queens: empireSquare.queens })
    );
    this.removePrestige({ player: owner, prestige });
  }

  // private handleEmpireSquareOririnData({
  //   card,
  //   from,
  // }: {
  //   card: EmpireCard;
  //   from: EmpireCardOriginData;
  // }) {
  //   const { suzerain, previousOwnerId, wasRepublic } = from;
  //   if (suzerain && previousOwnerId) {
  //     this.game.tableauCardManager.removeVassal({ suzerain });
  //   }
  //   if (previousOwnerId) {
  //     const previousOwner = this.getPlayer({ playerId: previousOwnerId });
  //     this.removePrestige({
  //       player: previousOwner,
  //       prestige: card[wasRepublic ? REPUBLIC : KING].prestige,
  //     });
  //   }
  // }

  private getQueensPrestige({ queens }: { queens: QueenCard[] }) {
    const prestige = [];
    queens.forEach((queen) => {
      prestige.push(...queen.prestige);
    });
    return prestige;
  }

  private addPrestige({
    player,
    prestige,
  }: {
    player: PRPlayer;
    prestige: string[];
  }) {
    prestige.forEach((prestige) => {
      player.counters.prestige[prestige].incValue(1);
      if (prestige === PATRON) {
        if (
          player.hasActiveAbility({
            ability: SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY,
          })
        ) {
          this.game.gameMap.supremeReligion.islamic.bishops.incValue(1);
        }
        [
          SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_1,
          SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_2,
        ].forEach((ability) => {
          if (
            player.hasActiveAbility({
              ability,
            })
          ) {
            player.counters.concessions.incValue(1);
          }
        });
        [
          SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_1,
          SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_2,
          SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_3,
        ].forEach((ability) => {
          if (
            player.hasActiveAbility({
              ability,
            })
          ) {
            player.counters.prestige.law.incValue(1);
          }
        });
      }
    });
  }

  private removePrestige({
    player,
    prestige,
  }: {
    player: PRPlayer;
    prestige: string[];
  }) {
    prestige.forEach((prestige) => {
      player.counters.prestige[prestige].incValue(-1);
      if (prestige === PATRON) {
        if (
          player.hasActiveAbility({
            ability: SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY,
          })
        ) {
          this.game.gameMap.supremeReligion.islamic.bishops.incValue(-1);
        }
        [
          SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_1,
          SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_2,
        ].forEach((ability) => {
          if (
            player.hasActiveAbility({
              ability,
            })
          ) {
            player.counters.concessions.incValue(-1);
          }
        });
        [
          SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_1,
          SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_2,
          SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_3,
        ].forEach((ability) => {
          if (
            player.hasActiveAbility({
              ability,
            })
          ) {
            player.counters.prestige.law.incValue(-1);
          }
        });
      }
    });
  }

  destroy() {
    dojo.forEach(this.subscriptions, dojo.unsubscribe);
  }

  getPlayer({ playerId }: { playerId: number }): PRPlayer {
    return this.game.playerManager.getPlayer({ playerId });
  }

  getRegionAndColumnMarketLocation({ location }: { location: string }): {
    region: 'east' | 'west';
    column: number;
  } {
    const [_, region, colummn] = location.split('_');
    return {
      region: region as 'east' | 'west',
      column: Number(colummn),
    };
  }

  getStockMarketLocation({
    location,
  }: {
    location: string;
  }): LineStock<EmpireCard | TableauCard> {
    const { region, column } = this.getRegionAndColumnMarketLocation({
      location,
    });
    return this.game.market.getStock({ region, column });
  }
}
