interface State {
  onEnteringState: (args: unknown) => void;
  onLeavingState: () => void;
  setDescription: (activePlayerId: number, args: unknown) => void;
}

interface CommonArgs {
  optionalAction: boolean;
  previousEngineChoices: number;
  previousSteps: number[];
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

interface OnEnteringClientDeclareVictoryArgs {
  victoryCard: VictoryCard;
}

interface OnEnteringClientSellCardArgs {
  cards: (EmpireCard | TableauCard)[];
  royalCouples: RoyalCouple[];
}

interface OnEnteringClientStartTradeFairArgs {
  card: TableauCard;
  city: City;
  action: 'actPlayerAction' | 'actAbilityActionSelectTradeFair';
}

type OnEnteringClientUseAbiltyActionArgs = Record<string, Ability>;

interface OnEnteringAnnounceOneShotArgs extends CommonArgs {
  oneShot: string;
}

interface OnEnteringAbilityActionSelectTradeFairArgs extends CommonArgs {
  tradeFairs: {
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

interface OnEnteringBattleCasualtiesArgs extends CommonArgs {
  agents: Agent[];
  tokens: (Token & { locationName: string })[];
  numberToEliminate: number;
}

interface OnEnteringBattleLocationArgs extends CommonArgs {
  empires: Empire[];
  source: string;
  data: unknown;
}

type ConstantinopleCityId = 'constantinople1' | 'constantinople2' | 'constantinople3';

interface OnEnteringBattleReconfigureConstantinopleArgs extends CommonArgs {
  constantinople1: Token | null;
  constantinople2: Token | null;
  constantinople3: Token | null;
}

interface OnEnteringBishopPacificationArgs extends CommonArgs {
  tokens: Token[];
}

interface OnEnteringConfirmTurnArgs extends CommonArgs {}

interface OnEnteringCoronationArgs extends CommonArgs {
  suitors: EmpireCard[];
  queen: TableauCard;
}

interface OnEnteringFlipVictoryCardArgs extends CommonArgs {
  victoryCards: VictoryCard[];
}

interface OnEnteringFreeActionArgs extends CommonArgs { 
  freeActions: Record<string, Ability>
}

interface PlaceAgentLocation {
  id: string;
  name: string;
  type: "border" | "city";
  cost: number;
  repressed: { token: Token; empires: Empire[] | null };
}

interface OnEnteringPlaceAgentsArgs extends CommonArgs {
  agents: {
    type: string;
    separator: string | null;
  }[];
  locations: Record<string, PlaceAgentLocation | EmpireCard | TableauCard>;
  optionalAction: boolean;
  repressCost: number;
}

interface OnEnteringPlaceLevySelectCityArgs extends CommonArgs {
  empire: Empire;
  possibleLevies: {
    [cityId: string]: {
      cityName: string;
      levy: {
        levyIcon: string;
        separator: string;
      };
    };
  };
}

interface RoyalCouple {
  king: EmpireCard;
  queens: QueenCard[];
}

interface OnEnteringPlayerActionArgs extends CommonArgs {
  abilityActions: Record<string, Ability>;
  availableOps: {
    east: Record<string, { id: string; text: string }>;
    west: Record<string, { id: string; text: string }>;
  };
  declarableVictories: VictoryCard[];
  remainingActions: number;
  cardsPlayerCanPurchase: TableauCard[];
  cardsPlayerCanSell: {
    cards: (EmpireCard | TableauCard)[];
    royalCouples: RoyalCouple[];
  };
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
  options: Record<string, (City | Border)[]>;
}

interface OnEnteringRegimeChangeGoldenLibertyArgs extends CommonArgs {
  empire: Empire;
}

interface OnEnteringSelectTokenArgs extends CommonArgs {
  tokens: Token[];
}

interface OnEnteringTableauOpBeheadArgs extends CommonArgs {
  cards: (EmpireCard | TableauCard)[];
}

interface CampaignOpOption {
  empire: Empire;
  cost: number;
}

interface OnEnteringTableauOpCampaignArgs extends CommonArgs {
  options: CampaignOpOption[];
}

interface OnEnteringTableauOpCommerceArgs extends CommonArgs {
  cards: TableauCard[];
}

interface CorsairOpDestination {
  border: Border;
  token: Token | null;
}

interface CorsairOpOption {
  token: Token;
  destinations: Record<string, CorsairOpDestination>;
}

interface OnEnteringTableauOpCorsairArgs extends CommonArgs {
  options: Record<string, CorsairOpOption>;
}

interface InquisitorOpOption {
  token: Token;
  destinations: (EmpireCard | TableauCard)[];
}

interface OnEnteringTableauOpInquisitorArgs extends CommonArgs {
  tokens: Record<string, InquisitorOpOption>;
}

interface OnEnteringTableauOpRepressArgs extends CommonArgs {
  tokens: Record<string, Token>;
}

interface OnEnteringTableauOpSiegeArgs extends CommonArgs {
  tokens: Record<string, Token>;
}

interface OnEnteringTableauOpTaxArgs extends CommonArgs {
  tokens: Record<string, { token: Token; empires: Empire[] }>;
}

interface OnEnteringTableauOpVoteArgs extends CommonArgs {
  options: {
    empire: Empire;
    cost: number;
  }[];
}

interface OnEnteringTableauOpTaxPayOrRepressArgs extends CommonArgs {
  token: Token;
  empire: Token;
}

interface OnEnteringTableauOpsSelectArgs extends CommonArgs {
  availableOps: Record<string, TableauOp[]>;
  tableauCards: (EmpireCard | TableauCard)[];
  optional: boolean;
}

// TODO: remove
interface OnEnteringTradeFairLevyArgs extends CommonArgs {
  empire: Empire;
  possibleLevies: {
    [cityId: string]: {
      cityName: string;
      levy: {
        levyIcon: string;
        separator: string;
      };
    };
  };
}
