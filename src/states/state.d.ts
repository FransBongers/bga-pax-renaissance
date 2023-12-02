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
  action: "PURCHASE_CARD";
  cards: TableauCard[];
}

interface PlayAction {
  action: "PLAY_CARD";
  cards: TableauCard[];
}

type PaxRenAction = PurchaseAction | PlayAction;

interface OnEnteringClientStartTradeFairArgs {
  card: TableauCard;
  city: City;
}

interface OnEnteringConfirmTurnArgs extends CommonArgs {}

interface OnEnteringFlipVictoryCardArgs extends CommonArgs {
  victoryCards: VictoryCard[];
}

interface OnEnteringPlaceAgentsArgs extends CommonArgs {

}

interface OnEnteringPlayerActionArgs extends CommonArgs {
  remainingActions: number;
  cardsPlayerCanPurchase: TableauCard[];
  tradeFair: {
    east?: {
      card: TableauCard;
      city: City;
    };
    west?: {
      card: TableauCard;
      city: City;
    };
  };
}

interface OnEnteringTradeFairLevyArgs extends CommonArgs {
  empire: Empire;
  possibleLevies: {
    [cityId: string]: {
      cityName: string;
      levy: {
        levyIcon: string;
        religion: string;
      };
    };
  };
}
