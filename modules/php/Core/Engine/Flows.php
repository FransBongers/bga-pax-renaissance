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

  public static function placeToken($playerId, $fromSupply, $toLocationId, $toLocationType, $empireId = null, $repressCost = 0)
  {
    return [
      'empireId' => $empireId,
      'fromSupply' => $fromSupply,
      'toLocationId' => $toLocationId,
      'toLocationType' => $toLocationType,
      'repressCost' => $repressCost,
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
