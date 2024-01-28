<?php

namespace PaxRenaissance\AbilityActions;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;

class EastWestOps extends \PaxRenaissance\Models\AbilityAction
{
  public function __construct($cardAbility = null)
  {
    parent::__construct($cardAbility);
    $this->id = SA_EAST_AND_WEST_OPS_IN_ONE_ACTION;
    $this->freeAction = false;
  }

  public function canBePerformed($player = null, $card = null)
  {
    if (!parent::canBePerformed($player, $card)) {
      return false;
    }

    return count(Engine::getResolvedActions([TABLEAU_OPS_SELECT_EAST, TABLEAU_OPS_SELECT_WEST, TABLEAU_OPS_SELECT_EAST_AND_WEST])) === 0 && count($player->getAvailableOps()[EAST]) + count($player->getAvailableOps()[WEST]) > 0;
  }

  public function getFlow($player, $cardId)
  {
    $playerId = $player->getId();
    Stats::incTableauOpsEastActionCount($playerId, 1);
    Stats::incTableauOpsWestActionCount($playerId, 1);
    return Engine::buildtree([
      'children' => [
        [
          'action' => TABLEAU_OPS_SELECT_EAST_AND_WEST,
          'playerId' => $player->getId(),
        ]
      ]
    ]);
  }

  public function getOptions($card)
  {
    $options = [];

    return $options;
  }
}
