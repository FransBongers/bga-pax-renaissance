interface AddButtonProps {
  id: string;
  text: string;
  callback: () => void;
  extraClasses?: string;
}

interface AddActionButtonProps extends AddButtonProps {
  color?: "blue" | "gray" | "red" | "none";
}

interface PaxRenaissanceGame extends Game {
  addCancelButton: () => void;
  addConfirmButton: (props: { callback: Function | string }) => void;
  addDangerActionButton: (props: AddButtonProps) => void;
  addLogClass: () => void;
  addPrimaryActionButton: (props: AddButtonProps) => void;
  addPassButton: (props: { optionalAction: boolean; text?: string }) => void;
  addSecondaryActionButton: (props: AddButtonProps) => void;
  addSkipButton: (props: { callback: Function | string }) => void;
  addUndoButtons: (props: CommonArgs) => void;
  clearInterface: () => void;
  clearPossible: () => void;
  clientUpdatePageTitle: (props: {
    text: string;
    args: Record<string, unknown>;
    nonActivePlayers?: boolean;
  }) => void;
  format_string_recursive: (
    log: string,
    args: Record<string, unknown>
  ) => string;
  getPlayerId: () => number;
  setCardSelectable: (props: {
    id: string;
    callback: (event: PointerEvent) => void;
  }) => void;
  setCardSelected: (props: { id: string }) => void;
  setLocationSelectable: (props: {
    id: string;
    callback: (event: PointerEvent) => void;
  }) => void;
  setLocationSelected: (props: { id: string }) => void;
  setTokenSelectable: (props: {
    id: string;
    callback: (event: PointerEvent) => void;
  }) => void;
  setTokenSelected: (props: { id: string }) => void;
  takeAction: (props: {
    action: string;
    args?: Record<string, unknown>;
  }) => void;
  updateLayout: () => void;
  _connections: unknown[];
  animationManager: AnimationManager;
  // cardManager: CardManager<TableauCard>;
  gameMap: GameMap;
  gameOptions: PaxRenaissanceGamedatas["gameOptions"];
  hand: Hand;
  market: Market;
  notificationManager: NotificationManager;
  openHandsModal: OpenHandsModal;
  playAreaScale: number;
  playerManager: PlayerManager;
  playerOrder: number[];
  settings: Settings;
  supply: Supply;
  tooltipManager: TooltipManager;
  _last_tooltip_id: number;
  tooltipsToMap: [tooltipId: number, card_id: string][];
  tableauCardManager: TableauCardManager;
  victoryCardManager: VictoryCardManager;
}

interface Border {
  id: string;
  name: string;
  type: "border";
  adjacentEmpires: Empire[];
}

interface City {
  capital: boolean;
  empire: Empire;
  emporium: string | null;
  id: string;
  name: string;
  type: "city";
}

type Religion = "catholic" | "islamic" | "reformist";

interface Empire {
  id: string;
  adjacentEmpires: string[];
  borders: string[];
  cities: string[]; // cityIds/ Could also return actual cities
  empireSquareId: string;
  name: string;
  region: string;
  religion: string;
}

interface PaxRenCard {
  id: string;
  location: string;
  state: number;
  used: number;
  isQueen: boolean;
}

// TODO: check interface compared to below one
interface TableauOp {
  id: string;
  flavorText?: string;
  name: string;
  type: string;
  top: number;
  left: number;
}

// interface TableauOpCardData {
//   id: string;
//   flavorText: string;
//   left: number;
//   top: number;
// }

interface EmpireCardSide {
  name: string;
  flavorText: string[];
  prestige: string[];
  ops: TableauOp[];
  agents: Agent[];
}

interface EmpireCardContainer {
  id: string;
  empireId: string;
  type: "empireCardContainer";
  card: EmpireCard;
  location: string;
  state: number;
}

