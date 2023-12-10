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
    REPRESS_OP_KNIGHT => 'RepressOpKnight',
    REPRESS_OP_PAWN => 'RepressOpPawn',
    REPRESS_OP_PAWN_KNIGHT => 'RepressOpPawnKnight',
    REPRESS_OP_PAWN_ROOK => 'RepressOpPawnRook',
    REPRESS_OP_PAWN_ROOK_KNIGHT => 'RepressOpPawnRookKnight',
    REPRESS_OP_ROOK_KNIGHT => 'RepressOpRookKnight',
  ];

  public static function get($opId, $cardOp = null)
  {
    if (!\array_key_exists($opId, self::$ops)) {
      // throw new \feException(print_r(debug_print_backtrace()));
      // throw new \feException(print_r(Globals::getEngine()));
      throw new \BgaVisibleSystemException('Trying to get a tableauOp not defined in TableauOps.php : ' . $opId);
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
