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
    this.zoomLevel =
      Number(localStorage.getItem(LOCAL_STORAGE_MAP_ZOOM_KEY)) || 1;
    console.log("localStorage zoomLevel", this.zoomLevel);
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
    [...BORDERS, ...CITIES].forEach((border) => {
      const node = document.getElementById(`pr_${border}`);
      if (!node) {
        return;
      }
      const children = node.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.remove();
      }
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
      const token = gamedatas.tokens.inPlay.find(
        (piece) => piece.location === border
      );

      if (!token) {
        return;
      }

      const node = document.getElementById(`pr_${border}`);
      if (!node) {
        return;
      }

      node.insertAdjacentHTML("beforeend", tplToken(token));
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
          gamedatas.tokens.inPlay.filter((token) => token.location === queen.id).forEach((token) => {
            queenTokensNode.insertAdjacentHTML("beforeend", tplToken(token));
          })
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
  }

  // Setup functions
  setupGameMap({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    document
      .getElementById("pr_play_area")
      .insertAdjacentHTML("afterbegin", tplGameMap());
    this.updateGameMapSize();
    // Add in main file?
    window.addEventListener("resize", () => {
      this.updateGameMapSize();
    });
    this.setupZoomButtons();
    this.setupEmpireCards({ gamedatas });
    this.setupTokensCities({ gamedatas });
    this.setupTokensBorders({ gamedatas });
    this.setupMapCards({ gamedatas });
  }

  setupZoomButtons() {
    dojo.connect($("pr_game_map_zoom_out_button"), "onclick", this, () =>
      this.zoom({ type: "out" })
    );
    dojo.connect($("pr_game_map_zoom_in_button"), "onclick", this, () =>
      this.zoom({ type: "in" })
    );
    this.checkZoomButtonClasses();
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

  private getCurrentZoomIndex(): number {
    console.log("zoomLevel", this.zoomLevel);
    return ZOOM_LEVELS.indexOf(
      Number(localStorage.getItem(LOCAL_STORAGE_MAP_ZOOM_KEY)) || 1
    );
  }

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
    const venice2Node = document.getElementById('venice2_overlay');
    if (!venice2Node) {
      return;
    }
    if (visible) {
      venice2Node.style.opacity = '1';
    } else {
      venice2Node.style.opacity = '0';
    }
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private checkZoomButtonClasses() {
    const zoomInButton: HTMLElement = $("pr_game_map_zoom_in_button");
    const zoomOutButton: HTMLElement = $("pr_game_map_zoom_out_button");

    zoomInButton.classList.remove(DISABLED);
    zoomOutButton.classList.remove(DISABLED);

    if (this.zoomLevel === ZOOM_LEVELS[0]) {
      zoomOutButton.classList.add(DISABLED);
    } else if (this.zoomLevel === ZOOM_LEVELS[ZOOM_LEVELS.length - 1]) {
      zoomInButton.classList.add(DISABLED);
    }
  }

  // public updatePlayAreaSize() {
  //   const playAreaContainer = document.getElementById("pr_play_area_container");
  //   this.playAreaScale = Math.min(
  //     1,
  //     playAreaContainer.offsetWidth / MIN_PLAY_AREA_WIDTH
  //   );
  //   const playArea = document.getElementById("pr_play_area");
  //   playArea.style.transform = `scale(${this.playAreaScale})`;
  //   const playAreaHeight = playArea.offsetHeight;
  //   playArea.style.width =
  //     playAreaContainer.offsetWidth / this.playAreaScale + "px";
  //   console.log("playAreaHeight", playAreaHeight);
  //   playAreaContainer.style.height = playAreaHeight * this.playAreaScale + "px";
  // }

  public updateGameMapSize() {
    const map = document.getElementById("pr_game_map");
    // const playAreaContainer = document.getElementById("pr_play_area_container");
    // const playAreaScale = Math.min(
    //   1,
    //   playAreaContainer.offsetWidth / MIN_PLAY_AREA_WIDTH
    // );
    // const mapScale = this.zoomLevel * playAreaScale;

    // map.style.setProperty("--paxRenMapScale", `${mapScale}`);
    // map.style.setProperty("--paxRenCardScale", `${mapScale}`);
    // map.style.setProperty("--paxRenTokenScale", `${mapScale}`);

    map.style.transform = `scale(${this.zoomLevel})`;
    const mapContainer = document.getElementById("pr_game_map_container");
    mapContainer.style.width = `${this.zoomLevel * MAX_MAP_WIDTH}px`;
    mapContainer.style.height = `${this.zoomLevel * MAX_MAP_HEIGHT + 56}px`;
  }

  private zoom({ type }: { type: "in" | "out" }) {
    const currentZoomIndex = this.getCurrentZoomIndex();
    if (type === "in" && currentZoomIndex !== ZOOM_LEVELS.length - 1) {
      this.zoomLevel = ZOOM_LEVELS[currentZoomIndex + 1];
    } else if (type === "out" && currentZoomIndex > 0) {
      this.zoomLevel = ZOOM_LEVELS[currentZoomIndex - 1];
    }
    this.updateGameMapSize();
    this.checkZoomButtonClasses();
    this.game.updatePlayAreaSize();
    localStorage.setItem(LOCAL_STORAGE_MAP_ZOOM_KEY, this.zoomLevel + "");
  }
}
