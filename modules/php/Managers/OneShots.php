<?php
namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Engine;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;

class OneShots
{
  // Mapping of opId and corresponding class
  static $oneShots = [
    // CORONATION_ONE_SHOT => 'CoronationOneShot'
    TRADE_SHIFT_RED_SEA_ONE_SHOT => 'TradeShiftRedSeaOneShot',
  ];

  public static function get($oneShotId)
  {
    if (!\array_key_exists($oneShotId, self::$oneShots)) {
      // throw new \feException(print_r(debug_print_backtrace()));
      // throw new \feException(print_r(Globals::getEngine()));
      throw new \BgaVisibleSystemException('Trying to get a oneShot not defined in OneShots.php : ' . $oneShotId);
    }
    $name = '\PaxRenaissance\OneShots\\' . self::$oneShots[$oneShotId];
    return new $name();
  }

  public static function getAll()
  {
    return array_map(function ($oneShotId) {
      return self::get($oneShotId);
    }, array_keys(self::$oneShots));
  }


}
