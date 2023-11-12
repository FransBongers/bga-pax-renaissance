declare const define;
declare const ebg;
declare const $;
declare const dojo: Dojo;
declare const _: (stringToTranslate: string) => string;
declare const g_gamethemeurl;
declare const playSound;

class PaxRenaissance implements PaxRenaissanceGame {
  public gamedatas: PaxRenaissanceGamedatas;
  public animationManager: AnimationManager;
  public cardManager: CardManager<TableauCard>;
  public gameMap: GameMap;
  public hand: Hand;
  // public gameOptions: PaxRenaissanceGamedatas['gameOptions'];
  public market: Market;
  public notificationManager: NotificationManager;
  public playerManager: PlayerManager;
  public tooltipManager: TooltipManager;
  public playAreaScale: number;

  private _notif_uid_to_log_id = {};
  private _last_notif = null;
  public _connections: unknown[];

  public activeStates: {};

  constructor() {
    console.log("paxrenaissance constructor");
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  public setup(gamedatas: PaxRenaissanceGamedatas) {
    // Create a new div for buttons to avoid BGA auto clearing it
    dojo.place(
      "<div id='customActions' style='display:inline-block'></div>",
      $("generalactions"),
      "after"
    );

    // const playAreaWidth = document.getElementById('pp_play_area').offsetWidth;
    // console.log('playAreaWidth',playAreaWidth);
    this.gamedatas = gamedatas;
    // this.gameOptions = gamedatas.gameOptions;
    debug("gamedata", gamedatas);

    this._connections = [];
    // Will store all data for active player and gets refreshed with entering player actions state
    this.activeStates = {};

    this.animationManager = new AnimationManager(this, { duration: 1000 });
    this.setupCardManagers();

    this.gameMap = new GameMap(this);
    this.tooltipManager = new TooltipManager(this);
    this.playerManager = new PlayerManager(this);
    this.market = new Market(this);
    this.hand = new Hand(this);
    this.updatePlayAreaSize();
    window.addEventListener("resize", () => {
      this.updatePlayAreaSize();
      // this.gameMap.updateGameMapSize();
    });

    if (this.notificationManager != undefined) {
      this.notificationManager.destroy();
    }
    this.notificationManager = new NotificationManager(this);
    this.notificationManager.setupNotifications();

    // TO CHECK: add tooltips to log here?
    // dojo.connect(this.framework().notifqueue, 'addToLog', () => {
    //   this.checkLogCancel(this._last_notif == null ? null : this._last_notif.msg.uid);
    //   this.addLogClass();
    //   this.tooltipManager.checkLogTooltip(this._last_notif);
    // });
    // this.setupNotifications();
    this.tooltipManager.setupTooltips();
    debug("Ending game setup");
  }

  public updatePlayAreaSize() {
    const playAreaContainer = document.getElementById("pr_play_area_container");
    this.playAreaScale = Math.min(
      1,
      playAreaContainer.offsetWidth / MIN_PLAY_AREA_WIDTH
    );
    const playArea = document.getElementById("pr_play_area");
    playArea.style.transform = `scale(${this.playAreaScale})`;
    const playAreaHeight = playArea.offsetHeight;
    playArea.style.width =
      playAreaContainer.offsetWidth / this.playAreaScale + "px";
    console.log("playAreaHeight", playAreaHeight);
    playAreaContainer.style.height = playAreaHeight * this.playAreaScale + "px";
  }

  setupCardManagers() {
    this.cardManager = new CardManager(this, {
      animationManager: this.animationManager,
      getId: (card) => card.id.split("_")[0],
      setupDiv: (card, div) => {
        // div.classList.add("pr_card");
        div.style.width = "calc(var(--paxRenCardScale) * 151px)";
        div.style.height = "calc(var(--paxRenCardScale) * 230px)";
        // div.style.position = 'relative';
      },
      setupFrontDiv: (card, div) => {
        // console.log("setupFrontDiv", card);
        div.classList.add("pr_card");
        div.setAttribute("data-card-id", card.id.split("_")[0]);
        div.style.width = "calc(var(--paxRenCardScale) * 151px)";
        div.style.height = "calc(var(--paxRenCardScale) * 230px)";
        // div.style.background = 'blue';
        // div.classList.add('mygame-card-front');
        // div.id = `card-${card.id}-front`;
        // this.addTooltipHtml(div.id, `tooltip de ${card.type}`);
        if (!card.id.startsWith("FAKE")) {
          this.tooltipManager.addCardTooltip({
            nodeId: card.id.split("_")[0] + "-front",
            card,
          });
        }
      },
      setupBackDiv: (card, div) => {
        div.classList.add("pr_card");
        div.setAttribute(
          "data-card-id",
          card.region === EAST ? "EAST_BACK" : "WEST_BACK"
        );
        div.style.width = "calc(var(--paxRenCardScale) * 151px)";
        div.style.height = "calc(var(--paxRenCardScale) * 230px)";
      },
      cardWidth: 151,
      cardHeight: 230,
      isCardVisible: ({ location }) => {
        if (location.startsWith("deck")) {
          return false;
        }
        if (location === "market_west_0" || location === "market_east_0") {
          return false;
        }
        return true;
      },
    });
  }

  setupNotifications() {
    // Replaced by notification manager
  }

  //  .####.##....##.########.########.########.....###.....######..########.####..#######..##....##
  //  ..##..###...##....##....##.......##.....##...##.##...##....##....##.....##..##.....##.###...##
  //  ..##..####..##....##....##.......##.....##..##...##..##..........##.....##..##.....##.####..##
  //  ..##..##.##.##....##....######...########..##.....##.##..........##.....##..##.....##.##.##.##
  //  ..##..##..####....##....##.......##...##...#########.##..........##.....##..##.....##.##..####
  //  ..##..##...###....##....##.......##....##..##.....##.##....##....##.....##..##.....##.##...###
  //  .####.##....##....##....########.##.....##.##.....##..######.....##....####..#######..##....##

  ///////////////////////////////////////////////////
  //// Game & client states

  // onEnteringState: this method is called each time we are entering into a new game state.
  //                  You can use this method to perform some user interface changes at this moment.
  public onEnteringState(stateName: string, args: any) {
    console.log("Entering state: " + stateName, args);
    // UI changes for active player
    if (
      this.framework().isCurrentPlayerActive() &&
      this.activeStates[stateName]
    ) {
      this.activeStates[stateName].onEnteringState(args.args);
    }
  }

  // onLeavingState: this method is called each time we are leaving a game state.
  //                 You can use this method to perform some user interface changes at this moment.
  //
  public onLeavingState(stateName: string) {
    console.log("Leaving state: " + stateName);
    this.clearPossible();
  }

  // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
  //                        action status bar (ie: the HTML links in the status bar).
  //
  public onUpdateActionButtons(stateName: string, args: any) {
    if (this.framework().isCurrentPlayerActive()) {
      this.addPrimaryActionButton({
        id: "end_game_button",
        text: _("End game"),
        callback: () => this.takeAction({ action: "endGame" }),
      });

      this.addPrimaryActionButton({
        id: "add_card_button",
        text: _("Add card to hand"),
        callback: () => {
          // add a card
          let card = this.market
            .getStock({ region: EAST, column: 1 })
            .getCards()[0];
          if (!card) {
            card = this.market
              .getStock({ region: EAST, column: 2 })
              .getCards()[0];
          }
          if (!card) {
            card = this.market
              .getStock({ region: EAST, column: 3 })
              .getCards()[0];
          }

          this.hand.addCard(card);
        },
      });

      // this.addPrimaryActionButton({
      //   id: "deal_card_button",
      //   text: _("Deal card"),
      //   callback: async () => {
      //     // add a card
      //     const card: TableauCard = {
      //       flavorText: [
      //         'When faced with a heretic, the papacy had two solu…rced conversion or "auto-da-fé" (public burning).',
      //         "Pope Innocent VIII preferred burning. In 1484 he i…man inquisition against witchcraft and magicians.",
      //         "He then confirmed Torquemada as the Grand Inquisit… a crusade against Waldensian heretics in France.",
      //       ],
      //       id: "PREN001_InquistionPope",
      //       location: "market_west_3",
      //       name: "Inquistion Pope",
      //       region: "west",
      //       state: 0,
      //       type: "tableauCard",
      //       used: 0,
      //     };
      //     await this.market.getDeck({ region: WEST }).addCard({
      //       ...card,
      //       location: 'deck',
      //     });
      //     // this.market.getStock({ column: 6, region: WEST }).flipCard({
      //     //   ...card,
      //     //   location: 'deck',
      //     // });
      //     await this.market.getStock({region: WEST, column: 5}).addCard(card, {fromStock: this.market.getDeck({region: WEST})});
      //     // console.log("source stock", this.stock.getCards());
      //     // await this.stockDest.addCard(card, undefined, { visible: false });
      //     // console.log("source stock after", this.stock.getCards());
      //   },
      // });

      // this.addPrimaryActionButton({
      //   id: "move_card_button",
      //   text: _("Move card"),
      //   callback: async () => {
      //     // add a card
      //     const card = {
      //       id: "PREN007_PetersPence",
      //       type: 3,
      //       type_arg: 2,
      //       location: "table",
      //       location_arg: 0,
      //     };
      //     console.log('source stock', this.stock.getCards());
      //     await this.stockDest.addCard(card, undefined, {visible: false});
      //     console.log('source stock after', this.stock.getCards());
      //   },
      // });

      // this.addPrimaryActionButton({
      //   id: "flip_card_button",
      //   text: _("Flip card"),
      //   callback: () => {
      //     // add a card
      //     const card = {
      //       id: "PREN007_PetersPence",
      //       type: 3,
      //       type_arg: 2,
      //       location: "table",
      //       location_arg: 0,
      //     };
      //     this.stock.flipCard(card);
      //   },
      // });
    }

    // console.log('onUpdateActionButtons: ' + stateName);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  ///////////////////////////////////////////////////
  //// Utility methods - add in alphabetical order

  /*
   * Add a blue/grey button if it doesn't already exists
   */
  addActionButtonClient({
    id,
    text,
    callback,
    extraClasses,
    color = "none",
  }: {
    id: string;
    text: string;
    callback: Function | string;
    extraClasses?: string;
    color?: "blue" | "gray" | "red" | "none";
  }) {
    if ($(id)) {
      return;
    }
    this.framework().addActionButton(
      id,
      text,
      callback,
      "customActions",
      false,
      color
    );
    if (extraClasses) {
      dojo.addClass(id, extraClasses);
    }
  }

  addCancelButton() {
    this.addDangerActionButton({
      id: "cancel_btn",
      text: _("Cancel"),
      callback: () => this.onCancel(),
    });
  }

  addUndoButton() {
    this.addDangerActionButton({
      id: "undo_btn",
      text: _("Undo"),
      callback: () => this.takeAction({ action: "restart" }),
    });
  }

  addPrimaryActionButton({
    id,
    text,
    callback,
    extraClasses,
  }: {
    id: string;
    text: string;
    callback: Function | string;
    extraClasses?: string;
  }) {
    if ($(id)) {
      return;
    }
    this.framework().addActionButton(
      id,
      text,
      callback,
      "customActions",
      false,
      "blue"
    );
    if (extraClasses) {
      dojo.addClass(id, extraClasses);
    }
  }

  addSecondaryActionButton({
    id,
    text,
    callback,
    extraClasses,
  }: {
    id: string;
    text: string;
    callback: Function | string;
    extraClasses?: string;
  }) {
    if ($(id)) {
      return;
    }
    this.framework().addActionButton(
      id,
      text,
      callback,
      "customActions",
      false,
      "gray"
    );
    if (extraClasses) {
      dojo.addClass(id, extraClasses);
    }
  }

  addDangerActionButton({
    id,
    text,
    callback,
    extraClasses,
  }: {
    id: string;
    text: string;
    callback: Function | string;
    extraClasses?: string;
  }) {
    if ($(id)) {
      return;
    }
    this.framework().addActionButton(
      id,
      text,
      callback,
      "customActions",
      false,
      "red"
    );
    if (extraClasses) {
      dojo.addClass(id, extraClasses);
    }
  }

  public clearInterface() {
    console.log("clear interface");
    this.playerManager.clearInterface();
  }

  clearPossible() {
    this.framework().removeActionButtons();
    dojo.empty("customActions");

    dojo.forEach(this._connections, dojo.disconnect);
    this._connections = [];

    dojo.query(`.${PR_SELECTABLE}`).removeClass(PR_SELECTABLE);
    dojo.query(`.${PR_SELECTED}`).removeClass(PR_SELECTED);
  }

  public getPlayerId(): number {
    return Number(this.framework().player_id);
  }

  public getCurrentPlayer(): PRPlayer {
    return this.playerManager.getPlayer({ playerId: this.getPlayerId() });
  }

  /**
   * Typescript wrapper for framework functions
   */
  public framework(): Framework {
    return this as unknown as Framework;
  }

  onCancel() {
    this.clearPossible();
    this.framework().restoreServerGameState();
  }

  clientUpdatePageTitle({
    text,
    args,
  }: {
    text: string;
    args: Record<string, string | number>;
  }) {
    this.gamedatas.gamestate.descriptionmyturn = this.format_string_recursive(
      _(text),
      args
    );
    this.framework().updatePageTitle();
  }

  // .########.########.....###....##.....##.########.##......##..#######..########..##....##
  // .##.......##.....##...##.##...###...###.##.......##..##..##.##.....##.##.....##.##...##.
  // .##.......##.....##..##...##..####.####.##.......##..##..##.##.....##.##.....##.##..##..
  // .######...########..##.....##.##.###.##.######...##..##..##.##.....##.########..#####...
  // .##.......##...##...#########.##.....##.##.......##..##..##.##.....##.##...##...##..##..
  // .##.......##....##..##.....##.##.....##.##.......##..##..##.##.....##.##....##..##...##.
  // .##.......##.....##.##.....##.##.....##.########..###..###...#######..##.....##.##....##

  // ..#######..##.....##.########.########..########..####.########..########..######.
  // .##.....##.##.....##.##.......##.....##.##.....##..##..##.....##.##.......##....##
  // .##.....##.##.....##.##.......##.....##.##.....##..##..##.....##.##.......##......
  // .##.....##.##.....##.######...########..########...##..##.....##.######....######.
  // .##.....##..##...##..##.......##...##...##...##....##..##.....##.##.............##
  // .##.....##...##.##...##.......##....##..##....##...##..##.....##.##.......##....##
  // ..#######.....###....########.##.....##.##.....##.####.########..########..######.

  /* @Override */
  format_string_recursive(log: string, args: Record<string, unknown>): string {
    try {
      if (log && args && !args.processed) {
        args.processed = true;

        // replace all keys that start with 'logToken'
        Object.entries(args).forEach(([key, value]) => {
          if (key.startsWith("tkn_")) {
            args[key] = getTokenDiv({
              key,
              value: value as string,
              game: this,
            });
          }
        });

        // TODO: check below code. Looks like improved way for text shadows (source ticket to ride)
        // ['you', 'actplayer', 'player_name'].forEach((field) => {
        //   if (typeof args[field] === 'string' && args[field].indexOf('#ffed00;') !== -1 && args[field].indexOf('text-shadow') === -1) {
        //     args[field] = args[field].replace('#ffed00;', '#ffed00; text-shadow: 0 0 1px black, 0 0 2px black, 0 0 3px black;');
        //   }
        // });
      }
    } catch (e) {
      console.error(log, args, "Exception thrown", e.stack);
    }
    return (this as any).inherited(arguments);
  }

  /*
   * [Undocumented] Called by BGA framework on any notification message
   * Handle cancelling log messages for restart turn
   */
  onPlaceLogOnChannel(msg: Notif<unknown>) {
    // console.log('msg', msg);
    const currentLogId = this.framework().notifqueue.next_log_id;
    const res = this.framework().inherited(arguments);
    this._notif_uid_to_log_id[msg.uid] = currentLogId;
    this._last_notif = {
      logId: currentLogId,
      msg,
    };
    // console.log('_notif_uid_to_log_id', this._notif_uid_to_log_id);
    return res;
  }

  /*
   * cancelLogs:
   *   strikes all log messages related to the given array of notif ids
   */
  checkLogCancel(notifId) {
    if (
      this.gamedatas.canceledNotifIds != null &&
      this.gamedatas.canceledNotifIds.includes(notifId)
    ) {
      this.cancelLogs([notifId]);
    }
  }

  public cancelLogs(notifIds: string[]) {
    notifIds.forEach((uid) => {
      if (this._notif_uid_to_log_id.hasOwnProperty(uid)) {
        let logId = this._notif_uid_to_log_id[uid];
        if ($("log_" + logId)) dojo.addClass("log_" + logId, "cancel");
      }
    });
  }

  addLogClass() {
    if (this._last_notif == null) return;

    let notif = this._last_notif;
    if ($("log_" + notif.logId)) {
      let type = notif.msg.type;
      if (type == "history_history") type = notif.msg.args.originalType;

      dojo.addClass("log_" + notif.logId, "notif_" + type);
    }
  }

  /*
   * [Undocumented] Override BGA framework functions to call onLoadingComplete when loading is done
   */
  setLoader(value, max) {
    this.framework().inherited(arguments);
    if (!this.framework().isLoadingComplete && value >= 100) {
      this.framework().isLoadingComplete = true;
      this.onLoadingComplete();
    }
  }

  onLoadingComplete() {
    // debug('Loading complete');
    this.cancelLogs(this.gamedatas.canceledNotifIds);
  }

  //....###..........##....###....##.....##
  //...##.##.........##...##.##....##...##.
  //..##...##........##..##...##....##.##..
  //.##.....##.......##.##.....##....###...
  //.#########.##....##.#########...##.##..
  //.##.....##.##....##.##.....##..##...##.
  //.##.....##..######..##.....##.##.....##

  actionError(actionName: string) {
    this.framework().showMessage(`cannot take ${actionName} action`, "error");
  }

  /*
   * Make an AJAX call with automatic lock
   */
  takeAction({
    action,
    data = {},
  }: {
    action: string;
    data?: Record<string, unknown>;
  }) {
    console.log(`takeAction ${action}`, data);
    if (!this.framework().checkAction(action)) {
      this.actionError(action);
      return;
    }
    data.lock = true;
    const gameName = this.framework().game_name;
    this.framework().ajaxcall(
      `/${gameName}/${gameName}/${action}.html`,
      data,
      this,
      () => {}
    );
  }
}
