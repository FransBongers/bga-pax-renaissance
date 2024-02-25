// ..######......###....##.....##.########....##.....##....###....########.
// .##....##....##.##...###...###.##..........###...###...##.##...##.....##
// .##.........##...##..####.####.##..........####.####..##...##..##.....##
// .##...####.##.....##.##.###.##.######......##.###.##.##.....##.########.
// .##....##..#########.##.....##.##..........##.....##.#########.##.......
// .##....##..##.....##.##.....##.##..........##.....##.##.....##.##.......
// ..######...##.....##.##.....##.########....##.....##.##.....##.##.......

const LOCAL_STORAGE_MAP_ZOOM_KEY = "PaxRenaissance-map-zoom";
const ZOOM_LEVELS = [0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];
const MAX_MAP_HEIGHT = 1500;
const MAX_MAP_WIDTH = 1500;

class GameMap {
  protected game: PaxRenaissanceGame;
  private zoomLevel: number;
  public supremeReligion: Record<
    Religion,
    { bishops: Counter; tokens: Counter }
  > = {
    [CATHOLIC]: {
      bishops: new ebg.counter(),
      tokens: new ebg.counter(),
    },
    [ISLAMIC]: {
      bishops: new ebg.counter(),
      tokens: new ebg.counter(),
    },
    [REFORMIST]: {
      bishops: new ebg.counter(),
      tokens: new ebg.counter(),
    },
  };

  private empireSquareStocks: {
    [ARAGON]: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [BYZANTIUM]: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [ENGLAND]: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [FRANCE]: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [HOLY_ROMAN_EMIRE]: LineStock<
      EmpireCard | TableauCard | EmpireCardContainer
    >;
    [HUNGARY]: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [MAMLUK]: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [OTTOMAN]: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [PAPAL_STATES]: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
    [PORTUGAL]: LineStock<EmpireCard | TableauCard | EmpireCardContainer>;
  };

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
    // this.zoomLevel =
    //   Number(localStorage.getItem(LOCAL_STORAGE_MAP_ZOOM_KEY)) || 1;
    // console.log("localStorage zoomLevel", this.zoomLevel);
    const gamedatas = game.gamedatas;

