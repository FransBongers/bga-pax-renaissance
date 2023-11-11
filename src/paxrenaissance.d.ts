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
  addPrimaryActionButton: (props: AddButtonProps) => void;
  addSecondaryActionButton: (props: AddButtonProps) => void;
  addDangerActionButton: (props: AddButtonProps) => void;
  clearInterface: () => void;
  clearPossible: () => void;
  updatePlayAreaSize: () => void;
  animationManager: AnimationManager;
  cardManager: CardManager<TableauCard>;
  notificationManager: NotificationManager;
  playAreaScale: number;
  playerManager: PlayerManager;
  tooltipManager: TooltipManager;
}

interface TableauCard {
  id: string;
  location: string;
  flavorText: string[];
  name: string;
  region: "east" | "west";
  state: number;
  type: "tableauCard";
  used: number;
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
        cometCount: number;
      };
      west: {
        cardCount: number;
        cometCount: number;
      };
    };
  };
  players: Record<number, BgaPlayer>;
  chessPieces: ChessPiece[];
}

interface PaxRenaissancePlayerData extends BgaPlayer {
  hexColor: string;
}
