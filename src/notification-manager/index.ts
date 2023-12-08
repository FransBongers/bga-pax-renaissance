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
      ["flipVictoryCard", undefined],
      ["killToken", undefined],
      ["moveToken", undefined],
      ["placeToken", undefined],
      ["playCard", undefined],
      ["purchaseCard", undefined],
      ["refreshMarket", undefined],
      ["repressToken", undefined],
      ["sellCard", undefined],
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

  async notif_flipVictoryCard(notif: Notif<NotifFlipVictoryCardArgs>) {
    const { playerId, card } = notif.args;
    this.game.victoryCardManager.flipCard(card);
    return Promise.resolve();
  }

  async notif_moveToken(notif: Notif<NotifMoveTokenArgs>) {
    const { playerId, token } = notif.args;


    const tokenNode = document.getElementById(token.id);
    const node: HTMLElement = document.getElementById(`pr_${token.location}`);
    if (tokenNode) {
      await this.game.animationManager.attachWithAnimation(
        new BgaSlideAnimation({ element: tokenNode }),
        node
      )
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

  async notif_killToken(notif: Notif<NotifKillTokenArgs>) {
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

  async notif_placeToken(notif: Notif<NotifPlaceTokenArgs>) {
    const { playerId, token, fromLocationId } = notif.args;

    const split = token.id.split("_");
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

    const node = document.getElementById(isBishop ? `${token.location}_tokens` :  `pr_${token.location}`);
    if (!node) {
      return;
    }

    const type = token.id.split("_")[0];
    const bankOrReligion = token.id.split("_")[1];

    if (fromSupply) {
      node.insertAdjacentHTML(
        "beforeend",
        isPawn
          ? tplPawn({
              id: token.id,
              bank: bankOrReligion,
            })
          : tplChessPiece({ id: token.id, type, religion: bankOrReligion })
      );
    } else {
      const tokenNode = document.getElementById(token.id);
      if (tokenNode) {
        await this.game.animationManager.attachWithAnimation(
          new BgaSlideAnimation({ element: tokenNode }),
          node
        )
      }
    }

    return Promise.resolve();
  }

  async notif_playCard(notif: Notif<NotifPlayCardArgs>) {
    const { playerId, card } = notif.args;
    const player = this.getPlayer({ playerId });

    player.counters.cards[card.region].incValue(-1);
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
    } else {
      await this.getStockMarketLocation({ location: card.location }).removeCard(
        card
      );
    }
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
    }

    // Draw cards
    for (let card of cardDraws) {
      await this.game.market.drawCard(card);
    }
  }

  async notif_repressToken(notif: Notif<NotifRepressTokenArgs>) {
    const { playerId, token, cost } = notif.args;

    this.getPlayer({playerId}).counters.florins.incValue(-cost);
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
    )
  }

  async notif_sellCard(notif: Notif<NotifSellCardArgs>) {
    const { playerId, card, value } = notif.args;
    const player = this.getPlayer({ playerId });
    await player.removeCardFromHand({ card });
    player.counters.florins.incValue(value);
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

  // async notif_tradeFairPlaceLevy(notif: Notif<NotifTradeFairPlaceLevyArgs>) {
  //   const { token, cityId } = notif.args;
  //   const node = document.getElementById(`pr_${cityId}`);
  //   if (!node) {
  //     return;
  //   }

  //   const type = token.id.split("_")[0];
  //   const colorOrReligion = token.id.split("_")[1];

  //   this.game.supply.incValue({ type, religion: colorOrReligion, value: -1 });

  //   node.insertAdjacentHTML(
  //     "beforeend",
  //     tplChessPiece({
  //       id: token.id,
  //       type,
  //       color: [PAWN, DISK].includes(type) ? colorOrReligion : undefined,
  //       religion: [PAWN, DISK].includes(type) ? undefined : colorOrReligion,
  //     })
  //   );
  //   return Promise.resolve();
  // }

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
    const { region, playerId } = notif.args;
    this.game.market.incFlorinValue({
      region: region as "east" | "west",
      column: 0,
      value: -1,
    });
    this.getPlayer({ playerId }).counters.florins.incValue(1);
    return Promise.resolve();
  }

  // notif_smallRefreshHand(notif: Notif<NotifSmallRefreshHandArgs>) {
  //   const { hand, playerId } = notif.args;
  //   const player = this.getPlayer({ playerId });
  //   player.clearHand();
  //   player.setupHand({ hand });
  // }

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
