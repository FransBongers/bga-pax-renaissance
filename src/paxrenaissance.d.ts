interface AddButtonProps {
  id: string;
  text: string;
  callback: () => void;
  extraClasses?: string;
}

interface AddActionButtonProps extends AddButtonProps {
  color?: 'blue' | 'gray' | 'red' | 'none';
}

interface PaxRenaissanceGame extends Game {
  addPrimaryActionButton: (props: AddButtonProps) => void;
  addSecondaryActionButton: (props: AddButtonProps) => void;
  addDangerActionButton: (props: AddButtonProps) => void;
  clearInterface: () => void;
  clearPossible: () => void;
  updatePlayAreaSize: () => void;
  notificationManager: NotificationManager;
  playAreaScale: number;
  playerManager: PlayerManager;
  tooltipManager: TooltipManager;
}

interface PaxRenaissanceGamedatas extends Gamedatas {
  canceledNotifIds: string[];
  players: Record<number, BgaPlayer>;
}

interface PaxRenaissancePlayerData extends BgaPlayer {
  hexColor: string;
}