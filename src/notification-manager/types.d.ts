/**
 * Note: we need to keep player_name in snake case, because the framework uses
 * it to add player colors to the log messages.
 */

interface Log {
  log: string;
  args: Record<string, unknown>;
}

type NotifSmallRefreshInterfaceArgs = Omit<PaxRenaissanceGamedatas, 'staticData'>;

interface NotifFlipVictoryCardArgs {
  playerId: number;
  tkn_playerName: string;
  card: VictoryCard;
  tkn_cardName: string;
}

interface NotifPurchaseCardArgs {
  playerId: number;
  tkn_playerName: string;
  card: TableauCard;
  tkn_cardName: string;
  placedFlorins: string[];
  takenFlorins: number;
  discard: boolean;
}

interface NotifRefreshMarketArgs {
  playerId: number;
  cardMoves: {
    from: string;
    to: string;
    card: TableauCard;
  }[];
  cardDraws: TableauCard[];
}

interface NotifSellCardArgs {
  playerId: number;
  tkn_playerName: string;
  card: TableauCard;
  tkn_cardName: string;
  value: number;
}