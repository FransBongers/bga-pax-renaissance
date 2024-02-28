declare const define;
declare const ebg;
declare const $;
declare const dojo: Dojo;
declare const _: (stringToTranslate: string) => string;
declare const g_gamethemeurl;
declare const playSound;
declare var noUiSlider;

class PaxRenaissance implements PaxRenaissanceGame {
  public gamedatas: PaxRenaissanceGamedatas;
  public animationManager: AnimationManager;
  // public cardManager: CardManager<TableauCard>;
  public discard: VoidStock<EmpireCard | TableauCard | EmpireCardContainer>;
  public gameMap: GameMap;
  public gameOptions: PaxRenaissanceGamedatas["gameOptions"];
  public hand: Hand;
  // public gameOptions: PaxRenaissanceGamedatas['gameOptions'];
  public infoPanel: InfoPanel;
  public informationModal: InformationModal;
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
  // public instantaneousMode: boolean = true;

  private _helpMode = false; // Use to implement help mode
  private _notif_uid_to_log_id = {};
  private _notif_uid_to_mobile_log_id = {};
  private _last_notif = null;
  public _last_tooltip_id = 0;
  private _selectableNodes = []; // TODO: use to keep track of selectable classed?
  public tooltipsToMap: [tooltipId: number, card_id: string][] = [];
  public _connections: unknown[];
  private alwaysFixTopActions: boolean;
  private alwaysFixTopActionsMaximum: number;

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
    removeTokenFromCity: RemoveTokenFromCityState;
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
    this.setAlwaysFixTopActions();
    this.setupDontPreloadImages();

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
      removeTokenFromCity: new RemoveTokenFromCityState(this),
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
    this.informationModal = new InformationModal(this);
    this.settings = new Settings(this);

    this.animationManager = new AnimationManager(this, {
      duration:
        this.settings.get({ id: PREF_SHOW_ANIMATIONS }) === DISABLED
          ? 0
          : 2100 - (this.settings.get({ id: PREF_ANIMATION_SPEED }) as number),
    });

    this.tableauCardManager = new TableauCardManager(this);
    this.discard = new VoidStock(
      this.tableauCardManager,
      document.getElementById("pr_discard")
    );

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

    if (this.notificationManager != undefined) {
      this.notificationManager.destroy();
    }
    this.notificationManager = new NotificationManager(this);
    this.notificationManager.setupNotifications();

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

  setupDontPreloadImages() {
    this.framework().dontPreloadImage("background_balcony.webp");
    this.framework().dontPreloadImage("background_cathedral.webp");
    this.framework().dontPreloadImage("background_goldsmith.webp");
    this.framework().dontPreloadImage("background_lucrezia.webp");
    this.framework().dontPreloadImage("background_poison.webp");
    this.framework().dontPreloadImage("background_war.webp");
  }

  public updateLayout() {
    if (!this.settings) {
      return;
    }

    $("pr_play_area_container").setAttribute(
      "data-two-columns",
      this.settings.get({ id: "twoColumnsLayout" })
    );

    const ROOT = document.documentElement;
    let WIDTH =
      $("pr_play_area_container").getBoundingClientRect()["width"] - 8;
    const LEFT_COLUMN = 1500;
    const RIGHT_COLUMN = 1500;

    if (this.settings.get({ id: "twoColumnsLayout" }) === ENABLED) {
      WIDTH = WIDTH - 8; // grid gap
      const size = Number(this.settings.get({ id: "columnSizes" }));
      const proportions = [size, 100 - size];
      const LEFT_SIZE = (proportions[0] * WIDTH) / 100;
      const leftColumnScale = LEFT_SIZE / LEFT_COLUMN;
      ROOT.style.setProperty("--paxRenLeftColumnScale", `${leftColumnScale}`);

      const RIGHT_SIZE = (proportions[1] * WIDTH) / 100;
      const rightColumnScale = RIGHT_SIZE / RIGHT_COLUMN;
      ROOT.style.setProperty("--paxRenRightColumnScale", `${rightColumnScale}`);

      $(
        "pr_play_area_container"
      ).style.gridTemplateColumns = `${LEFT_SIZE}px ${RIGHT_SIZE}px`;
    } else {
      const LEFT_SIZE = WIDTH;
      const leftColumnScale = LEFT_SIZE / LEFT_COLUMN;
      ROOT.style.setProperty("--paxRenLeftColumnScale", `${leftColumnScale}`);
      const RIGHT_SIZE = WIDTH;
      const rightColumnScale = RIGHT_SIZE / RIGHT_COLUMN;
      ROOT.style.setProperty("--paxRenRightColumnScale", `${rightColumnScale}`);
    }
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

    // Undo last steps
    if (args.args && args.args.previousSteps) {
      args.args.previousSteps.forEach((stepId: number) => {
        let logEntry = $("logs").querySelector(
          `.log.notif_newUndoableStep[data-step="${stepId}"]`
        );
        if (logEntry) {
          this.onClick(logEntry, () => this.undoToStep({ stepId }));
        }

        logEntry = document.querySelector(
          `.chatwindowlogs_zone .log.notif_newUndoableStep[data-step="${stepId}"]`
        );
        if (logEntry) {
          this.onClick(logEntry, () => this.undoToStep({ stepId }));
        }
      });
    }
  }

