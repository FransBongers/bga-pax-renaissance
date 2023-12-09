interface State {
  onEnteringState: (args: unknown) => void;
  onLeavingState: () => void;
  setDescription: (activePlayerId: number, args: unknown) => void;
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

interface OnEnteringAnnounceOneShotArgs extends CommonArgs {
  oneShot: string;
}

interface OnEnteringBattleCasualtiesArgs extends CommonArgs {
  agents: Agent[]
  tokens: (Token & {locationName: string})[];
  numberToEliminate: number
}

interface OnEnteringBattleLocationArgs extends CommonArgs {
  empires: Empire[];
  source: string;
  data: unknown;
}

interface OnEnteringBishopPacificationArgs extends CommonArgs {
  tokens: Token[];
}

interface OnEnteringConfirmTurnArgs extends CommonArgs {}

interface OnEnteringFlipVictoryCardArgs extends CommonArgs {
  victoryCards: VictoryCard[];
}

interface PlaceAgentLocation {
  id: string;
  name: string;
  type: 'border' | 'city',
  cost: number;
  repressed: Token;
}

interface OnEnteringPlaceAgentsArgs extends CommonArgs {
  agents: {
    type: string;
    religion: string | null;
  }[];
  locations: Record<string, PlaceAgentLocation | EmpireCard | TableauCard>;
  optionalAction: boolean;
  repressCost: number;
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

interface OnEnteringRegimeChangeEmancipationArgs extends CommonArgs {
  tokens: Token[];
  options: Record<string, (City | Border)[]>
}

interface OnEnteringSelectTokenArgs extends CommonArgs {
  tokens: Token[];
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
