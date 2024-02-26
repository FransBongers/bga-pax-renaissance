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

class FreeWesternOps extends \PaxRenaissance\Models\AbilityAction
{
  public function __construct($cardAbility = null)
  {
    parent::__construct($cardAbility);
    $this->id = SA_FREE_WESTERN_OPS;
    $this->freeAction = true;
  }

  public function canBePerformed($player = null, $card = null)
  {
    if (!parent::canBePerformed($player, $card)) {
      return false;
    }

    // First trade fair will be the free one by default
    return count(Engine::getResolvedActions([TABLEAU_OPS_SELECT_WEST])) === 0 && count($player->getAvailableOps()[WEST]) > 0;
  }

  public function getFlow($player, $cardId)
  {
    Stats::incTableauOpsWestActionCount($player->getId(), 1);
    return Engine::buildtree([
      'children' => [
        [
          'action' => TABLEAU_OPS_SELECT_WEST,
          'playerId' => $player->getId(),
          'region' => WEST,
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
