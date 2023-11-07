<?php

namespace PaxRenaissance\Helpers;

abstract class Locations extends \APP_DbObject
{
  public static function market(string $region, int $column)
  {
    return 'market_' . $region . '_' . $column;
  }

  public static function bishopsSupply(string $religion) {
    return 'supply_bishops_'.$religion;
  }

  public static function knightsSupply(string $religion) {
    return 'supply_knights_'.$religion;
  }

  public static function pawnsSupply(string $playerColor) {
    return 'supply_pawns_'.$playerColor;
  }

  public static function rooksSupply(string $religion) {
    return 'supply_rooks_'.$religion;
  }
}
