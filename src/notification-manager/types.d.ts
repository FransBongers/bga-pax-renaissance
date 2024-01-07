/**
 * Note: we need to keep player_name in snake case, because the framework uses
 * it to add player colors to the log messages.
 */

interface Log {
  log: string;
  args: Record<string, unknown>;
}

type NotifSmallRefreshInterfaceArgs = Omit<
  PaxRenaissanceGamedatas,
  "staticData"
>;

interface NotifWithPlayerArgs {
  playerId: number;
  tkn_playerName: string;
}

interface NotifActivateAbilityArgs extends NotifWithPlayerArgs {
  ability: string;
}

interface NotifChangeEmpireToMedievalStateArgs {
  empire: Empire;
}

interface NotifChangeEmpireToTheocracyArgs {
  empire: Empire;
  religion: string;
}

interface NotifCoronationArgs extends NotifWithPlayerArgs {
  queen: QueenCard;
  king: EmpireCard;
}

interface NotifDeclareVictoryArgs extends NotifWithPlayerArgs {
  victoryCard: VictoryCard;
}

interface NotifDeactivateAbilityArgs extends NotifWithPlayerArgs {
  ability: string;
}

interface NotifDiscardCardArgs extends NotifWithPlayerArgs {
  card: TableauCard | EmpireCard;
  tkn_cardName: string;
  fromLocationId: string;
  toLocationId: string;
  wasVassalTo: EmpireCard | null;
  wasQueenTo: EmpireCard | null;
  wasOldMaid: boolean;
  adjustPrestige: boolean;
}

interface NotifDiscardQueenArgs extends NotifWithPlayerArgs {
  queen: QueenCard;
  tkn_cardName: string;
  king: EmpireCard | null;
}

interface NotifFlipEmpireCardArgs extends NotifWithPlayerArgs {
  card: EmpireCard;
  tkn_cardName: string;
  formerSuzerain: EmpireCard | null;
}

interface NotifFlipVictoryCardArgs extends NotifWithPlayerArgs {
  card: VictoryCard;
  tkn_cardName: string;
}

interface NotifReturnToSupplyArgs extends NotifWithPlayerArgs {
  token: Token;
}

type EmpireSquareDestination =
  | EmpireSquareDestinationTableau
  | EmpireSquareDestinationVassal;

interface EmpireSquareDestinationTableau {
  type: "king";
  suzerain: null;
  ownerId: number;
}

interface EmpireSquareDestinationVassal {
  type: "vassal";
  suzerain: EmpireCard;
  ownerId: number;
}

type EmpireSquareOrigin = EmpireSquareOriginThrone | EmpireSquareOriginTableau;

interface EmpireSquareOriginThrone {
  type: "throne";
}

interface EmpireSquareOriginTableau {
  type: "tableau";
  ownerId: number;
  side: "republic" | "king";
  suzerain: EmpireCard | null;
}

// interface EmpireCardOriginData {
//   suzerain: EmpireCard | null;
//   wasRepublic: boolean;
//   previousOwnerId: number | null;
// }

interface NotifMoveEmpireSquareArgs extends NotifWithPlayerArgs {
  card: EmpireCard;
  origin: EmpireSquareOrigin;
  destination: EmpireSquareDestination;
}

interface NotifMoveTokenArgs extends NotifWithPlayerArgs {
  token: Token;
}

interface NotifMoveTokensWithinContantinopleArgs extends NotifWithPlayerArgs {
  tokens: Token[];
}

interface NotifOldMaidArgs extends NotifWithPlayerArgs {
  card: QueenCard;
}

interface NotifPlaceTokenArgs extends NotifWithPlayerArgs {
  token: Token;
  fromLocationId: string;
}

interface NotifPlayCardArgs extends NotifWithPlayerArgs {
  card: TableauCard;
  tkn_cardName: string;
}

interface NotifPurchaseCardArgs extends NotifWithPlayerArgs {
  card: TableauCard;
  tkn_cardName: string;
  placedFlorins: string[];
  takenFlorins: number;
  discard: boolean;
}

interface NotifRefreshHandArgs extends NotifWithPlayerArgs {
  hand: TableauCard[];
}

interface NotifRefreshMarketArgs extends NotifWithPlayerArgs {
  cardMoves: {
    from: string;
    to: string;
    card: TableauCard;
  }[];
  cardDraws: TableauCard[];
}

interface NotifRefreshUIArgs {
  datas: PaxRenaissanceGamedatas;
}

interface NotifRepressTokenArgs extends NotifWithPlayerArgs {
  token: Token;
  cost: number;
}

interface NotifReturnToThroneArgs extends NotifWithPlayerArgs {
  king: EmpireCard;
  fromSide: "king" | "republic";
  suzerain: EmpireCard;
}

interface NotifSellCardArgs extends NotifWithPlayerArgs {
  card: TableauCard;
  tkn_cardName: string;
  value: number;
}

interface NotifSellRoyalCoupleArgs extends NotifWithPlayerArgs {
  king: EmpireCard;
  queen: QueenCard;
  value: number;
}

interface NotifTableauOpCommerceArgs extends NotifWithPlayerArgs {
  card: TableauCard;
}

interface NotifTableauOpTaxPayArgs extends NotifWithPlayerArgs {}

interface NotifPayFlorinsToChinaArgs extends NotifWithPlayerArgs {
  amount: number;
}

interface NotifTradeFairConveneArgs extends NotifWithPlayerArgs {
  region: string;
  florinsFromChina: number;
}

interface NotifTradeFairEmporiumSubsidyArgs extends NotifWithPlayerArgs {
  amount: number;
  region: string;
}

// interface NotifTradeFairPlaceLevyArgs extends NotifWithPlayerArgs {
//   token: Token;
//   cityId: string;
//   cityName: string;
// }

interface NotifTradeFairProfitDispersalPiratesArgs {
  region: string;
}

interface NotifTradeFairProfitDispersalPlayerArgs extends NotifWithPlayerArgs {
  amount: number;
  region: string;
}

// interface NotifVassalageArgs extends NotifWithPlayerArgs {
//   vassal: EmpireCard;
//   suzerain: EmpireCard;
//   from: EmpireCardOriginData;
// }
