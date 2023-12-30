<?php
namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Engine;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;

class AbilityActions
{
  // Mapping of opId and corresponding class
  static $abilityActions = [
    SA_FREE_EASTERN_OPS => 'FreeEasternOps',
    SA_FREE_WESTERN_OPS => 'FreeWesternOps',
    SA_FREE_TRADE_FAIR => 'FreeTradeFair',
  ];

  public static function get($abilityActionId, $cardAbility = null)
  {
    if (!\array_key_exists($abilityActionId, self::$abilityActions)) {
      // throw new \feException(print_r(debug_print_backtrace()));
      // throw new \feException(print_r(Globals::getEngine()));
      throw new \BgaVisibleSystemException('Trying to get an abilityAction not defined in AbilityActions.php : ' . $abilityActionId);
    }
    $name = '\PaxRenaissance\AbilityActions\\' . self::$abilityActions[$abilityActionId];
    return new $name($cardAbility);
  }

  public static function getAll()
  {
    return array_map(function ($abilityActionId) {
      return self::get($abilityActionId);
    }, array_keys(self::$abilityActions));
  }

}
