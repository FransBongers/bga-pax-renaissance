class Settings {
  protected game: PaxRenaissanceGame;

  private modal: Modal;
  public settings: Record<string, string>;

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

  private setupValues({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    const config = getSettingsConfig();
    this.settings = {};

    Object.values(config).forEach(({ id, defaultValue }) => {
      const localValue = localStorage.getItem(this.getLocalStorageKey({ id }));
      this.settings[id] = localValue || defaultValue;

      if (localValue && this.getMethodName({ id })) {
        this[this.getMethodName({ id })](localValue);
      }
    });
  }

  private setupModal({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    this.modal = new Modal(`settings_modal`, {
      class: "pr_settings_modal",
      closeIcon: "fa-times",
      openAnimation: true,
      openAnimationTarget: "pr_show_settings",
      titleTpl:
        '<h2 id="popin_${id}_title" class="${class}_title">${title}</h2>',
      title: _("Settings"),
      contents: tplSettingsModalContent(),
      closeAction: "hide",
      verticalAlign: "flex-start",
      breakpoint: 510,
    });
  }

  private setupModalContent({
    gamedatas,
  }: {
    gamedatas: PaxRenaissanceGamedatas;
  }) {
    const config = getSettingsConfig();
    const node = document.getElementById("setting_modal_content");
    if (!node) {
      return;
    }
    Object.values(config).forEach((setting) => {
      node.insertAdjacentHTML(
        "beforeend",
        tplPlayerPrefenceRow({
          setting,
          currentValue: this.settings[setting.id],
        })
      );
      const controlId = `preference_control_${setting.id}`;
      $(controlId).addEventListener("change", () => {
        const value = $(controlId).value;
        this.changeSetting({ id: setting.id, value });
      });
    });
  }

  // Setup functions
  setup({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    this.setupValues({ gamedatas });
    this.addButton({ gamedatas });
    this.setupModal({ gamedatas });

    this.setupModalContent({ gamedatas });
    // $("preference_control_backgroundImage").addEventListener("change", () => {
    //   let newValue = $("preference_control_backgroundImage").value;
    //   // const element = document.getElementsByTagName("html");

    //   this.changeSetting({ id: "backgroundImage", value: newValue });
    // });

    dojo.connect($(`pr_show_settings`), "onclick", () => this.open());
    // dojo.connect($(`cards_${this.playerId}`), 'onclick', () => this.updateModalContentAndOpen());
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

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private getMethodName({ id }: { id: string }) {
    return `onChange${this.getSuffix({ id })}Setting`;
  }

  public getSetting({ id }: { id: string }): string | null {
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
