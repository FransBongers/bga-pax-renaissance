<?php

namespace PaxRenaissance\AbilityActions;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;

class DiscardToLaunchPeasantRevolt extends \PaxRenaissance\Models\AbilityAction
{
  public function __construct($cardAbility = null)
  {
    parent::__construct($cardAbility);
    $this->id = SA_DISCARD_TO_LAUNCH_PEASANT_REVOLT;
    $this->freeAction = false;
  }

  public function canBePerformed($player = null, $card = null)
  {
    if (!parent::canBePerformed($player, $card)) {
      return false;
    }

    // TODO: there needs to be at least one peasant?
    return true;
  }

  public function getFlow($player, $cardId)
  {
    return Engine::buildtree([
      'children' => [
        [
          'action' => ABILITY_ACTION_LAUNCH_PEASANT_REVOLT,
          'playerId' => $player->getId(),
          'cardId' => $cardId,
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
