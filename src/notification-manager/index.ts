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
    console.log("notifications subscriptions setup");
    const notifs: [id: string, wait: number][] = [
      // checked
      ["log", undefined],
      ["activateAbility", undefined],
      ["changeEmpireToMedievalState", undefined],
      ["changeEmpireToTheocracy", undefined],
      ["changeEmpireSquare", undefined],
      ["coronation", undefined],
      ["deactivateAbility", undefined],
      ["declareVictory", undefined],
      ["discardCard", undefined],
      ["discardQueen", undefined],
      ["flipEmpireCard", undefined],
      ["flipVictoryCard", undefined],
      ["moveEmpireSquare", undefined],
      ["moveToken", undefined],
      ["moveTokensWithinConstantinople", undefined],
      ["oldMaid", undefined],
      ["payFlorinsToChina", undefined],
      ["placeToken", undefined],
      ["playCard", undefined],
      ["purchaseCard", undefined],
      ["refreshHand", undefined],
      ["refreshMarket", undefined],
      ["refreshUI", undefined],
      ["repressToken", undefined],
      ["returnToSupply", undefined],
      ["returnToThrone", undefined],
      ["sellCard", undefined],
      ["sellRoyalCouple", undefined],
      ["tableauOpCommerce", undefined],
      ["tableauOpTaxPay", undefined],
      ["tradeFairConvene", undefined],
      ["tradeFairEmporiumSubsidy", undefined],
      // ["tradeFairPlaceLevy", undefined],
      ["tradeFairProfitDispersalPirates", undefined],
      ["tradeFairProfitDispersalPlayer", undefined],
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
          if (msg != "") {
            $("gameaction_status").innerHTML = msg;
            $("pagemaintitletext").innerHTML = msg;
          }

          const promise = this[`notif_${notif[0]}`](notifDetails);

          // tell the UI notification ends
          promise?.then(() =>
            this.game.framework().notifqueue.onSynchronousNotificationEnd()
          );
        })
      );
      // make all notif as synchronous
      this.game.framework().notifqueue.setSynchronous(notif[0], notif[1]);
    });

    // Use below to add tooltips to the log
    // dojo.connect(this.game.framework().notifqueue, 'addToLog', () => {
    //   // do stuff here
    // });
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
    debug("notif_log", notif.args);
    return Promise.resolve();
  }

  async notif_activateAbility(notif: Notif<NotifActivateAbilityArgs>) {
    const { ability } = notif.args;

    switch (ability) {
      case SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS:
        this.game.gameMap.setVenice2Visibility(true);
        break;
      default:
        debug("Unhandled ability: ", ability);
    }
  }

  async notif_changeEmpireToMedievalState(
    notif: Notif<NotifChangeEmpireToMedievalStateArgs>
  ) {
    const { empire } = notif.args;
    this.game.gameMap.setEmpireReligion({
      empireId: empire.id,
      religion: MEDIEVAL,
    });
  }

  async notif_changeEmpireToTheocracy(
    notif: Notif<NotifChangeEmpireToTheocracyArgs>
  ) {
    const { empire, religion } = notif.args;
    this.game.gameMap.setEmpireReligion({ empireId: empire.id, religion });
  }

  // Used to change king side of Papal States empire square
  async notif_changeEmpireSquare(notif: Notif<NotifChangeEmpireSquareArgs>) {
    const { oldEmpireSquare, newEmpireSquare, religion } = notif.args;
    
    const papalStatesIndex = this.game.gamedatas.gameMap.empires.findIndex((empire) => empire.id === PAPAL_STATES);
    this.game.gamedatas.gameMap.empires[papalStatesIndex].religion = religion;

    const node = document.getElementById(`${oldEmpireSquare.id}-front`);
    if (node) {
      node.setAttribute("data-religion", religion);
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
      const player = this.getPlayer({playerId: oldEmpireSquare.owningPlayerId});
       this.removePrestige({player, prestige: oldEmpireSquare.king.prestige});
       this.addPrestige({player, prestige: newEmpireSquare.king.prestige});
    }
    this.game.tableauCardManager.updateCardInformations(newEmpireSquare);
  }

  async notif_coronation(notif: Notif<NotifCoronationArgs>) {
    const { queen, king, playerId } = notif.args;
    // const player = this.getPlayer({ playerId });
    // await player.tableau.tableau[queen.region].
    await this.game.tableauCardManager.removeCard(queen);
    await this.game.tableauCardManager.updateCardInformations(king);
    await this.game.tableauCardManager.addQueen({ king, queen });
  }

  async notif_deactivateAbility(notif: Notif<NotifDeactivateAbilityArgs>) {
    const { ability } = notif.args;

    switch (ability) {
      case SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS:
        this.game.gameMap.setVenice2Visibility(false);
        break;
      default:
        debug("Unhandled ability: ", ability);
    }
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
      await this.game.tableauCardManager.removeCard(card);
    } else if (card.type === EMPIRE_CARD) {
      await this.game.gameMap
        .getEmpireSquareStock({ empireId: card.empire })
        .addCard(card);
    }
    const player = this.getPlayer({ playerId });
    if (fromLocationId.startsWith("hand_")) {
      player.counters.cards[(card as TableauCard).region].incValue(-1);
      this.game.openHandsModal.removeCard({
        playerId,
        card: card as TableauCard,
      });
    }

    if (wasVassalTo) {
      this.game.tableauCardManager.removeVassal({ suzerain: wasVassalTo });
    }
    // if (king) {
    //   this.game.tableauCardManager.updateCardInformations(king);

    //   this.game.tableauCardManager.removeQueen({
    //     king,
    //   });
    // }
    if (wasOldMaid) {
      player.tableau.checkOldMaidContainerHeight();
    }
    if (adjustPrestige) {
      // TODO: check discarding of republics
      const prestige =
        card.type === EMPIRE_CARD ? card[card.side].prestige : card.prestige;
      prestige.forEach((item) => player.counters.prestige[item].incValue(-1));
    }
  }

  async notif_discardQueen(notif: Notif<NotifDiscardQueenArgs>) {
    const { playerId, queen, king } = notif.args;
    const player = this.getPlayer({ playerId });

    if (king) {
      this.game.tableauCardManager.updateCardInformations(king);

      this.game.tableauCardManager.removeQueen({
        king,
        queen,
      });
    }
    if (king === null) {
      this.game.tableauCardManager.removeCard(queen);

      player.tableau.checkOldMaidContainerHeight();
    }

    queen.prestige.forEach((item) =>
      player.counters.prestige[item].incValue(-1)
    );
  }

  async notif_flipEmpireCard(notif: Notif<NotifFlipEmpireCardArgs>) {
    const { playerId, card, formerSuzerain } = notif.args;
    const oldSide = card.side === REPUBLIC ? KING : REPUBLIC;
    const player = this.getPlayer({ playerId });

    this.game.gameMap.updateCoatOfArms({ card });

    this.removePrestige({ prestige: card[oldSide].prestige, player });

    if (formerSuzerain !== null) {
      this.game.tableauCardManager.removeVassal({
        suzerain: formerSuzerain,
        beforeMove: true,
      });
      await player.tableau.addCard(card);
    } else {
      this.game.tableauCardManager.updateCardInformations(card);
    }

    this.addPrestige({ prestige: card[card.side].prestige, player });
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
      await newOwner.tableau.addCard(card);
    } else if (destination.type === VASSAL) {
      await this.game.tableauCardManager.addVassal({
        vassal: card,
        suzerain: destination.suzerain,
      });
    }

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
    const { playerId, token } = notif.args;

    const tokenNode = document.getElementById(token.id);

    // const node: HTMLElement = document.getElementById(`pr_${token.location}`);
    const node = document.getElementById(
      token["type"] === BISHOP
        ? `${token.location}_tokens`
        : `pr_${token.location}`
    );
    if (tokenNode) {
      await this.game.animationManager.attachWithAnimation(
        new BgaSlideAnimation({ element: tokenNode }),
        node
      );
    }

    // const node = document.getElementById(token.id);
    // if (node) {
    //   node.remove();
    // }
    // const split = token.id.split("_");
    // if (split[0] === PAWN) {
    //   this.game.supply.incValue({
    //     bank: split[1],
    //     type: split[0],
    //     value: 1,
    //   });
    // } else {
    //   this.game.supply.incValue({
    //     religion: split[1],
    //     type: split[0],
    //     value: 1,
    //   });
    // }

    return Promise.resolve();
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
    this.getPlayer({ playerId }).counters.florins.incValue(-amount);
  }

  async notif_placeToken(notif: Notif<NotifPlaceTokenArgs>) {
    const { token, fromLocationId } = notif.args;

    const split = token.id.split("_");
    const isPawn = split[0] === PAWN;
    const isBishop = split[0] === BISHOP;
    const fromSupply = fromLocationId.startsWith("supply");
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

    const node = document.getElementById(
      isBishop || token.location.startsWith("EmpireSquare_")
        ? `${token.location}_tokens`
        : `pr_${token.location}`
    );
    if (!node) {
      return;
    }

    if (fromSupply) {
      node.insertAdjacentHTML("beforeend", tplToken(token));
    } else {
      const tokenNode = document.getElementById(token.id);
      if (tokenNode) {
        await this.game.animationManager.attachWithAnimation(
          new BgaSlideAnimation({ element: tokenNode }),
          node
        );
      }
    }

    return Promise.resolve();
  }

  async notif_playCard(notif: Notif<NotifPlayCardArgs>) {
    const { playerId, card } = notif.args;
    const player = this.getPlayer({ playerId });

    player.counters.cards[card.region].incValue(-1);
    this.game.openHandsModal.removeCard({ playerId, card });
    await player.tableau.addCard(card);
    card.prestige.forEach((prestige) =>
      player.counters.prestige[prestige].incValue(1)
    );
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
    const { cardMoves, cardDraws } = notif.args;

    // Shift cards
    for (let move of cardMoves) {
      const { from, to, card } = move;
      const [_, fromRegion, fromColumn] = from.split("_");
      const [_2, toRegion, toCol] = to.split("_");
      card.location = to;
      const florinsOnCard = this.game.market.getFlorins({
        region: fromRegion as "east" | "west",
        column: Number(fromColumn),
      });
      this.game.market.setFlorinValue({
        region: fromRegion as "east" | "west",
        column: Number(fromColumn),
        value: 0,
      });
      await this.game.market
        .getStock({
          region: toRegion as "east" | "west",
          column: Number(toCol),
        })
        .addCard(card);
      this.game.market.setFlorinValue({
        region: toRegion as "east" | "west",
        column: Number(toCol),
        value:
          florinsOnCard +
          this.game.market.getFlorins({
            region: toRegion as "east" | "west",
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
    const { playerId, token, cost } = notif.args;

    this.getPlayer({ playerId }).counters.florins.incValue(-cost);
    const element = document.getElementById(token.id);
    const empireSquareId = token.location;
    const toNode = document.getElementById(`${empireSquareId}_tokens`);
    // TODO: move to empire carf
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

    await this.game.gameMap
      .getEmpireSquareStock({ empireId: king.empire })
      .addCard(king);

    if (suzerain) {
      this.game.tableauCardManager.removeVassal({ suzerain });
    }

    this.game.tableauCardManager.updateCardInformations(king);

    const player = this.getPlayer({ playerId });
    let prestige = king[fromSide].prestige;
    king.queens.forEach((queen) => {
      prestige.push(...queen.prestige);
    });

    prestige.forEach((item) => player.counters.prestige[item].incValue(-1));
  }

  // TODO: check if we can replace this with discardCard
  async notif_sellCard(notif: Notif<NotifSellCardArgs>) {
    const { playerId, card, value } = notif.args;
    const player = this.getPlayer({ playerId });
    // await player.removeCardFromHand({ card });
    player.counters.florins.incValue(value);
  }

  async notif_returnToSupply(notif: Notif<NotifReturnToSupplyArgs>) {
    const { playerId, token } = notif.args;

    const node = document.getElementById(token.id);
    if (node) {
      node.remove();
    }
    const split = token.id.split("_");
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
    this.getPlayer({ playerId }).counters.florins.incValue(value);
  }

  async notif_tableauOpCommerce(notif: Notif<NotifTableauOpCommerceArgs>) {
    const { playerId, location } = notif.args;
    const [_, region, column] = location.split("_");
    this.game.market.incFlorinValue({
      region: region as "east" | "west",
      column: Number(column),
      value: -1,
    });
    this.getPlayer({ playerId }).counters.florins.incValue(1);
  }

  async notif_tableauOpTaxPay(notif: Notif<NotifTableauOpTaxPayArgs>) {
    const { playerId } = notif.args;
    this.getPlayer({ playerId }).counters.florins.incValue(-1);
  }

  async notif_tradeFairConvene(notif: Notif<NotifTradeFairConveneArgs>) {
    const { florinsFromChina, region } = notif.args;
    this.game.market.incFlorinValue({
      region: region as "east" | "west",
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
      region: region as "east" | "west",
      column: 0,
      value: -amount,
    });
    this.getPlayer({ playerId }).counters.florins.incValue(amount);
    return Promise.resolve();
  }

  async notif_tradeFairProfitDispersalPirates(
    notif: Notif<NotifTradeFairProfitDispersalPiratesArgs>
  ) {
    const { region } = notif.args;
    this.game.market.incFlorinValue({
      region: region as "east" | "west",
      column: 0,
      value: -1,
    });
    return Promise.resolve();
  }

  async notif_tradeFairProfitDispersalPlayer(
    notif: Notif<NotifTradeFairProfitDispersalPlayerArgs>
  ) {
    const { region, playerId, amount } = notif.args;
    this.game.market.incFlorinValue({
      region: region as "east" | "west",
      column: 0,
      value: -amount,
    });
    this.getPlayer({ playerId }).counters.florins.incValue(amount);
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

  private addEmpireSquarePrestige({
    empireSquare,
    side,
    playerId,
  }: {
    empireSquare: EmpireCard;
    side: "republic" | "king";
    playerId: number;
  }) {
    const owner = this.getPlayer({ playerId });
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
    side: "republic" | "king";
    playerId: number;
  }) {
    const owner = this.getPlayer({ playerId });
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
    });
  }

  destroy() {
    dojo.forEach(this.subscriptions, dojo.unsubscribe);
  }

  getPlayer({ playerId }: { playerId: number }): PRPlayer {
    return this.game.playerManager.getPlayer({ playerId });
  }

  getRegionAndColumnMarketLocation({ location }: { location: string }): {
    region: "east" | "west";
    column: number;
  } {
    const [_, region, colummn] = location.split("_");
    return {
      region: region as "east" | "west",
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
