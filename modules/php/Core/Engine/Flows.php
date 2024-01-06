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
  public static function placeLevy($empireId, $playerId)
  {
    return [
      'empireId' => $empireId,
      'children' => [
        [
          'action' => PLACE_LEVY_AUTO_CHECK,
          'playerId' => $playerId,
        ],
      ]
    ];
  }


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
          // 'empireId' => $card->getEmpireId(),
        ]
      ]
    ];
  }

  public static function battle($playerId, $source, $data)
  {
    return [
      'source' => $source,
      'data' => $data,
      'children' => [
        [
          'action' => BATTLE_LOCATION,
          'playerId' => $playerId,
        ],
        [
          'action' => BATTLE_RESULT,
          'playerId' => $playerId,
        ],
        [
          'action' => BATTLE_MAP_CHANGE_RELIGIOUS_WAR,
          'playerId' => $playerId,
        ],
        [
          'action' => BATTLE_CASUALTIES,
          'playerId' => $playerId,
        ],
        [
          'action' => BATTLE_RECONFIGURE_CONSTANTINOPLE,
          'playerId' => $playerId,
          'optional' => true,
        ],
        [
          'action' => BATTLE_CHECK_REGIME_CHANGE,
          'playerId' => $playerId,
        ],
        [
          'action' => BATTLE_CHECK_BISHOP_AGENT,
          'playerId' => $playerId,
        ],
        // Determine where there is a battle
        // Determine attackers / defenders and result
        // Choose casualties and eliminate 
        // Do attackers win? => regime change?
        // Place surviving agents into emtpy cities, repress for free if empire is saturated
        // If regime change => optional emancipation if empty spaces plur optional COncession
      ]
    ];
  }

  /**
   * 1. Move Empire square to tableau on King side.
   * a. Add optional PAWN as Concession, on border without pirates, pay 1 florin to repress PAWN
   * b. Emancipation
   * c. Golden Liberty => if vote succesful create Medieval state
   * d. Tokens & Queens
   * e. Vassalage
   */
  public static function regimeChange($playerId, $empireId, $source, $data = [])
  {
    return [
      'source' => $source,
      'empireId' => $empireId,
      'data' => $data,
      'children' => [
        [
          'action' => REGIME_CHANGE_MOVE_EMPIRE,
          'playerId' => $playerId,
        ],
        [
          'action' => PLACE_AGENT,
          'playerId' => $playerId,
          'agents' => [
            0 => [
              'type' => PAWN,
              'separator' => null
            ]
          ],
          'empireId' => $empireId,
          'optional' => true,
          'repressCost' => 1,
        ],
        [
          'action' => REGIME_CHANGE_EMANCIPATION,
          'optional' => true,
          'playerId' => $playerId,
        ],
        [
          'action' => REGIME_CHANGE_GOLDEN_LIBERTY,
          'playerId' => $playerId,
        ],
        // [
        //   'action' => BATTLE_LOCATION,
        //   'playerId' => $playerId,
        // ],
        // [
        //   'action' => BATTLE_RESULT,
        //   'playerId' => $playerId,
        // ],
      ]
    ];
  }
}
