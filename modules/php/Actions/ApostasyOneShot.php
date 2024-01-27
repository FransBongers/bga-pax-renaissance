<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\Flows;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\OneShots;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Models\Border;

class ApostasyOneShot extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_APOSTASY_ONE_SHOT;
  }

  // ..######..########....###....########.########
  // .##....##....##......##.##......##....##......
  // .##..........##.....##...##.....##....##......
  // ..######.....##....##.....##....##....######..
  // .......##....##....#########....##....##......
  // .##....##....##....##.....##....##....##......
  // ..######.....##....##.....##....##....########

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function stApostasyOneShot()
  {
    $oneShot = $this->ctx->getAction();

    $affectedPlayers = OneShots::getPlayersAffectedByApostasy($oneShot);

    // TODO: refactor. There is probably a cleaner way to resolve this
    foreach ($affectedPlayers as $playerId => $affectedCards) {
      $player = Players::get($playerId);
      Notifications::apostasy($player, APOSTASY_PRESTIGE_MAP[$oneShot]);


      $royalCoupleVassals = [];
      $royalCoupleSuzerains = [];
      foreach ($affectedCards['royalCouples'] as $empireCard) {
        if ($empireCard->isVassal()) {
          $royalCoupleVassals[] = $empireCard;
        } else {
          $royalCoupleSuzerains[] = $empireCard;
        }
      }

      $tableauCardVassals = [];
      $remainingCards = [];
      foreach ($affectedCards['tableauCards'] as $cardToDiscard) {
        if ($cardToDiscard->getType() === EMPIRE_CARD && $cardToDiscard->isVassal()) {
          $tableauCardVassals[] = $cardToDiscard;
        } else {
          $remainingCards[] = $cardToDiscard;
        }
      }

      // First discard Vassals
      foreach ($royalCoupleVassals as $empireCard) {
        $empireCard->returnToThrone();
      }

      foreach ($tableauCardVassals as $cardToDiscard) {
        if ($cardToDiscard->getType() === EMPIRE_CARD) {
          $cardToDiscard->returnToThrone();
        } else {
          $cardToDiscard->discard(DISCARD, $player);
        }
      }

      // Then discard remaining cards
      foreach ($royalCoupleSuzerains as $empireCard) {
        $empireCard->returnToThrone();
      }

      foreach ($remainingCards as $cardToDiscard) {
        if ($cardToDiscard->getType() === EMPIRE_CARD) {
          $cardToDiscard->returnToThrone();
        } else {
          $cardToDiscard->discard(DISCARD, $player);
        }
      }
    }

    $info = $this->ctx->getInfo();

    // Apostasy can be triggered by a card ability in which case
    // no cardId will be set and no agents need to be placed
    if (!isset($info['cardId'])) {
      $this->resolveAction([]);
      return;
    }
    
    $cardId = $info['cardId'];
    $playerdCard = Cards::get($cardId);

    if ($playerdCard->getAgents() !== null) {
      $this->ctx->getParent()->pushChild(new LeafNode([
        'action' => PLACE_AGENT,
        'playerId' => $this->ctx->getPlayerId(),
        'agents' => $playerdCard->getAgents(),
        'empireId' => $playerdCard->getEmpireId(),
        'source' => $oneShot,
        'optional' => false,
        // 'repressCost' => 0, // TODO: check this => do cards with apostasy only have bishops?
      ]));
    }

    $this->resolveAction([]);
  }




  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  // public function getAffectedPlayers($oneShot)
  // {
  //   $result = [];
  //   $prestige = APOSTASY_PRESTIGE_MAP[$oneShot];
  //   foreach (Players::getAll() as $player) {
  //     if ($player->hasSpecialAbility(SA_IMMUNE_TO_APOSTASY)) {
  //       continue;
  //     }


  //     $playerPrestige = $player->getPrestige();

  //     if (!($playerPrestige[$prestige[0]] > 0 && $playerPrestige[$prestige[1]] > 0)) {
  //       continue;
  //     }

  //     $playerId = $player->getId();
  //     $result[$playerId] = [];

  //     $tableauCards = $player->getTableauCards();
  //     foreach ($tableauCards as $card) {
  //       $cardIsAffected = Utils::array_some($card->getPrestige(), function ($cardPrestige) use ($prestige) {
  //         return in_array($cardPrestige, $prestige);
  //       });
  //       if (!$cardIsAffected) {
  //         continue;
  //       }
  //       $result[$playerId][] = $card;
  //     }
  //   }
  //   return $result;
  // }
}
