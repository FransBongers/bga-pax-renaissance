/**
 * Note: we need to keep player_name in snake case, because the framework uses
 * it to add player colors to the log messages.
 */

interface Log {
  log: string;
  args: Record<string, unknown>;
}

type NotifSmallRefreshInterfaceArgs = Omit<PaxRenaissanceGamedatas, 'staticData'>;

interface NotifWithPlayerArgs {
  playerId: number;
  tkn_playerName: string;
}

interface NotifChangeEmpireToMedievalStateArgs {
  empire: Empire;
}

interface NotifChangeEmpireToTheocracyArgs {
  empire: Empire;
  religion: string;
}

interface NotifDeclareVictoryArgs extends NotifWithPlayerArgs {
  victoryCard: VictoryCard;
}


interface NotifDiscardCardArgs extends NotifWithPlayerArgs {
  card: TableauCard | EmpireCard;
  tkn_cardName: string;
  toLocationId: string;
  wasVassalTo: EmpireCard | null;
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

interface EmpireCardOriginData {
  suzerain: EmpireCard | null;
  wasRepublic: boolean;
  previousOwnerId: number | null;
}

interface NotifMoveEmpireSquareArgs extends NotifWithPlayerArgs {
  card: EmpireCard;
  from: EmpireCardOriginData;
}

interface NotifMoveTokenArgs extends NotifWithPlayerArgs {
  token: Token;
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

interface NotifSellCardArgs extends NotifWithPlayerArgs {
  card: TableauCard;
  tkn_cardName: string;
  value: number;
}

interface NotifTableauOpCommerceArgs extends NotifWithPlayerArgs {
  card: TableauCard;
}

interface NotifTableauOpTaxPayArgs extends NotifWithPlayerArgs {
}

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
  region: string;
}

interface NotifVassalageArgs extends NotifWithPlayerArgs {
  vassal: EmpireCard;
  suzerain: EmpireCard;
  from: EmpireCardOriginData;
}