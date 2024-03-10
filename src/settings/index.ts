class Settings {
  protected game: PaxRenaissanceGame;

  private modal: Modal;
  public settings: Record<string, string | number> = {};

  private selectedTab: SettingsTabId = "layout";
  private tabs: { id: SettingsTabId; name: string }[] = [
    {
      id: "layout",
      name: _("Layout"),
    },
    {
      id: "tableau",
      name: _("Player Tableau"),
    },
    {
      id: "gameplay",
      name: _("Gameplay"),
    },
  ];

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
    const gamedatas = game.gamedatas;

    this.setup({ gamedatas });
  }

  // .##.....##.##....##.########...#######.
  // .##.....##.###...##.##.....##.##.....##
  // .##.....##.####..##.##.....##.##.....##
  // .##.....##.##.##.##.##.....##.##.....##
  // .##.....##.##..####.##.....##.##.....##
  // .##.....##.##...###.##.....##.##.....##
  // ..#######..##....##.########...#######.

  clearInterface() {}

  updateInterface({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {}

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  private addButton({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    const configPanel = document.getElementById("pr_info_panel");
    if (configPanel) {
      configPanel.insertAdjacentHTML("beforeend", tplSettingsButton());
    }
  }

  private setupModal({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    this.modal = new Modal(`settings_modal`, {
      class: "pr_settings_modal",
      closeIcon: "fa-times",
      titleTpl:
        '<h2 id="popin_${id}_title" class="${class}_title">${title}</h2>',
      title: _("Settings"),
      contents: tplSettingsModalContent({
        tabs: this.tabs,
      }),
      closeAction: "hide",
      verticalAlign: "flex-start",
      breakpoint: 740,
    });
  }

  // Setup functions
  setup({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    this.addButton({ gamedatas });
    this.setupModal({ gamedatas });
    this.setupModalContent();
    this.changeTab({ id: this.selectedTab });

    dojo.connect($(`pr_show_settings`), "onclick", () => this.open());
    this.tabs.forEach(({ id }) => {
      dojo.connect($(`pr_settings_modal_tab_${id}`), "onclick", () =>
        this.changeTab({ id })
      );
    });
  }

  // .##.....##.########..########.....###....########.########
  // .##.....##.##.....##.##.....##...##.##......##....##......
  // .##.....##.##.....##.##.....##..##...##.....##....##......
  // .##.....##.########..##.....##.##.....##....##....######..
  // .##.....##.##........##.....##.#########....##....##......
  // .##.....##.##........##.....##.##.....##....##....##......
  // ..#######..##........########..##.....##....##....########

  // ..######...#######..##....##.########.########.##....##.########
  // .##....##.##.....##.###...##....##....##.......###...##....##...
  // .##.......##.....##.####..##....##....##.......####..##....##...
  // .##.......##.....##.##.##.##....##....######...##.##.##....##...
  // .##.......##.....##.##..####....##....##.......##..####....##...
  // .##....##.##.....##.##...###....##....##.......##...###....##...
  // ..######...#######..##....##....##....########.##....##....##...

  private setupModalContent() {
    const config = getSettingsConfig();
    const node = document.getElementById("setting_modal_content");
    if (!node) {
      return;
    }

    Object.entries(config).forEach(([tabId, tabConfig]) => {
      node.insertAdjacentHTML(
        "beforeend",
        tplSettingsModalTabContent({ id: tabId })
      );

      const tabContentNode = document.getElementById(
        `pr_settings_modal_tab_content_${tabId}`
      );
      if (!tabContentNode) {
        return;
      }

      Object.values(tabConfig.config).forEach((setting) => {
        const { id, type, defaultValue, visibleCondition } = setting;

        // Set current value (local storage value or default)
        const localValue = localStorage.getItem(
          this.getLocalStorageKey({ id })
        );
        this.settings[id] = localValue || defaultValue;

        // Call change method to update interface based on current value
        const methodName = this.getMethodName({ id });
        if (setting.onChangeInSetup && localValue && this[methodName]) {
          this[methodName](localValue);
        }

        // Add content to modal
        if (setting.type === "select") {
          const visible =
            !visibleCondition ||
            (visibleCondition &&
              visibleCondition.values.includes(
                this.settings[visibleCondition.id]
              ));

          tabContentNode.insertAdjacentHTML(
            "beforeend",
            tplPlayerPrefenceSelectRow({
              setting,
              currentValue: this.settings[setting.id] as string,
              visible,
            })
          );
          const controlId = `setting_${setting.id}`;
          $(controlId).addEventListener("change", () => {
            const value = $(controlId).value;
            this.changeSetting({ id: setting.id, value });
          });
        } else if (setting.type === "slider") {
          const visible =
            !visibleCondition ||
            (visibleCondition &&
              visibleCondition.values.includes(
                this.settings[visibleCondition.id]
              ));

          tabContentNode.insertAdjacentHTML(
            "beforeend",
            tplPlayerPrefenceSliderRow({
              id: setting.id,
              label: setting.label,
              visible,
            })
          );
          const sliderConfig = {
            ...setting.sliderConfig,
            start: this.settings[setting.id],
          };

          noUiSlider.create($("setting_" + setting.id), sliderConfig);
          $("setting_" + setting.id).noUiSlider.on("slide", (arg) =>
            this.changeSetting({ id: setting.id, value: arg[0] as string })
          );
        }
      });
    });
  }

  // ..#######..##....##.....######..##.....##....###....##....##..######...########
  // .##.....##.###...##....##....##.##.....##...##.##...###...##.##....##..##......
  // .##.....##.####..##....##.......##.....##..##...##..####..##.##........##......
  // .##.....##.##.##.##....##.......#########.##.....##.##.##.##.##...####.######..
  // .##.....##.##..####....##.......##.....##.#########.##..####.##....##..##......
  // .##.....##.##...###....##....##.##.....##.##.....##.##...###.##....##..##......
  // ..#######..##....##.....######..##.....##.##.....##.##....##..######...########

  private changeSetting({ id, value }: { id: string; value: string }) {
    const suffix = this.getSuffix({ id });
    this.settings[id] = value;
    localStorage.setItem(this.getLocalStorageKey({ id }), value);
    const methodName = this.getMethodName({ id });

    if (this[methodName]) {
      this[methodName](value);
    }
  }

  public onChangeBackgroundImageSetting(value: string) {
    document.documentElement.setAttribute("data-background-pref", value);
  }

  public onChangeTwoColumnsLayoutSetting(value: string) {
    this.checkColumnSizesVisisble();
    const node = document.getElementById("pr_play_area_container");
    if (node) {
      node.setAttribute("data-two-columns", value);
    }
    this.game.updateLayout();
    // document.documentElement.setAttribute("data-background-pref", value);
  }

  public onChangeColumnSizesSetting(value: string) {
    this.game.updateLayout();
  }

  public onChangeCardSizeInLogSetting(value: number) {
    const ROOT = document.documentElement;
    ROOT.style.setProperty("--paxRenLogCardScale", `${Number(value) / 100}`);
  }

  public onChangeCardSizeInTableauSetting(value: number) {
    const node = document.getElementById("pr_player_tableaux");
    if (node) {
      node.style.setProperty(
        "--paxRenCardInTableauScale",
        `${Number(value) / 100}`
      );
    }
  }

  public async onChangeRepressTokensToThronesSetting(value: string) {
    const animations = [];
    Object.values(THRONES_CONFIG).forEach(({ empireSquareId }) => {
      const originNode =
        value === ENABLED
          ? document.getElementById(`${empireSquareId}_tokens`)
          : document.getElementById(`${empireSquareId}_throne_tokens`);
      const destinationNode =
        value === ENABLED
          ? document.getElementById(`${empireSquareId}_throne_tokens`)
          : document.getElementById(`${empireSquareId}_tokens`);
      if (!(originNode && destinationNode)) {
        return;
      }

      const ids = [];
      originNode.childNodes.forEach((element: HTMLElement) => {
        if (element.id.startsWith("bishop")) {
          return;
        }
        ids.push(element.id);
      });

      ids.forEach((id: string) => {
        const element = document.getElementById(id);
        animations.push(
          this.game.animationManager.attachWithAnimation(
            new BgaSlideAnimation({ element }),
            destinationNode
          )
        );
      });
    });
    await Promise.all(animations);
  }

  public onChangeCardsInTableauOverlapSetting(value: string) {
    this.checkEmpireSquaresOverlapVisible();
    const elements = document.getElementsByClassName(
      "pr_player_board_tableau_cards"
    );

    for (let i = 0; i < elements.length; i++) {
      const element = elements.item(i);
      element.setAttribute("data-overlap", value);
    }

    const containerElements = document.getElementsByClassName(
      "pr_player_tableau_cards_container"
    );

    for (let i = 0; i < containerElements.length; i++) {
      const element = containerElements.item(i);
      element.setAttribute("data-overlap", value);
    }
  }

  public onChangeOverlapEmpireSquaresSetting(value: string) {
    const elements = document.getElementsByClassName(
      "pr_player_board_tableau_cards"
    );

    for (let i = 0; i < elements.length; i++) {
      const element = elements.item(i);
      element.setAttribute("data-overlap-empire-squares", value);
    }
  }

  public onChangeAnimationSpeedSetting(value: number) {
    const duration = 2100 - value;
    debug("onChangeAnimationSpeedSetting", duration);
    this.game.animationManager.getSettings().duration = duration;
  }

  public onChangeShowAnimationsSetting(value: string) {
    if (value === ENABLED) {
      this.game.animationManager.getSettings().duration = Number(
        this.settings[PREF_ANIMATION_SPEED]
      );
    } else {
      this.game.animationManager.getSettings().duration = 0;
    }
    this.checkAnmimationSpeedVisisble();
  }

  public onChangeCardInfoInTooltipSetting(value: string) {
    this.game.market.updateMarketCardTooltips();
    this.game.playerManager.updateCardTooltips();
    this.game.tableauCardManager.updateCardTooltips();
    this.game.victoryCardManager.updateCardTooltips();
    this.game.updateLogTooltips();
  }

  public onChangeFlorinCardCountersTableauSetting(value: string) {
    const elements = document.getElementsByClassName("pr_player_tableau_title");

    for (let i = 0; i < elements.length; i++) {
      const element = elements.item(i);
      element.setAttribute("data-show-counters", value);
    }
  }

  public onChangeShowActionButtonsSetting(value: string) {
    if (this.game.gamedatas.gamestate.name === "playerAction") {
      this.game.activeStates.playerAction.updateInterfaceInitialStep();
    }
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private changeTab({ id }: { id: SettingsTabId }) {
    const currentTab = document.getElementById(
      `pr_settings_modal_tab_${this.selectedTab}`
    );
    const currentTabContent = document.getElementById(
      `pr_settings_modal_tab_content_${this.selectedTab}`
    );
    currentTab.removeAttribute("data-state");
    if (currentTabContent) {
      currentTabContent.style.display = "none";
    }

    this.selectedTab = id;
    const tab = document.getElementById(`pr_settings_modal_tab_${id}`);
    const tabContent = document.getElementById(
      `pr_settings_modal_tab_content_${this.selectedTab}`
    );
    tab.setAttribute("data-state", "selected");
    if (tabContent) {
      tabContent.style.display = "";
    }
  }

  private checkAnmimationSpeedVisisble() {
    const sliderNode = document.getElementById("setting_row_animationSpeed");
    if (!sliderNode) {
      return;
    }
    if (this.settings[PREF_SHOW_ANIMATIONS] === ENABLED) {
      sliderNode.style.display = "";
    } else {
      sliderNode.style.display = "none";
    }
  }

  private checkColumnSizesVisisble() {
    const sliderNode = document.getElementById("setting_row_columnSizes");
    if (!sliderNode) {
      return;
    }
    if (this.settings["twoColumnsLayout"] === ENABLED) {
      sliderNode.style.display = "";
    } else {
      sliderNode.style.display = "none";
    }
  }

  private checkEmpireSquaresOverlapVisible() {
    const node = document.getElementById(
      `setting_row_${OVERLAP_EMPIRE_SQUARES}`
    );
    if (!node) {
      return;
    }
    if (this.settings[CARDS_IN_TABLEAU_OVERLAP] === ENABLED) {
      node.style.display = "";
    } else {
      node.style.display = "none";
    }
  }

  private getMethodName({ id }: { id: string }) {
    return `onChange${this.getSuffix({ id })}Setting`;
  }

  public get({ id }: { id: string }): string | number | null {
    return this.settings[id] || null;
  }

  private getSuffix({ id }: { id: string }) {
    return id.charAt(0).toUpperCase() + id.slice(1);
  }

  private getLocalStorageKey({ id }: { id: string }) {
    return `${this.game.framework().game_name}-${this.getSuffix({ id })}`;
  }

  public open() {
    this.modal.show();
  }
}
