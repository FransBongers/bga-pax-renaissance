<?php

namespace PaxRenaissance\AbilityActions;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\OneShots;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Models\OneShot;

class ApostasyAction extends \PaxRenaissance\Models\AbilityAction
{
  public function __construct($cardAbility = null)
  {
    parent::__construct($cardAbility);
    $this->id = SA_PERFORM_APOSTASY_AS_AN_ACTION;
    $this->freeAction = false;
  }

  public function canBePerformed($player = null, $card = null)
  {
    if (!parent::canBePerformed($player, $card)) {
      return false;
    }

    $options = $this->getOptions();
    return count($options) > 0;
  }

  public function getFlow($player, $cardId)
  {
    return Engine::buildtree([
      'children' => [
        [
          'action' => ABILITY_ACTION_SELECT_APOSTASY,
          'playerId' => $player->getId(),
        ]
      ]
    ]);
  }

  /**
   * Can be performed if there is at least one apostasy that results in
   * discarded cards
   */
  public function getOptions()
  {
    $options = [];

    foreach ([APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT, APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT, APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT] as $apostasy) {
      $affectedPlayers = OneShots::getPlayersAffectedByApostasy($apostasy);
      if (count($affectedPlayers) > 0) {
        $options[] = $apostasy;
      }
    }

    return $options;
  }
}
