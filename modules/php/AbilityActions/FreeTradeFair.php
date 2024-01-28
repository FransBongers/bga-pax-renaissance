<?php

namespace PaxRenaissance\AbilityActions;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;

class FreeTradeFair extends \PaxRenaissance\Models\AbilityAction
{
  public function __construct($cardAbility = null)
  {
    parent::__construct($cardAbility);
    $this->id = SA_FREE_TRADE_FAIR;
    $this->freeAction = true;
  }

  public function canBePerformed($player = null, $card = null)
  {
    if (!parent::canBePerformed($player, $card)) {
      return false;
    }
    // First trade fair will be the free one by default
    return count(Engine::getResolvedActions([TRADE_FAIR])) === 0;
  }

  public function getFlow($player, $cardId)
  {
    return Engine::buildtree([
      'children' => [
        [
          'action' => ABILITY_ACTION_SELECT_TRADE_FAIR,
          'playerId' => $player->getId(),
          'abilityId' => $this->id,
          'cardId' => $cardId,
        ],
      ]
    ]);
  }

  public function getOptions($card)
  {
    $options = [];

    return $options;
  }
}
