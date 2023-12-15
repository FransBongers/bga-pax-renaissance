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
  addPrimaryActionButton: (props: AddButtonProps) => void;
  addSecondaryActionButton: (props: AddButtonProps) => void;
  addSkipButton: (props: { callback: Function | string }) => void;
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
    callback: (props: { id: string }) => void;
    back?: boolean;
  }) => void;
  setCardSelected: (props: { id: string; back?: boolean }) => void;
  setLocationSelectable: (props: {
    id: string;
    callback: (props: { id: string }) => void;
  }) => void;
  setLocationSelected: (props: { id: string }) => void;
  setTokenSelectable: (props: {
    id: string;
    callback: (props: { id: string }) => void;
  }) => void;
  setTokenSelected: (props: { id: string }) => void;
  takeAction: (props: {
    action: string;
    args?: Record<string, unknown>;
  }) => void;
  updatePlayAreaSize: () => void;
  _connections: unknown[];
  animationManager: AnimationManager;
  // cardManager: CardManager<TableauCard>;
  gameMap: GameMap;
  hand: Hand;
  market: Market;
  notificationManager: NotificationManager;
  playAreaScale: number;
  playerManager: PlayerManager;
  supply: Supply;
  tooltipManager: TooltipManager;
  tableauCardManager: TableauCardManager;
  victoryCardManager: VictoryCardManager;
}

interface Border {
  id: string;
  name: string;
  type: "border";
}

interface City {
  capital: boolean;
  empire: string;
  emporium: string | null;
  id: string;
  name: string;
  type: "city";
}

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
}

// TODO: check interface compared to below one
interface TableauOp {
  id: string;
  flavorText: string[];
  name: string;
  type: string;
  top: number;
  left: number;
}

interface TableauOpCardData {
  id: string;
  flavorText: string;
  left: number;
  top: number;
}

interface EmpireCardSide {
  name: string;
  // flavorText: string[];
  prestige: string[];
  ops: TableauOpCardData[];
  agents: Agent[];
}

interface EmpireCard extends PaxRenCard {
  empire: string;
  isVassal: boolean;
  suzerainId: string | null;
  king: EmpireCardSide;
  republic: EmpireCardSide;
  side: "king" | "republic";
  type: "empireCard";
  // region: "east" | "west";
}

interface TableauCard extends PaxRenCard {
  empire: string;
  flavorText: string[];
  name: string;
  prestige: string[];
  region: "east" | "west";
  type: "tableauCard";
}



interface VictoryCard extends PaxRenCard {
  titleActive: string;
  titleInactive: string;
  type: "victoryCard";
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
  empireSquares: EmpireCard[];
  gameMap: {
    empires: Empire[];
    thrones: {
      cards: EmpireCard[];
      tokens: Token[];
    };
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
  // REMOVE
  testCard: TableauCard;
}

interface PaxRenaissancePlayerData extends BgaPlayer {
  // hexColor: string;
  florins: number;
  bank: "coeur" | "fugger" | "marchionni" | "medici";
  hand: {
    cards: TableauCard[];
    counts: {
      east: number;
      west: number;
    };
  };
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
