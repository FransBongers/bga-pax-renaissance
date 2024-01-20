class Settings {
  protected game: PaxRenaissanceGame;

  private modal: Modal;
  public settings: Record<string, string | number> = {};

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
      contents: tplSettingsModalContent(),
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

    dojo.connect($(`pr_show_settings`), "onclick", () => this.open());
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

    Object.values(config).forEach((setting) => {
      const { id, type, defaultValue, visibleCondition } = setting;

      // Set current value (local storage value or default)
      const localValue = localStorage.getItem(this.getLocalStorageKey({ id }));
      this.settings[id] = localValue || defaultValue;

      // Call change method to update interface based on current value
      const methodName = this.getMethodName({ id });
      if (localValue && this[methodName]) {
        this[methodName](localValue);
      }

      // Add content to modal
      if (setting.type === "select") {
        node.insertAdjacentHTML(
          "beforeend",
          tplPlayerPrefenceSelectRow({
            setting,
            currentValue: this.settings[setting.id] as string,
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

        node.insertAdjacentHTML(
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
    const node = document.getElementById('pr_play_area_container');
    if (node) {
      node.setAttribute('data-two-columns',value);
    }
    this.game.updateLayout();
    // document.documentElement.setAttribute("data-background-pref", value);
  }

  public onChangeColumnSizesSetting(value: string) {
    this.game.updateLayout();
  }

  public onChangeCardSizeInTableauSetting(value: number) {
    const node = document.getElementById('pr_player_tableaux');
    if (node) {
      node.style.setProperty('--paxRenCardInTableauScale', `${Number(value) / 100}`);
    }
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private checkColumnSizesVisisble() {
    const sliderNode = document.getElementById("setting_row_columnSizes");
    if (!sliderNode) {
      return;
    }
    if (this.settings["twoColumnsLayout"] === SETTING_ENABLED) {
      sliderNode.style.display = "";
    } else {
      sliderNode.style.display = "none";
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
