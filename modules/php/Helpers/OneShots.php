<?php

namespace PaxRenaissance\Helpers;

use PaxRenaissance\Core\Notifications;
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
      // $result[$playerId] = [];
      $royalCouples = [];
      $otherCards = [];

      $affectedCards = Utils::filter($player->getTableauCards(), function ($card) use ($prestige) {
        $cardIsAffected = Utils::array_some($card->getPrestige(), function ($cardPrestige) use ($prestige) {
          return in_array($cardPrestige, $prestige);
        });
        return $cardIsAffected;
      });

      foreach ($affectedCards as $card) {
        if ($card->isQueen()) {
          $king = $card->getKing();
          $kingInList = Utils::array_find($affectedCards, function ($crd) use ($king) {
            return $crd->getId() === $king->getId();
          });

          if ($kingInList !== null) {
            // King is also in the list, we can continue
            continue;
          }
          if ($king->isVassal()) {
            array_unshift($royalCouples, $king);
          } else {
            $royalCouples[] = $king;
          }
        } else if ($card->getType() === EMPIRE_CARD && count($card->getQueens()) > 0) {
          $royalCouples[] = $card;
        } else {
          $otherCards[] = $card;
        }
      }

      $result[$playerId] = [
        'royalCouples' => $royalCouples,
        'tableauCards' => $otherCards,
      ];
    }
    return $result;
  }

  public static function getSuitorsCoronation($player, $queen)
  {


    $suitors = $queen->getSuitors();
    $playerId = $player->getId();

    $options = [];
    foreach ($suitors as $suitor) {
      $location = $suitor->getLocation();
      if ($suitor->getSide() === REPUBLIC) {
        continue;
      }

      if (
        count($suitor->getQueens()) === 0 &&
        (Utils::startsWith($location, 'throne') ||
        ($suitor->isInTableau() && $suitor->getOwner()->getId() === $playerId))
      ) {
        $options[] = $suitor;
      } else if ($player->hasSpecialAbility(SA_CORONATION_CAN_CLAIM_MARRIED_KINGS)) {
        $options[] = $suitor;
      }
    }
    return $options;
  }
}
