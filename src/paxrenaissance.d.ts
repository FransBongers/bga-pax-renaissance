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
  clientUpdatePageTitle: (props: { text: string; args: Record<string, unknown>; nonActivePlayers?: boolean }) => void;
  format_string_recursive: (log: string, args: Record<string, unknown>) => string
  getPlayerId: () => number;
  takeAction: (props: { action: string; args?: Record<string, unknown> }) => void;
  updatePlayAreaSize: () => void;
  _connections: unknown[];
  animationManager: AnimationManager;
  cardManager: CardManager<TableauCard>;
  hand: Hand;
  market: Market;
  notificationManager: NotificationManager;
  playAreaScale: number;
  playerManager: PlayerManager;
  tooltipManager: TooltipManager;
  victoryCardManager: VictoryCardManager;
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

interface ChessPiece {
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
    }
  };
  players: Record<number, BgaPlayer>;
  chessPieces: ChessPiece[];
  victoryCards: VictoryCard[]
  // REMOVE
  testCard: TableauCard;
}

interface PaxRenaissancePlayerData extends BgaPlayer {
  // hexColor: string;
  florins: number;
  bank: 'coeur' | 'fugger' | 'marchionni' | 'medici' ;
  hand: {
    cards: TableauCard[];
    counts: {
      east: number;
      west: number;
    }
  }
}