  // onLeavingState: this method is called each time we are leaving a game state.
  //                 You can use this method to perform some user interface changes at this moment.
  //
  public onLeavingState(stateName: string) {
    this.clearPossible();
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

  private createAgentMapTokenId(agent: Agent) {
    let id = "";
    if (agent.type === PAWN) {
      const bank = this.playerManager
        .getPlayer({ playerId: this.getPlayerId() })
        .getBank();
      id = `${bank}_pawn`;
    } else {
      id = `${agent.separator}_${agent.type}`;
    }
    return id;
  }

  addAgentButton({
    id,
    callback,
    agent,
  }: {
    id: string;
    callback: Function | string;
    agent: Agent;
  }) {
    const text = this.format_string_recursive(_("${tkn_mapToken} Agent"), {
      tkn_mapToken: this.createAgentMapTokenId(agent),
    });
    this.addSecondaryActionButton({
      id,
      callback,
      text,
      extraClasses: "pr_agent_button",
    });
    // const html = tplToken({
    //   type: agent.type,
    //   separator:
    //     agent.type === PAWN
    //       ? this.playerManager
    //           .getPlayer({ playerId: this.getPlayerId() })
    //           .getBank()
    //       : agent.separator,
    // })
    // const node = document.getElementById(id);
    // node.insertAdjacentHTML('afterbegin', html)
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
    this._selectableNodes.forEach((node) => {
      if ($(node)) dojo.removeClass(node, "selectable selected");
    });
    this._selectableNodes = [];

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
  }: {
    id: string;
    callback: (event: PointerEvent) => void;
  }) {
    const node = $(id);
    if (node === null) {
      return;
    }
    node.classList.add(PR_SELECTABLE);
    this._connections.push(
      dojo.connect(node, "onclick", this, (event: PointerEvent) =>
        callback(event)
      )
    );
  }

