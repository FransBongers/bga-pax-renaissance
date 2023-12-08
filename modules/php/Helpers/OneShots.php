<?php

namespace PaxRenaissance\Helpers;

abstract class OneShots extends \APP_DbObject
{
  public static function getTradeShiftLocationMap()
  {
    return [
      TRADE_SHIFT_NOVGOROD_ONE_SHOT => NOVGOROD,
      TRADE_SHIFT_RED_SEA_ONE_SHOT => RED_SEA,
      TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT => SPICE_ISLANDS,
      TRADE_SHIFT_TIMBUKTU_ONE_SHOT => TIMBUKTU,
    ];
  }
}
