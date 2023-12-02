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

  public static function supply($type, $colorBankReligion)
  {
    return 'supply_' . $type . '_' . $colorBankReligion;
  }

  public static function tableau($playerId, $region)
  {
    return 'tableau_' . $region . '_' . $playerId;
  }
}
