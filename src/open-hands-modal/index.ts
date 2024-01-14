class OpenHandsModal {
  protected game: PaxRenaissanceGame;
  private enabled: boolean;

  private modal: Modal;
  private handCardData: Record<
    number,
    {
      playerName: string;
      cards: TableauCard[];
    }
  >;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
    const gamedatas = game.gamedatas;

    this.enabled = gamedatas.gameOptions.openHands;
    this.handCardData = {};
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

  updateInterface({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    if (!this.enabled) {
      return;
    }
    Object.entries(gamedatas.players).forEach(([playerId, playerData]) => {
      this.handCardData[playerId] = {
        playerName: playerData.name,
        cards: playerData.hand.cards,
      };
    });
    if (this.modal.isDisplayed()) {
      this.updateModalContent();
    }
  }

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
      configPanel.insertAdjacentHTML("beforeend", tplOpenHandsButton());
    }
  }

  private setupModal({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    this.modal = new Modal(`open_hand_modal`, {
      class: "pr_open_hands_modal",
      closeIcon: "fa-times",
      openAnimation: true,
      openAnimationTarget: `pr_open_hands_button`,
      // titleTpl: '<h2 id="popin_${id}_title" class="${class}_title">${title}</h2>',
      // title: _('Player hands'),
      // contents: tplOpenHandsModal({
      //   cards: this.handCards,
      // }),
      contents: tplOpenHandsModal({
        data: Object.values(this.handCardData),
        game: this.game,
      }),
      closeAction: "hide",
      verticalAlign: "flex-start",
      breakpoint: 510,
    });
  }

  // Setup functions
  setup({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    if (!this.enabled) {
      return;
    }
    Object.entries(gamedatas.players).forEach(([playerId, playerData]) => {
      this.handCardData[playerId] = {
        playerName: playerData.name,
        cards: playerData.hand.cards,
      };
    });

    this.addButton({ gamedatas });
    this.setupModal({ gamedatas });

    dojo.connect($(`pr_open_hands_button`), "onclick", () => this.open());
    // dojo.connect($(`cards_${this.playerId}`), 'onclick', () => this.updateModalContentAndOpen());
  }

  // ..######...########.########.########.########.########...######.
  // .##....##..##..........##.......##....##.......##.....##.##....##
  // .##........##..........##.......##....##.......##.....##.##......
  // .##...####.######......##.......##....######...########...######.
  // .##....##..##..........##.......##....##.......##...##.........##
  // .##....##..##..........##.......##....##.......##....##..##....##
  // ..######...########....##.......##....########.##.....##..######.

  // ..######..########.########.########.########.########...######.
  // .##....##.##..........##.......##....##.......##.....##.##....##
  // .##.......##..........##.......##....##.......##.....##.##......
  // ..######..######......##.......##....######...########...######.
  // .......##.##..........##.......##....##.......##...##.........##
  // .##....##.##..........##.......##....##.......##....##..##....##
  // ..######..########....##.......##....########.##.....##..######.

  public addCard({ card, playerId }: { playerId: number; card: TableauCard }) {
    if (!this.enabled) {
      return;
    }
    this.handCardData[playerId].cards.push(card);
    if (this.modal.isDisplayed()) {
      this.updateModalContent();
    }
  }

  public removeCard({
    card: cardToRemove,
    playerId,
  }: {
    playerId: number;
    card: TableauCard;
  }) {
    if (!this.enabled) {
      return;
    }
    this.handCardData[playerId].cards = this.handCardData[
      playerId
    ].cards.filter((card) => card.id !== cardToRemove.id);
    if (this.modal.isDisplayed()) {
      this.updateModalContent();
    }
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  public open() {
    this.updateModalContent();
    this.modal.show();
  }

  updateModalContent() {
    // debug('update modal content');
    this.modal.updateContent(
      tplOpenHandsModal({
        data: Object.values(this.handCardData),
        game: this.game,
      })
    );
    Object.entries(this.handCardData).forEach(([playerId, { cards }]) => {
      cards.forEach((card) =>
        this.game.tooltipManager.addCardTooltip({
          nodeId: `${card.id}-modal`,
          card,
        })
      );
    });
  }
}
