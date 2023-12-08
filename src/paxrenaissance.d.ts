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
    card: EmpireCard | TableauCard;
    callback: (props: { card: TableauCard }) => void;
    back?: boolean;
  }) => void;
  setCardSelected: (props: {
    card: EmpireCard | TableauCard;
    back?: boolean;
  }) => void;
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

interface City {
  capital: boolean;
  empire: string;
  emporium: string | null;
  id: string;
  name: string;
}

interface Empire {
  cities: string[]; // cityIds/ Could also return actual cities
  id: string;
  name: string;
  religion: string;
}

interface PaxRenCard {
  id: string;
  location: string;
  state: number;
  used: number;
}

interface EmpireCard extends PaxRenCard {
  empire: string;
  nameKing: string;
  nameRepublic: string;
  // flavorText: string[];
  // name: string;
  // prestige: string[];
  // region: "east" | "west";
  type: "empireCard";
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

interface Token {
  id: string;
  location: string;
  state: number;
}

interface PaxRenaissanceGamedatas extends Gamedatas {
  canceledNotifIds: string[];
  gameMap: {
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
      east: TableauCard[];
      west: TableauCard[];
    };
    tokens: Token[];
  };
}