    this.setupGameMap({ gamedatas });
  }

  // .##.....##.##....##.########...#######.
  // .##.....##.###...##.##.....##.##.....##
  // .##.....##.####..##.##.....##.##.....##
  // .##.....##.##.##.##.##.....##.##.....##
  // .##.....##.##..####.##.....##.##.....##
  // .##.....##.##...###.##.....##.##.....##
  // ..#######..##....##.########...#######.

  clearInterface() {
    [...BORDERS, ...CITIES].forEach((location) => {
      const node = document.getElementById(`pr_${location}`);
      if (!node) {
        return;
      }
      node.replaceChildren();
    });

    Object.keys(this.empireSquareStocks).forEach((stockId) => {
      this.empireSquareStocks[stockId].removeAll();
    });
    Object.values(THRONES_CONFIG).forEach(({ empireSquareId }) => {
      const node = document.getElementById(`${empireSquareId}_throne_tokens`);
      if (!node) {
        return;
      }
      node.replaceChildren();
    });
  }

  updateInterface({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    this.setupTokensBorders({ gamedatas });
    this.setupTokensCities({ gamedatas });
    this.updateEmpireCards({ gamedatas });
    this.setupMapCards({ gamedatas });
    this.updateSupremeReligionCounters({ gamedatas });
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  setupSupremeReligionCounters({
    gamedatas,
  }: {
    gamedatas: PaxRenaissanceGamedatas;
  }) {
    const religionArgs = {
      [CATHOLIC]: {
        religion: _("Catholic"),
      },
      [ISLAMIC]: {
        religion: _("Islamic"),
      },
      [REFORMIST]: {
        religion: _("Reformist"),
      },
    };

    RELIGIONS.forEach((religion) => {
      // Bishops in play
      this.supremeReligion[religion].bishops.create(
        `pr_supreme_religion_bishop_counter_${religion}`
      );
      this.game.tooltipManager.addIconTooltip({
        nodeId: `pr_supreme_religion_bishop_counter_container_${religion}`,
        iconHtml: tplToken({
          type: BISHOP,
          separator: religion,
          style: "--paxRenTokenScale: 0.8;",
        }),
        text: this.game.format_string_recursive(
          _("The number of ${religion} Bishop Tokens in play for Holy Victory."),
          religionArgs[religion]
        ),
        title: this.game.format_string_recursive(
          _("${religion} Bishop Tokens"),
          religionArgs[religion]
        ),
      });

      // Tokens in theocracies
      this.supremeReligion[religion].tokens.create(
        `pr_tokens_theocracies_counter_${religion}`
      );
      this.game.tooltipManager.addIconTooltip({
        nodeId: `pr_supreme_religion_token_counter_${religion}`,
        iconHtml: tplTokensInTheocraciesIcon({ religion }),
        text: this.game.format_string_recursive(
          _(
            "The number of ${religion} Tokens in play in ${religion} Theocracies for Holy Victory."
          ),
          religionArgs[religion]
        ),
        title: this.game.format_string_recursive(
          _("${religion} Tokens"),
          religionArgs[religion]
        ),
      });
    });
    this.updateSupremeReligionCounters({ gamedatas });
  }

  setupMapCards({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    gamedatas.gameMap.empires.forEach((empire) =>
      this.setEmpireReligion({ empireId: empire.id, religion: empire.religion })
    );
    this.setAgeOfReformationPromoAttributes(
      gamedatas.gameOptions.ageOfReformationPromo
    );
    this.setVenice2Visibility(gamedatas.gameMap.condottiereActive);
  }

  setupTokensBorders({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    BORDERS.forEach((border) => {
      const tokens = gamedatas.tokens.inPlay.filter(
        (piece) => piece.location === border
      );

      const node = document.getElementById(`pr_${border}`);
      if (!node) {
        return;
      }

      tokens.forEach((token) => {
        node.insertAdjacentHTML("beforeend", tplToken(token));
      });
    });
  }

  setupTokensCities({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    CITIES.forEach((city) => {
      const token = gamedatas.tokens.inPlay.find(
        (piece) => piece.location === city
      );
      if (!token) {
        return;
      }
      const node = document.getElementById(`pr_${city}`);
      if (!node) {
        return;
      }

      node.insertAdjacentHTML("beforeend", tplToken(token));
    });
  }

  setupEmpireCards({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    this.empireSquareStocks = {
      [ARAGON]: new LineStock<EmpireCard | TableauCard | EmpireCardContainer>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${ARAGON}_throne`),
        { direction: "column", center: false }
      ),
      [BYZANTIUM]: new LineStock<
        EmpireCard | TableauCard | EmpireCardContainer
      >(
        this.game.tableauCardManager,
        document.getElementById(`pr_${BYZANTIUM}_throne`),
        { direction: "column", center: false }
      ),
      [ENGLAND]: new LineStock<EmpireCard | TableauCard | EmpireCardContainer>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${ENGLAND}_throne`),
        { direction: "column", center: false }
      ),
      [FRANCE]: new LineStock<EmpireCard | TableauCard | EmpireCardContainer>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${FRANCE}_throne`),
        { direction: "column", center: false }
      ),
      [HOLY_ROMAN_EMIRE]: new LineStock<
        EmpireCard | TableauCard | EmpireCardContainer
      >(
        this.game.tableauCardManager,
        document.getElementById(`pr_${HOLY_ROMAN_EMIRE}_throne`),
        { direction: "column", center: false }
      ),
      [HUNGARY]: new LineStock<EmpireCard | TableauCard | EmpireCardContainer>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${HUNGARY}_throne`),
        { direction: "column", center: false }
      ),
      [MAMLUK]: new LineStock<EmpireCard | TableauCard | EmpireCardContainer>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${MAMLUK}_throne`),
        { direction: "column", center: false }
      ),
      [OTTOMAN]: new LineStock<EmpireCard | TableauCard | EmpireCardContainer>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${OTTOMAN}_throne`),
        { direction: "column", center: false }
      ),
      [PAPAL_STATES]: new LineStock<
        EmpireCard | TableauCard | EmpireCardContainer
      >(
        this.game.tableauCardManager,
        document.getElementById(`pr_${PAPAL_STATES}_throne`),
        { direction: "column", center: false }
      ),
      [PORTUGAL]: new LineStock<EmpireCard | TableauCard | EmpireCardContainer>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${PORTUGAL}_throne`),
        { direction: "column", center: false }
      ),
    };

    this.updateEmpireCards({ gamedatas });
  }

  updateEmpireCards({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    gamedatas.gameMap.thrones.cards
      .filter((card) => !card.isQueen)
      .forEach((card) => {
        const empire = card.location.split("_")[1];

        if (this.empireSquareStocks[empire]) {
          const container: EmpireCardContainer = {
            type: EMPIRE_CARD_CONTAINER,
            id: `${empire}_container`,
            empireId: card.empire,
            card,
            state: card.state,
            location: card.location,
          };
          this.empireSquareStocks[empire].addCard(container);

          // Add tokens to queens
          card.queens.forEach((queen) => {
            const queenTokensNode = document.getElementById(
              `${queen.id}_tokens`
            );
            gamedatas.tokens.inPlay
              .filter((token) => token.location === queen.id)
              .forEach((token) => {
                queenTokensNode.insertAdjacentHTML(
                  "beforeend",
                  tplToken(token)
                );
              });
          });
        }
      });
    const repressTokensToThrones =
      this.game.settings.get({
        id: REPRESS_TOKENS_TO_THRONES,
      }) === ENABLED;

    gamedatas.gameMap.thrones.tokens.forEach((token) => {
      const { location } = token;
      const node =
        token.type === BISHOP || !repressTokensToThrones
          ? document.getElementById(`${location}_tokens`)
          : document.getElementById(`${location}_throne_tokens`);
      // const node = document.getElementById(`${location}_tokens`);
      if (!node) {
        return;
      }
      node.insertAdjacentHTML("beforeend", tplToken(token));
    });

    gamedatas.empireSquares.forEach((card) => {
      this.updateCoatOfArms({ card });
    });
  }

  // Setup functions
  setupGameMap({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    document.getElementById("pr_play_area_container").insertAdjacentHTML(
      "afterbegin",
      tplGameMap({
        ageOfReformation: this.game.gameOptions.ageOfReformationPromo,
      })
    );
    this.game.tooltipManager.setupDrawDeckTooltips();
      

    // Add in main file?
    this.setupEmpireCards({ gamedatas });
    this.setupTokensCities({ gamedatas });
    this.setupTokensBorders({ gamedatas });
    this.setupMapCards({ gamedatas });
    this.setupSupremeReligionCounters({ gamedatas });


  }

  updateSupremeReligionCounters({
    gamedatas,
  }: {
    gamedatas: PaxRenaissanceGamedatas;
  }) {
    RELIGIONS.forEach((religion) => {
      this.supremeReligion[religion].bishops.setValue(
        gamedatas.supremeReligion.bishops[religion]
      );
      this.supremeReligion[religion].tokens.setValue(
        gamedatas.supremeReligion.tokens[religion]
      );
    });
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

  // private getCurrentZoomIndex(): number {
  //   console.log("zoomLevel", this.zoomLevel);
  //   return ZOOM_LEVELS.indexOf(
  //     Number(localStorage.getItem(LOCAL_STORAGE_MAP_ZOOM_KEY)) || 1
  //   );
  // }

  public getEmpireSquareStock({
    empireId,
  }: {
    empireId: string;
  }): LineStock<EmpireCard | TableauCard | EmpireCardContainer> {
    return this.empireSquareStocks[empireId];
  }

  public setEmpireReligion({
    empireId,
    religion,
  }: {
    empireId: string;
    religion: string;
  }) {
    const node = document.getElementById(`pr_${empireId}`);
    if (!node) {
      return;
    }
    // if (
    //   (empireId === PAPAL_STATES && religion === CATHOLIC) ||
    //   (empireId === MAMLUK && religion === ISLAMIC)
    // ) {
    //   node.setAttribute("data-card-id", `medieval_${empireId}`);
    // } else {
    node.setAttribute("data-card-id", `${religion}_${empireId}`);
    // }
  }

  private setAgeOfReformationPromoAttributes(active) {
    if (!active) {
      return;
    }
    [HUNGARY, OTTOMAN].forEach((empire) => {
      const node = document.getElementById(`pr_${empire}`);
      if (!node) {
        return;
      }
      node.setAttribute("data-map-type", "ageOfReformation");
    });
  }

  public setVenice2Visibility(visible = true) {
    const venice2Node = document.getElementById("venice2_overlay");
    if (!venice2Node) {
      return;
    }
    if (visible) {
      venice2Node.style.opacity = "1";
    } else {
      venice2Node.style.opacity = "0";
    }
  }

  public updateCoatOfArms({ card }: { card: EmpireCard }) {
    const coatOfArmsNode = document.getElementById(
      `pr_${card.empire}_coat_of_arms`
    );
    if (!coatOfArmsNode) {
      return;
    }
    coatOfArmsNode.setAttribute("data-side", card.side);
    coatOfArmsNode.setAttribute(
      "data-owner",
      card.owningBank === null ? "none" : card.owningBank
    );
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...
}
