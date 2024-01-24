<?php
namespace PaxRenaissance\Empires;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;

use const PaxRenaissance\OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

class Hungary extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = HUNGARY;
    $this->adjacentEmpires = [
      BYZANTIUM,
      HOLY_ROMAN_EMIRE,
      MAMLUK,
      OTTOMAN,
      PAPAL_STATES,
    ];
    $this->adjacentBySeaBorderEmpires = [
      BYZANTIUM,
      OTTOMAN,
    ];
    $this->empireSquareId = 'EmpireSquare_Hungary';
    $this->name = clienttranslate('Hungary');
    $this->borders = [
      BORDER_BYZANTIUM_HUNGARY,
      BORDER_HOLY_ROMAN_EMPIRE_HUNGARY,
      BORDER_HUNGARY_OTTOMAN,
    ];
    $this->cities = [BUDA, VARNA];
    $this->region = EAST;
  }

  public function getCities($emptyOnly = false)
  {
    if (Globals::getStartingMap() === OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT && $this->getReligion() === MEDIEVAL) {
      $this->cities[] = KVIV;
    }
    return parent::getCities($emptyOnly);
  }

  public function changeToTheocracy($religion) {
    parent::changeToTheocracy($religion);
    if (Globals::getStartingMap() === OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT) {
      $battleCasualtiesSibling = Engine::getUnresolvedActions([BATTLE_CASUALTIES])[0];
      $battleCasualtiesSibling->insertAsBrother(new LeafNode([
        'action' => REMOVE_TOKEN_FROM_CITY,
        'playerId' => $battleCasualtiesSibling->getPlayerId(),
        'cities' => [KVIV],
      ]));
    }
  }
}
