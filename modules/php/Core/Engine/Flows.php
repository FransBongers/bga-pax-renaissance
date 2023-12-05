<?php

namespace PaxRenaissance\Core\Engine;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Globals;

/**
 * Contains function to get complex flows for Engine
 * TODO: is there a better place for this?
 */
abstract class Flows
{

  public static function placeToken($playerId, $fromSupply, $toLocationId, $toLocationType)
  {
    return [
      'fromSupply' => $fromSupply,
      'toLocationId' => $toLocationId,
      'toLocationType' => $toLocationType,
      'children' => [
        [
          'action' => RESOLVE_PLACE_TOKEN,
          'playerId' => $playerId,
          // 'agents' => $card->getAgents(),
          // 'empireId' => $card->getEmpire(),
        ]
      ]
    ];
  }
}
