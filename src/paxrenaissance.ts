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
  // public cardManager: CardManager<TableauCard>;
  public gameMap: GameMap;
  public gameOptions: PaxRenaissanceGamedatas['gameOptions'];
  public hand: Hand;
  // public gameOptions: PaxRenaissanceGamedatas['gameOptions'];
  public infoPanel: InfoPanel;
  public market: Market;
  public notificationManager: NotificationManager;
  public openHandsModal: OpenHandsModal;
  public playerManager: PlayerManager;
  public playerOrder: number[];
  public tooltipManager: TooltipManager;
  public playAreaScale: number;
  public settings: Settings;
  public supply: Supply;
  public tableauCardManager: TableauCardManager;
  public victoryCardManager: VictoryCardManager;

  private _notif_uid_to_log_id = {};
  private _last_notif = null;
  public _connections: unknown[];

  public activeStates: {
    [CLIENT_CONFIRM_TABLEAU_OPS]: ClientConfirmTableauOpsState;
    [CLIENT_DECLARE_VICTORY_STATE]: ClientDeclareVictoryState;
    [CLIENT_SELL_CARD_STATE]: ClientSellCardState;
    [CLIENT_START_TRADE_FAIR_STATE]: ClientStartTradeFairState;
    [CLIENT_USE_ABILITY_ACTION_STATE]: ClientUseAbilityActionState;
    abilityActionSelectApostasy: AbilityActionSelectApostasyState;
    abilityActionSelectTradeFair: AbilityActionSelectTradeFairState;
    abilityOpponentsPurpleOp: AbilityOpponentsPurpleOpState;
    announceOneShot: AnnounceOneShotState;
    battleCasualties: BattleCasualtiesState;
    battleLocation: BattleLocationState;
    battlePlaceAttackers: BattlePlaceAttackersState;
    battleReconfigureContantinople: BattleReconfigureConstantinopleState;
    bishopPacification: BishopPacificationState;
    confirmPartialTurn: ConfirmPartialTurnState;
    confirmTurn: ConfirmTurnState;
    coronationOneShot: CoronationState;
    discardDownToHandLimit: DiscardDownToHandLimitState;
    flipVictoryCard: FlipVictoryCardState;
    freeAction: FreeActionState;
    placeAgent: PlaceAgentState;
    placeLevySelectCity: PlaceLevySelectCityState;
    playerAction: PlayerActionState;
    regimeChangeEmancipation: RegimeChangeEmancipationState;
    regimeChangeGoldenLiberty: RegimeChangeGoldenLibertyState;
    selectToken: SelectTokenState;
    tableauOpBehead: TableauOpBeheadState;
    tableauOpCampaign: TableauOpCampaignState;
    tableauOpCommerce: TableauOpCommerceState;
    tableauOpCorsair: TableauOpCorsairState;
    tableauOpInquisitor: TableauOpInquisitorState;
    tableauOpRepress: TableauOpRepressState;
    tableauOpSiege: TableauOpSiegeState;
    tableauOpsSelect: TableauOpsSelectState;
    tableauOpTax: TableauOpTaxState;
    tableauOpTaxPayOrRepress: TableauOpTaxPayOrRepressState;
    tableauOpVote: TableauOpVoteState;
    tradeFairLevy: TradeFairLevyState;
  };

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
    this.gameOptions = gamedatas.gameOptions;
    debug("gamedatas", gamedatas);
    this.setupPlayerOrder({ customPlayerOrder: gamedatas.customPlayerOrder });

    this._connections = [];
    // Will store all data for active player and gets refreshed with entering player actions state
    this.activeStates = {
      [CLIENT_CONFIRM_TABLEAU_OPS]: new ClientConfirmTableauOpsState(this),
      [CLIENT_DECLARE_VICTORY_STATE]: new ClientDeclareVictoryState(this),
      [CLIENT_SELL_CARD_STATE]: new ClientSellCardState(this),
      [CLIENT_START_TRADE_FAIR_STATE]: new ClientStartTradeFairState(this),
      [CLIENT_USE_ABILITY_ACTION_STATE]: new ClientUseAbilityActionState(this),
      abilityActionSelectApostasy: new AbilityActionSelectApostasyState(this),
      abilityActionSelectTradeFair: new AbilityActionSelectTradeFairState(this),
      abilityOpponentsPurpleOp: new AbilityOpponentsPurpleOpState(this),
      announceOneShot: new AnnounceOneShotState(this),
      battleCasualties: new BattleCasualtiesState(this),
      battleLocation: new BattleLocationState(this),
      battlePlaceAttackers: new BattlePlaceAttackersState(this),
      battleReconfigureContantinople: new BattleReconfigureConstantinopleState(
        this
      ),
      bishopPacification: new BishopPacificationState(this),
      confirmPartialTurn: new ConfirmPartialTurnState(this),
      confirmTurn: new ConfirmTurnState(this),
      coronationOneShot: new CoronationState(this),
      discardDownToHandLimit: new DiscardDownToHandLimitState(this),
      flipVictoryCard: new FlipVictoryCardState(this),
      freeAction: new FreeActionState(this),
      placeAgent: new PlaceAgentState(this),
      placeLevySelectCity: new PlaceLevySelectCityState(this),
      playerAction: new PlayerActionState(this),
      regimeChangeEmancipation: new RegimeChangeEmancipationState(this),
      regimeChangeGoldenLiberty: new RegimeChangeGoldenLibertyState(this),
      selectToken: new SelectTokenState(this),
      tableauOpBehead: new TableauOpBeheadState(this),
      tableauOpCampaign: new TableauOpCampaignState(this),
      tableauOpCommerce: new TableauOpCommerceState(this),
      tableauOpCorsair: new TableauOpCorsairState(this),
      tableauOpInquisitor: new TableauOpInquisitorState(this),
      tableauOpRepress: new TableauOpRepressState(this),
      tableauOpSiege: new TableauOpSiegeState(this),
      tableauOpsSelect: new TableauOpsSelectState(this),
      tableauOpTax: new TableauOpTaxState(this),
      tableauOpTaxPayOrRepress: new TableauOpTaxPayOrRepressState(this),
      tableauOpVote: new TableauOpVoteState(this),
      tradeFairLevy: new TradeFairLevyState(this),
    };

    this.infoPanel = new InfoPanel(this);
    this.animationManager = new AnimationManager(this, { duration: 500 });
    this.tableauCardManager = new TableauCardManager(this);

    this.tooltipManager = new TooltipManager(this);
    this.gameMap = new GameMap(this);
    if (this.playerOrder.includes(this.getPlayerId())) {
      this.hand = new Hand(this);
    }
    this.playerManager = new PlayerManager(this);
    this.supply = new Supply(this);
    this.market = new Market(this);
    this.victoryCardManager = new VictoryCardManager(this);

    this.openHandsModal = new OpenHandsModal(this);
    this.settings = new Settings(this),

    this.updatePlayAreaSize();
    // TODO: use framework function that's called for this
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

  // Sets player order with current player at index 0 if player is in the game
  setupPlayerOrder({ customPlayerOrder }: { customPlayerOrder: number[] }) {
    const currentPlayerId = this.getPlayerId();
    const isInGame = customPlayerOrder.includes(currentPlayerId);
    if (isInGame) {
      while (customPlayerOrder[0] !== currentPlayerId) {
        const firstItem = customPlayerOrder.shift();
        customPlayerOrder.push(firstItem);
      }
    }
    this.playerOrder = customPlayerOrder;
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
    } else if (this.activeStates[stateName]) {
      this.activeStates[stateName].setDescription(
        Number(args.active_player),
        args.args
      );
    }
  }

  // onLeavingState: this method is called each time we are leaving a game state.
  //                 You can use this method to perform some user interface changes at this moment.
  //
  public onLeavingState(stateName: string) {
    console.log("Leaving state: " + stateName);
    this.clearPossible();
  }

  public async moveFlorin({ index }: { index: number }) {
    // const element = dojo.place(
    //   tplIcon({ id: `temp_florin_${index}`, icon: 'florin', style: 'position: absolute;' }),
    //   `pr_florins_counter_2371052_icon`
    // );
    const node = document.getElementById(`pr_florins_counter_2371052_icon`);
    node.insertAdjacentHTML(
      "beforeend",
      tplIcon({
        id: `temp_florin_${index}`,
        icon: "florin",
        style: "position: absolute;",
      })
    );
    const element = document.getElementById(`temp_florin_${index}`);
    const fromRect = $(`pr_market_west_3_florins`)?.getBoundingClientRect();
    this.market.incFlorinValue({ region: WEST, column: 3, value: -1 });
    // this.incCounter({ counter: 'rupees', value: -rupees });
    await this.animationManager.play(
      new BgaSlideAnimation<BgaAnimationWithOriginSettings>({
        element,
        transitionTimingFunction: "ease-in-out",
        fromRect,
      })
    );
    element.remove();
    this.playerManager
      .getPlayer({ playerId: 2371052 })
      .counters.florins.incValue(1);
    return true;
  }

  // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
  //                        action status bar (ie: the HTML links in the status bar).
  //
  public onUpdateActionButtons(stateName: string, args: any) {
    return;
    if (this.framework().isCurrentPlayerActive()) {
      this.addPrimaryActionButton({
        id: "draw_button",
        text: _("Test"),
        callback: () => {
          this.clearInterface();
        },
      });
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

  addConfirmButton({ callback }: { callback: Function | string }) {
    this.addPrimaryActionButton({
      id: "confirm_btn",
      text: _("Confirm"),
      callback,
    });
  }

  addPassButton({
    optionalAction,
    text,
  }: {
    optionalAction: boolean;
    text?: string;
  }) {
    if (optionalAction) {
      this.addSecondaryActionButton({
        id: "pass_btn",
        text: text ? _(text) : _("Pass"),
        callback: () => this.takeAction({ action: "actPassOptionalAction" }),
      });
    }
  }

  addSkipButton({ callback }: { callback: Function | string }) {
    this.addSecondaryActionButton({
      id: "skip_btn",
      text: _("Skip"),
      callback,
    });
  }

  // addUndoButton() {
  //   this.addDangerActionButton({
  //     id: "undo_btn",
  //     text: _("Undo"),
  //     callback: () => this.takeAction({ action: "restart" }),
  //   });
  // }

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

  addRestartButton({ previousEngineChoices }: CommonArgs) {
    if (previousEngineChoices < 1) {
      return;
    }
    this.addDangerActionButton({
      id: "restart_btn",
      text: _("Restart turn"),
      callback: () => this.takeAction({ action: "actRestart" }),
    });
  }

  addUndoButtons({ previousSteps, previousEngineChoices }: CommonArgs) {
    const lastStep = Math.max(0, ...previousSteps);
    if (lastStep > 0) {
      // this.addDangerActionButton('btnUndoLastStep', _('Undo last step'), () => this.undoToStep(lastStep), 'restartAction');
      this.addDangerActionButton({
        id: "undo_last_step_btn",
        text: _("Undo last step"),
        callback: () =>
          this.takeAction({
            action: "actUndoToStep",
            args: {
              stepId: lastStep,
            },
            checkAction: "actRestart",
          }),
      });
    }

    if (previousEngineChoices > 0) {
      this.addDangerActionButton({
        id: "restart_btn",
        text: _("Restart turn"),
        callback: () => this.takeAction({ action: "actRestart" }),
      });
    }
  }

  public clearInterface() {
    this.tableauCardManager.clearInterface();
    this.victoryCardManager.clearInterface();
    this.gameMap.clearInterface();
    this.market.clearInterface();
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

  // NOTE: we should probably not use this as current player can also be a spectator?
  // public getCurrentPlayer(): PRPlayer {
  //   return this.playerManager.getPlayer({ playerId: this.getPlayerId() });
  // }

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
    nonActivePlayers = false,
  }: {
    text: string;
    args: Record<string, string | number>;
    nonActivePlayers?: boolean;
  }) {
    const title = this.format_string_recursive(_(text), args);
    if (nonActivePlayers) {
      this.gamedatas.gamestate.description = title;
    } else {
      this.gamedatas.gamestate.descriptionmyturn = title;
    }
    this.framework().updatePageTitle();
  }

  setCardSelectable({
    id,
    callback,
    back = false,
  }: {
    id: string;
    callback: (props: { id: string }) => void;
    back?: boolean;
  }) {
    const nodeId = `${id}-${back ? "back" : "front"}`;
    // const nodeId = `${card.id}`;
    const node = $(nodeId);
    if (node === null) {
      return;
    }
    node.classList.add(PR_SELECTABLE);
    this._connections.push(
      dojo.connect(node, "onclick", this, () => callback({ id }))
    );
  }

  setCardSelected({ id, back = false }: { id: string; back?: boolean }) {
    const nodeId = `${id}-${back ? "back" : "front"}`;
    const node = $(nodeId);
    if (node === null) {
      return;
    }
    node.classList.add(PR_SELECTED);
  }

  setLocationSelectable({
    id,
    callback,
  }: {
    id: string;
    callback: (props: { id: string }) => void;
  }) {
    const nodeId = `pr_${id}`;
    const node = $(nodeId);

    if (node === null) {
      return;
    }
    node.classList.add(PR_SELECTABLE);
    this._connections.push(
      dojo.connect(node, "onclick", this, () => callback({ id }))
    );
  }

  setLocationSelected({ id }: { id: string }) {
    const nodeId = `pr_${id}`;
    const node = $(nodeId);
    if (node === null) {
      return;
    }
    node.classList.add(PR_SELECTED);
  }

  setTokenSelectable({
    id,
    callback,
  }: {
    id: string;
    callback: (props: { id: string }) => void;
  }) {
    const nodeId = `${id}`;
    const node = $(nodeId);

    if (node === null) {
      return;
    }
    node.classList.add(PR_SELECTABLE);
    this._connections.push(
      dojo.connect(node, "onclick", this, () => callback({ id }))
    );
  }

  setTokenSelected({ id }: { id: string }) {
    const nodeId = `${id}`;
    const node = $(nodeId);
    if (node === null) {
      return;
    }
    node.classList.add(PR_SELECTED);
  }

  undoToStep({ stepId }: { stepId: string }) {
    // this.stopActionTimer();
    this.framework().checkAction("actRestart");
    // this.takeAction('actUndoToStep', args: { stepId });
    this.takeAction({
      action: "actUndoToStep",
      args: {
        stepId,
      },
    });
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

  /* @Override */
	updatePlayerOrdering() {
		this.framework().inherited(arguments);
    
    const container = document.getElementById('player_boards');
    const infoPanel = document.getElementById('pr_info_panel')
    if (!container) {
      return;
    }
    container.insertAdjacentElement('afterbegin', infoPanel);
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
    args = {},
    checkAction,
  }: {
    action: string;
    args?: Record<string, unknown>;
    checkAction?: string;
  }) {
    console.log(`takeAction ${action}`, args);
    if (!this.framework().checkAction(checkAction ? checkAction : action)) {
      this.actionError(action);
      return;
    }
    const data = {
      lock: true,
      args: JSON.stringify(args),
    };
    // data.
    const gameName = this.framework().game_name;
    this.framework().ajaxcall(
      `/${gameName}/${gameName}/${action}.html`,
      data,
      this,
      () => {}
    );
  }
}
