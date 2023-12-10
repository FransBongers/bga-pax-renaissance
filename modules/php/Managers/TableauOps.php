<?php
namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Engine;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;

class TableauOps
{
  // Mapping of opId and corresponding class
  static $ops = [
    COMMERCE_OP_EAST => 'CommerceOpEast',
    COMMERCE_OP_WEST => 'CommerceOpWest',
  ];

  public static function get($opId, $cardOp = null)
  {
    if (!\array_key_exists($opId, self::$ops)) {
      // throw new \feException(print_r(debug_print_backtrace()));
      // throw new \feException(print_r(Globals::getEngine()));
      throw new \BgaVisibleSystemException('Trying to get a city not defined in Cities.php : ' . $opId);
    }
    $name = '\PaxRenaissance\TableauOps\\' . self::$ops[$opId];
    return new $name($cardOp);
  }

  public static function getAll()
  {
    return array_map(function ($opId) {
      return self::get($opId);
    }, array_keys(self::$ops));
  }


}
