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

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
    this.zoomLevel =
      Number(localStorage.getItem(LOCAL_STORAGE_MAP_ZOOM_KEY)) || 1;
    console.log("localStorage zoomLevel", this.zoomLevel);
    const gamedatas = game.gamedatas;

    this.setupGameMap({ gamedatas });
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  setupChessPiecesBorders({ gamedatas }) {
    BORDERS.forEach((border) => {
      const chessPiece = gamedatas.chessPieces.inPlay.find(
        (piece) => piece.location === border
      );

      if (!chessPiece) {
        return;
      }

      const node = document.getElementById(`pr_${border}`);
      if (!node) {
        return;
      }

      const type = chessPiece.id.split("_")[0];
      const bankOrReligion = chessPiece.id.split("_")[1];

      node.insertAdjacentHTML(
        "beforeend",
        type === PAWN
          ? tplPawn({
              id: chessPiece.id,
              type,
              bank: bankOrReligion,
            })
          : tplChessPiece({ id: chessPiece.id, type, religion: bankOrReligion })
      );
    });
  }

  setupChessPiecesCities({
    gamedatas,
  }: {
    gamedatas: PaxRenaissanceGamedatas;
  }) {
    CITIES.forEach((city) => {
      const chessPiece = gamedatas.chessPieces.inPlay.find(
        (piece) => piece.location === city
      );
      if (!chessPiece) {
        return;
      }
      const node = document.getElementById(`pr_city_${city}`);
      if (!node) {
        return;
      }
      const type = chessPiece.id.split("_")[0];
      const colorOrReligion = chessPiece.id.split("_")[1];
      node.insertAdjacentHTML(
        "beforeend",
        tplChessPiece({
          id: chessPiece.id,
          type,
          color: [PAWN, DISK].includes(type) ? colorOrReligion : undefined,
          religion: [PAWN, DISK].includes(type) ? undefined : colorOrReligion,
        })
      );
    });
  }

  setupEmpireCards({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {
    gamedatas.gameMap.forEach((card) => {
      const { id, location } = card;
      const node = document.getElementById(`pr_${location}`);
      if (!node) {
        debug("Unable to get empire card node");
      }
      node.setAttribute("data-card-id", `${id}_king`);
    });
  }

  updateGameMap({ gamedatas }: { gamedatas: PaxRenaissanceGamedatas }) {}

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
    this.setupChessPiecesCities({ gamedatas });
    this.setupChessPiecesBorders({ gamedatas });
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

  clearInterface() {}

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
    // map.style.setProperty("--paxRenChessPieceScale", `${mapScale}`);

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
