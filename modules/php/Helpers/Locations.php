<?php

namespace PaxRenaissance\Helpers;

abstract class Locations extends \APP_DbObject
{
  public static function deck($region)
  {
    return 'deck_' . $region;
  }

  public static function hand(int $playerId)
  {
    return 'hand_' . $playerId;
  }

  public static function market(string $region, int $column)
  {
    return 'market_' . $region . '_' . $column;
  }

  public static function marketFlorins(string $region, int $column)
  {
    return 'market_' . $region . '_' . $column . '_florins';
  }

  public static function bishopsSupply(string $religion)
  {
    return 'supply_bishops_' . $religion;
  }

  public static function knightsSupply(string $religion)
  {
    return 'supply_knights_' . $religion;
  }

  public static function pawnsSupply(string $playerColor)
  {
    return 'supply_pawns_' . $playerColor;
  }

  public static function rooksSupply(string $religion)
  {
    return 'supply_rooks_' . $religion;
  }
}
