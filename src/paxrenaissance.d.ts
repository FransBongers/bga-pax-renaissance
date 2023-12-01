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
    card: TableauCard;
    callback: (props: { card: TableauCard }) => void;
    back?: boolean;
  }) => void;
  setCardSelected: (props: { card: TableauCard; back?: boolean }) => void;
  setCitySelectable: (props: {
    cityId: string;
    callback: (props: { cityId: string }) => void;
  }) => void;
  setCitySelected: (props: { cityId: string }) => void;
  takeAction: (props: {
    action: string;
    args?: Record<string, unknown>;
  }) => void;
  updatePlayAreaSize: () => void;
  _connections: unknown[];
  animationManager: AnimationManager;
  // cardManager: CardManager<TableauCard>;
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

interface TableauCard extends PaxRenCard {
  flavorText: string[];
  name: string;
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
  gameMap: TableauCard[];
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
  players: Record<number, BgaPlayer>;
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
}
