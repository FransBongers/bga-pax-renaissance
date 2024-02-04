class InformationModal {
  protected game: PaxRenaissanceGame;

  private modal: Modal;

  private selectedTab: TabId = 'battleTable';
  private tabs = {
    battleTable: {
      text: _('Battle Table')
    },
    operations: {
      text: _('Operations')
    },
    oneShots: {
      text: _('One-Shots')
    },
    // gameTerms: {
    //   text: _('Game Terms')
    // },
    // mapCards: {
    //   text: _('Map Cards')
    // },
  }

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
      configPanel.insertAdjacentHTML("beforeend", tplInformationButton());
    }
  }

  private setupModal({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    this.modal = new Modal(`information_modal`, {
      class: "pr_information_modal",
      closeIcon: "fa-times",
      // titleTpl:
      //   '<h2 id="popin_${id}_title" class="${class}_title">${title}</h2>',
      // title: _("Info"),
      contents: tplInformationModalContent({tabs: this.tabs}),
      closeAction: "hide",
      verticalAlign: "flex-start",
      breakpoint: 740,
    });
  }

  // Setup functions
  setup({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    this.addButton({ gamedatas });
    this.setupModal({ gamedatas });
    this.informationModalContent();
    this.changeTab({id: this.selectedTab});
    Object.keys(this.tabs).forEach((id: TabId) => {
      dojo.connect($(`pr_information_modal_tab_${id}`), "onclick", () => this.changeTab({id}));
    });

    dojo.connect($(`pr_information_button`), "onclick", () => this.modal.show());
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

  private informationModalContent() {

  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private changeTab({id}: {id: TabId;}) {
    const currentTab = document.getElementById(`pr_information_modal_tab_${this.selectedTab}`);
    const currentTabContent = document.getElementById(`pr_${this.selectedTab}`);
    currentTab.removeAttribute('data-state');
    if (currentTabContent) {
      currentTabContent.style.display = 'none';
    }

    this.selectedTab = id;
    const tab = document.getElementById(`pr_information_modal_tab_${id}`);
    const tabContent = document.getElementById(`pr_${this.selectedTab}`);
    tab.setAttribute('data-state','selected');
    if (tabContent) {
      tabContent.style.display = '';
    }
  }
}