interface EmpireCard extends PaxRenCard {
  empire: string;
  sellValue: number;
  isVassal: boolean;
  suzerainId: string | null;
  queens: QueenCard[];
  king: EmpireCardSide;
  republic: EmpireCardSide;
  side: "king" | "republic";
  type: "empireCard";
  owningBank: string | null;
  owningPlayerId: number | null;
  // region: "east" | "west";
}

interface Ability {
  id: string;
  text: {
    args: Record<string, unknown>;
    log: string;
  };
  title: string;
  allPlayers?: boolean;
  abilityAction?: boolean;
  top?: number;
  left?: number;
  height?: number;
  width?: number;
}

interface TableauCard extends PaxRenCard {
  type: "tableauCard";
  agents: Agent[] | null;
  empire: string;
  flavorText: string[];
  name: string;
  oneShot: string;
  ops: TableauOp[];
  prestige: string[];
  region: "east" | "west";
  sellValue: number;
  specialAbilities: Ability[];
}

interface QueenCard extends TableauCard {
  height: number;
  suitors: string[];
  hasKing: boolean;
  isQueen: true;
}

interface VictoryCard extends PaxRenCard {
  side: "active" | "inactive";
  active: {
    title: string;
  };
  inactive: {
    title: string;
  };
  type: "victoryCard";
  text: Log[];
}

interface Agent {
  separator: string | null;
  type: string;
}

interface Token {
  id: string;
  location: string;
  state: number;
  separator: string;
  type: string;
}

interface PaxRenaissanceGamedatas extends Gamedatas {
  canceledNotifIds: string[];
  customPlayerOrder: number[];
  empireSquares: EmpireCard[];
  gameMap: {
    empires: Empire[];
    thrones: {
      cards: EmpireCard[];
      tokens: Token[];
    };
    condottiereActive: boolean;
  };
  gameOptions: {
    ageOfReformationPromo: boolean;
    openHands: boolean;
  };
  market: {
    cards: TableauCard[];
    deckCounts: {
      east: {
        cardCount: number;
        comet1: boolean;
        comet2: boolean;
      };
      west: {
        cardCount: number;
        comet3: boolean;
        comet4: boolean;
      };
    };
    florins: {
      [location: string]: number;
    };
  };
  players: Record<number, PaxRenaissancePlayerData>;
  staticData: {
    tableauCards: Record<string, TableauCard>;
  };
  supremeReligion: {
    bishops: {
      catholic: number;
      islamic: number;
      reformist: number;
    };
    tokens: {
      catholic: number;
      islamic: number;
      reformist: number;
    };
  };
  tokens: {
    inPlay: Token[];
    supply: {
      catholic: {
        bishop: number;
        knight: number;
        rook: number;
      };
      islamic: {
        bishop: number;
        knight: number;
        rook: number;
      };
      refomist: {
        bishop: number;
        knight: number;
        rook: number;
      };
      banks: Record<string, number>;
    };
  };
  victoryCards: VictoryCard[];
  victoryCounts: {
    concessions: {playerId: number; numberOfConcessions: number}[];
    discoveryPrestige: {playerId: number; discoveryPrestige: number}[];
    kings: {playerId: number; numberOfKings: number}[];
    republics: {playerId: number; numberOfRepublics: number}[];
    lawPrestige: {playerId: number; lawPrestige: number}[];
  };
  // REMOVE
  testCard: TableauCard;
}

interface PaxRenaissancePlayerData extends BgaPlayer {
  // hexColor: string;
  activeAbilities: string[];
  cardsPlayerCanSell: {
    hand: TableauCard[];
    tableau: TableauCard[];
  };
  florins: number;
  bank: "coeur" | "fugger" | "marchionni" | "medici" | "berenberg" | "mendes";
  hand: {
    cards: TableauCard[];
    counts: {
      east: number;
      west: number;
    };
  };
  oldMaids: QueenCard[];
  tableau: {
    cards: {
      east: (EmpireCard | TableauCard)[];
      west: (EmpireCard | TableauCard)[];
    };
    tokens: Token[];
  };
  // vassals: {
  //   suzerain: EmpireCard;
  //   vassal: EmpireCard;
  // }[];
}
