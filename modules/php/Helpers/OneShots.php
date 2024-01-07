<?php

namespace PaxRenaissance\Helpers;

use PaxRenaissance\Managers\Players;

abstract class OneShots extends \APP_DbObject
{
  public static function getTradeShiftLocationMap()
  {
    return [
      TRADE_SHIFT_NOVGOROD_ONE_SHOT => NOVGOROD,
      TRADE_SHIFT_RED_SEA_ONE_SHOT => RED_SEA,
      TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT => SPICE_ISLANDS,
      TRADE_SHIFT_TIMBUKTU_ONE_SHOT => TIMBUKTU,
    ];
  }

  public static function getPlayersAffectedByApostasy($oneShot)
  {
    $result = [];
    $prestige = APOSTASY_PRESTIGE_MAP[$oneShot];
    foreach (Players::getAll() as $player) {
      if ($player->hasSpecialAbility(SA_IMMUNE_TO_APOSTASY)) {
        continue;
      }

      $playerPrestige = $player->getPrestige();

      if (!($playerPrestige[$prestige[0]] > 0 && $playerPrestige[$prestige[1]] > 0)) {
        continue;
      }

      $playerId = $player->getId();
      $result[$playerId] = [];

      $tableauCards = $player->getTableauCards();
      foreach ($tableauCards as $card) {
        $cardIsAffected = Utils::array_some($card->getPrestige(), function ($cardPrestige) use ($prestige) {
          return in_array($cardPrestige, $prestige);
        });
        if (!$cardIsAffected) {
          continue;
        }
        $result[$playerId][] = $card;
      }
    }
    return $result;
  }
}
