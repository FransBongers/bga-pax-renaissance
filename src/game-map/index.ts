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

  private empireSquareStocks: {
    [ARAGON]: LineStock<EmpireCard | TableauCard>;
    [BYZANTIUM]: LineStock<EmpireCard | TableauCard>;
    [ENGLAND]: LineStock<EmpireCard | TableauCard>;
    [FRANCE]: LineStock<EmpireCard | TableauCard>;
    [HOLY_ROMAN_EMIRE]: LineStock<EmpireCard | TableauCard>;
    [HUNGARY]: LineStock<EmpireCard | TableauCard>;
    [MAMLUK]: LineStock<EmpireCard | TableauCard>;
    [OTTOMAN]: LineStock<EmpireCard | TableauCard>;
    [PAPAL_STATES]: LineStock<EmpireCard | TableauCard>;
    [PORTUGAL]: LineStock<EmpireCard | TableauCard>;
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
  }

  updateInterface({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    this.setupTokensBorders({ gamedatas });
    this.setupTokensCities({ gamedatas });
    this.updateEmpireCards({ gamedatas });
    this.setupMapCards({ gamedatas });
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  setupMapCards({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    gamedatas.gameMap.empires.forEach((empire) =>
      this.setEmpireReligion({ empireId: empire.id, religion: empire.religion })
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
      [ARAGON]: new LineStock<EmpireCard | TableauCard>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${ARAGON}_throne`),
        { direction: "column", center: false }
      ),
      [BYZANTIUM]: new LineStock<EmpireCard | TableauCard>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${BYZANTIUM}_throne`),
        { direction: "column", center: false }
      ),
      [ENGLAND]: new LineStock<EmpireCard | TableauCard>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${ENGLAND}_throne`),
        { direction: "column", center: false }
      ),
      [FRANCE]: new LineStock<EmpireCard | TableauCard>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${FRANCE}_throne`),
        { direction: "column", center: false }
      ),
      [HOLY_ROMAN_EMIRE]: new LineStock<EmpireCard | TableauCard>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${HOLY_ROMAN_EMIRE}_throne`),
        { direction: "column", center: false }
      ),
      [HUNGARY]: new LineStock<EmpireCard | TableauCard>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${HUNGARY}_throne`),
        { direction: "column", center: false }
      ),
      [MAMLUK]: new LineStock<EmpireCard | TableauCard>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${MAMLUK}_throne`),
        { direction: "column", center: false }
      ),
      [OTTOMAN]: new LineStock<EmpireCard | TableauCard>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${OTTOMAN}_throne`),
        { direction: "column", center: false }
      ),
      [PAPAL_STATES]: new LineStock<EmpireCard | TableauCard>(
        this.game.tableauCardManager,
        document.getElementById(`pr_${PAPAL_STATES}_throne`),
        { direction: "column", center: false }
      ),
      [PORTUGAL]: new LineStock<EmpireCard | TableauCard>(
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
          this.empireSquareStocks[empire].addCard(card);
        }
        card.queens.forEach((queen) => {
          const queenTokensNode = document.getElementById(`${queen.id}_tokens`);
          gamedatas.tokens.inPlay
            .filter((token) => token.location === queen.id)
            .forEach((token) => {
              queenTokensNode.insertAdjacentHTML("beforeend", tplToken(token));
            });
        });
        // const { id, location } = card;
        // const node = document.getElementById(`pr_${location}`);
        // if (!node) {
        //   debug("Unable to get empire card node");
        // }
        // node.setAttribute("data-card-id", `${id}_king`);
      });
    gamedatas.gameMap.thrones.tokens.forEach((token) => {
      const { location } = token;
      const node = document.getElementById(`${location}_tokens`);
      if (!node) {
        return;
      }

      node.insertAdjacentHTML("beforeend", tplToken(token));
    });

    gamedatas.empireSquares.forEach((card) => {
      this.updateCoatOfArms({card});
    });
  }

  // Setup functions
  setupGameMap({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    document
      .getElementById("pr_play_area_container")
      .insertAdjacentHTML("afterbegin", tplGameMap());
    // Add in main file?
    this.setupEmpireCards({ gamedatas });
    this.setupTokensCities({ gamedatas });
    this.setupTokensBorders({ gamedatas });
    this.setupMapCards({ gamedatas });
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
  }): LineStock<EmpireCard | TableauCard> {
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

  public updateCoatOfArms({card}: {card: EmpireCard})
  {
    const coatOfArmsNode = document.getElementById(`pr_${card.empire}_coat_of_arms`);
    if (!coatOfArmsNode) {
      return;
    }
    coatOfArmsNode.setAttribute('data-side', card.side);
    coatOfArmsNode.setAttribute('data-owner', card.owningBank === null ? 'none' : card.owningBank);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...


}