  setCardSelected({ id }: { id: string }) {
    const node = $(id);
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
    callback: (event: PointerEvent) => void;
  }) {
    const nodeId = `pr_${id}`;
    const node = $(nodeId);

    if (node === null) {
      return;
    }
    node.classList.add(PR_SELECTABLE);
    this._connections.push(
      dojo.connect(node, "onclick", this, (event: PointerEvent) =>
        callback(event)
      )
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
    callback: (event: PointerEvent) => void;
  }) {
    const nodeId = `${id}`;
    const node = $(nodeId);

    if (node === null) {
      return;
    }
    node.classList.add(PR_SELECTABLE);
    this._connections.push(
      dojo.connect(node, "onclick", this, (event: PointerEvent) =>
        callback(event)
      )
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

  undoToStep({ stepId }: { stepId: string | number }) {
    // this.stopActionTimer();
    // this.framework().checkAction("actRestart");
    // this.takeAction('actUndoToStep', args: { stepId });
    this.takeAction({
      action: "actUndoToStep",
      args: {
        stepId,
      },
      checkAction: "actRestart",
    });
  }

  // .########...#######..####.##.......########.########.
  // .##.....##.##.....##..##..##.......##.......##.....##
  // .##.....##.##.....##..##..##.......##.......##.....##
  // .########..##.....##..##..##.......######...########.
  // .##.....##.##.....##..##..##.......##.......##...##..
  // .##.....##.##.....##..##..##.......##.......##....##.
  // .########...#######..####.########.########.##.....##

  // .########..##..........###....########.########
  // .##.....##.##.........##.##......##....##......
  // .##.....##.##........##...##.....##....##......
  // .########..##.......##.....##....##....######..
  // .##........##.......#########....##....##......
  // .##........##.......##.....##....##....##......
  // .##........########.##.....##....##....########

  /*
   * Custom connect that keep track of all the connections
   *  and wrap clicks to make it work with help mode
   */
  connect(node: HTMLElement, action: string, callback: Function) {
    this._connections.push(dojo.connect($(node), action, callback));
  }

  onClick(node: HTMLElement, callback: Function, temporary = true) {
    let safeCallback = (evt) => {
      evt.stopPropagation();
      if (this.framework().isInterfaceLocked()) {
        return false;
      }
      if (this._helpMode) {
        return false;
      }
      callback(evt);
    };

    if (temporary) {
      this.connect($(node), "click", safeCallback);
      dojo.removeClass(node, "unselectable"); // replace with pr_selectable / pr_selected
      dojo.addClass(node, "selectable");
      this._selectableNodes.push(node);
    } else {
      dojo.connect($(node), "click", safeCallback);
    }
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

  /*
   * Remove non standard zoom property
   */
  onScreenWidthChange() {
    this.updateLayout();
  }

  /**
   * Apparently onAdding<notif id>ToLog is called with every notification
   */
  onAddingNewUndoableStepToLog(notif: {
    logId: number;
    mobileLogId: number;
    msg: Notif<{
      preserve: string;
      processed: boolean;
      stepId: number | string;
    }>;
  }) {
    if (!$(`log_${notif.logId}`)) return;
    let stepId = notif.msg.args.stepId;
    $(`log_${notif.logId}`).dataset.step = stepId;
    if ($(`dockedlog_${notif.mobileLogId}`))
      $(`dockedlog_${notif.mobileLogId}`).dataset.step = stepId;

    if (
      (
        this.gamedatas.gamestate as ActiveGamestate<{
          previousSteps?: number[];
        }>
      ).args.previousSteps?.includes(Number(stepId))
    ) {
      this.onClick($(`log_${notif.logId}`), () => this.undoToStep({ stepId }));
      if ($(`dockedlog_${notif.mobileLogId}`))
        this.onClick($(`dockedlog_${notif.mobileLogId}`), () =>
          this.undoToStep({ stepId })
        );
    }
  }

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
    const currentMobileLogId = this.framework().next_log_id;
    const res = this.framework().inherited(arguments);
    this._notif_uid_to_log_id[msg.uid] = currentLogId;
    this._notif_uid_to_mobile_log_id[msg.uid] = currentMobileLogId;
    this._last_notif = {
      logId: currentLogId,
      mobileLogId: currentMobileLogId,
      msg,
    };
    // console.log('_notif_uid_to_log_id', this._notif_uid_to_log_id);
    return res;
  }

  /*
   * cancelLogs:
   *   strikes all log messages related to the given array of notif ids
   */
  checkLogCancel(notifId: string) {
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
      if (this._notif_uid_to_mobile_log_id.hasOwnProperty(uid)) {
        let mobileLogId = this._notif_uid_to_mobile_log_id[uid];
        if ($("dockedlog_" + mobileLogId))
          dojo.addClass("dockedlog_" + mobileLogId, "cancel");
      }
    });
  }

  // addLogClass() {
  //   if (this._last_notif == null) return;

  //   let notif = this._last_notif;
  //   if ($("log_" + notif.logId)) {
  //     let type = notif.msg.type;
  //     if (type == "history_history") type = notif.msg.args.originalType;

  //     dojo.addClass("log_" + notif.logId, "notif_" + type);
  //   }
  // }
  addLogClass() {
    if (this._last_notif == null) {
      return;
    }

    let notif = this._last_notif;
    let type = notif.msg.type;
    if (type == "history_history") {
      type = notif.msg.args.originalType;
    }

    if ($("log_" + notif.logId)) {
      dojo.addClass("log_" + notif.logId, "notif_" + type);

      var methodName =
        "onAdding" + type.charAt(0).toUpperCase() + type.slice(1) + "ToLog";
      this[methodName]?.(notif);
    }
    if ($("dockedlog_" + notif.mobileLogId)) {
      dojo.addClass("dockedlog_" + notif.mobileLogId, "notif_" + type);
    }

    while (this.tooltipsToMap.length) {
      const tooltipToMap = this.tooltipsToMap.pop();
      if (!tooltipToMap || !tooltipToMap[1]) {
        console.error("error tooltipToMap", tooltipToMap);
      } else {
        this.addLogTooltip({
          tooltipId: tooltipToMap[0],
          cardId: tooltipToMap[1],
        });
      }
    }
  }

  // cardId will be PRENXXXX for tableau cards and full id for empire card / victory card
  addLogTooltip({ tooltipId, cardId }: { tooltipId: number; cardId: string }) {
    if (cardId.startsWith("EmpireSquare")) {
      const empireCard = this.gamedatas.empireSquares.find(
        (square) => square.id === cardId
      );
      if (empireCard) {
        this.tooltipManager.addEmpireCardTooltip({
          nodeId: `pr_tooltip_${tooltipId}`,
          card: empireCard,
        });
      }
    } else if (cardId.startsWith("Victory")) {
      const card = this.gamedatas.victoryCards.find(
        (card) => cardId === card.id
      );
      if (card) {
        this.tooltipManager.addVictoryCardTooltip({
          nodeId: `pr_tooltip_${tooltipId}`,
          card,
        });
      }
    } else {
      const card = this.gamedatas.staticData.tableauCards[cardId];
      if (card) {
        this.tooltipManager.addCardTooltip({
          nodeId: `pr_tooltip_${tooltipId}`,
          card,
        });
      }
    }
  }

  updateLogTooltips() {
    // console.log("tooltipsToMap", this.tooltipsToMap);
    // TODO: check how to update this. For now needs refresh
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
    this.updateLayout();
    // this.inherited(arguments);
  }

  /* @Override */
  updatePlayerOrdering() {
    this.framework().inherited(arguments);

    const container = document.getElementById("player_boards");
    const infoPanel = document.getElementById("pr_info_panel");
    if (!container) {
      return;
    }
    container.insertAdjacentElement("afterbegin", infoPanel);
  }

  setAlwaysFixTopActions(alwaysFixed = true, maximum = 30) {
    this.alwaysFixTopActions = alwaysFixed;
    this.alwaysFixTopActionsMaximum = maximum;
    this.adaptStatusBar();
  }

  adaptStatusBar() {
    (this as any).inherited(arguments);

    if (this.alwaysFixTopActions) {
      const afterTitleElem = document.getElementById("after-page-title");
      const titleElem = document.getElementById("page-title");
      let zoom = (getComputedStyle(titleElem) as any).zoom;
      if (!zoom) {
        zoom = 1;
      }

      const titleRect = afterTitleElem.getBoundingClientRect();
      if (
        titleRect.top < 0 &&
        titleElem.offsetHeight <
          (window.innerHeight * this.alwaysFixTopActionsMaximum) / 100
      ) {
        const afterTitleRect = afterTitleElem.getBoundingClientRect();
        titleElem.classList.add("fixed-page-title");
        titleElem.style.width = (afterTitleRect.width - 10) / zoom + "px";
        afterTitleElem.style.height = titleRect.height + "px";
      } else {
        titleElem.classList.remove("fixed-page-title");
        titleElem.style.width = "auto";
        afterTitleElem.style.height = "0px";
      }
    }
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
