interface State {
  onEnteringState: (args: any) => void;
  onLeavingState: () => void;
  setDescription: (activePlayerId: number) => void;
}

interface CommonArgs {
  previousEngineChoices: number;
  previousSteps: unknown[];
}

interface PurchaseAction {
  action: 'PURCHASE_CARD';
  cards: TableauCard[];
}

interface PlayAction {
  action: 'PLAY_CARD';
  cards: TableauCard[];
}

type PaxRenAction = PurchaseAction | PlayAction;

interface OnEnteringConfirmTurnArgs extends CommonArgs {}

interface OnEnteringFlipVictoryCardArgs extends CommonArgs {
  victoryCards: VictoryCard[];
}

interface OnEnteringPlayerActionArgs extends CommonArgs {
  remainingActions: number;
  cardsPlayerCanPurchase: TableauCard[];
}
