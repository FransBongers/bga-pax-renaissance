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

interface NotifFlipVictoryCardArgs extends NotifWithPlayerArgs {
  card: VictoryCard;
  tkn_cardName: string;
}

interface NotifKillTokenArgs extends NotifWithPlayerArgs {
  token: Token;
}

interface NotifPlaceAgentArgs extends NotifWithPlayerArgs {
  token: Token;
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

interface NotifRefreshMarketArgs extends NotifWithPlayerArgs {
  cardMoves: {
    from: string;
    to: string;
    card: TableauCard;
  }[];
  cardDraws: TableauCard[];
}

interface NotifSellCardArgs extends NotifWithPlayerArgs {
  card: TableauCard;
  tkn_cardName: string;
  value: number;
}

interface NotifTradeFairConveneArgs extends NotifWithPlayerArgs {
  region: string;
  florinsFromChina: number;
}

interface NotifTradeFairEmporiumSubsidyArgs extends NotifWithPlayerArgs {
  amount: number;
  region: string;
}

interface NotifTradeFairPlaceLevyArgs extends NotifWithPlayerArgs {
  token: Token;
  cityId: string;
  cityName: string;
}

interface NotifTradeFairProfitDispersalPiratesArgs {
  region: string;
}

interface NotifTradeFairProfitDispersalPlayerArgs extends NotifWithPlayerArgs {
  region: string;
}