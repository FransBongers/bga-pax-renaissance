<?php

namespace PaxRenaissance\Helpers;

abstract class Locations extends \APP_DbObject
{
  public static function market(string $region, int $column)
  {
    return 'market_' . $region . '_' . $column;
  }
}
