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

class RegimeChangeMoveEmpireSquare extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_REGIME_CHANGE_MOVE_EMPIRE_SQUARE;
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

  /**
   * Move the Empire square to it's new tableau.
   */
  public function stRegimeChangeMoveEmpireSquare()
  {
    /**
     * If the Empire square comes from it's throne it comes with bishop and queen.
     * If it comes from en enemy tableau or if it is flipped in your own tableau, bishops and queens are discarded, and any vassals are returned to their thrones
     * Repressed tokens are retained / emancipated
     */


    $parentInfo = $this->ctx->getParent()->getInfo();
    $source = $parentInfo['source'];
    // Notifications::log('stRegimeChangeMoveEmpireSquare', $parentInfo['data']);

    $player = self::getPlayer();
    $playerId = $player->getId();

    $empireId = $parentInfo['empireId'];

    $empire = Empires::get($empireId);
    $empireCard = Cards::get($empire->getEmpireSquareId());
    // $empireCardLocation = $empireCard->getLocation();

    $isCampaign = $source === CAMPAIGN_OP;
    $isCoronation = $source === CORONATION_ONE_SHOT;

    $isInOwnTableau = $empireCard->isInPlayerTableau($playerId);
    $isInEnemeyTableau = !$isInOwnTableau && $empireCard->isInTableau();
    $isInThrone = $empireCard->isInThrone();

    if ($isInEnemeyTableau || ($isInOwnTableau && !$isCoronation)) {
      $this->returnVassals($empireCard);
      $this->discardBishops($empireCard);
      $this->discardQueens($empireCard);

    }

    /**
     * Cases
     * - enemy tableau and vassal
     * - enemy tableau and republic
     * - own tableau and vassal
     * - own tableau and republic
     */

    if ($isCampaign) {
      $attacker = Empires::get($parentInfo['data']['attackingEmpireId'])->getEmpireCard();
      $suzerain = $attacker->isVassal() ? $attacker->getSuzerain() : $attacker;
      $this->moveEmpireCardToTableau($empireCard, $player, $suzerain);
    } else if ($isInEnemeyTableau || $isInThrone) {
      $this->moveEmpireCardToTableau($empireCard, $player);
    } else if ($isInOwnTableau && !$isCoronation) {
      $empireCard->flip($player);
    }
    if ($source === CORONATION_ONE_SHOT) {
      $king = Cards::get($parentInfo['data']['kingId']);
      $queen = Cards::get($parentInfo['data']['queenId']);
      Cards::insertOnTop($queen->getId(), Locations::queens($king->getEmpireId()));
      // $king->marry($player, $queen);
      Notifications::coronation($player, $queen, $king);
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

  /**
   * Make sure to call this after changing data so it captures 'old' situation
   */
  private function argsDestination($empireCard)
  {
    $isVassal = $empireCard->isVassal();
    return [
      'type' => $isVassal ? EMPIRE_SQUARE_DESTINATION_VASSAL : EMPIRE_SQUARE_DESTINATION_KING,
      'suzerain' => $isVassal ? $empireCard->getSuzerain() : null,
      'ownerId' => $empireCard->getOwner()->getId(),
    ];
  }

  /**
   * Make sure to call this before changing data so it captures 'old' situation
   */
  private function argsOrigin($empireCard)
  {
    return [
      'type' => EMPIRE_SQUARE_ORIGIN_TABLEAU,
      'ownerId' => $empireCard->getOwner()->getId(),
      'side' => $empireCard->getSide(),
      'suzerain' => $empireCard->getSuzerain(),
    ];
  }

  private function moveEmpireCardToTableau($empireCard, $player, $suzerain = null)
  {
    $argsOrigin = $empireCard->isInThrone() ? ['type' => EMPIRE_SQUARE_ORIGIN_THRONE]  : $this->argsOrigin($empireCard);

    $region = Empires::get($empireCard->getEmpireId())->getRegion();
    if ($empireCard->getSide() === REPUBLIC) {
      $empireCard->setSide(KING);
    }
    if ($suzerain === null) {
      $empireCard->insertInTableau($player, $region);
    } else {
      $location = Locations::vassals($suzerain->getEmpireId());
      // Cards::insertOnTop($empireCard->getId(), $location);
      $empireCard->insertOnTop($location);
      Notifications::vassalage($player, $empireCard, $suzerain);
    }

    Notifications::moveEmpireSquare($player, $empireCard, $argsOrigin, $this->argsDestination($empireCard));
  }

  private function discardBishops($empireCard)
  {
    $tokens = $empireCard->getTokens();
    foreach($tokens as $token) {
      if ($token->getType() !== BISHOP) {
        continue;
      }
      $token->returnToSupply();
    }
  }

  private function discardQueens($empireCard)
  {
    $queens = $empireCard->getQueens();
    foreach ($queens as $queen) {
      $queen->discard();
    }
  }

  private function returnVassals($empireCard)
  {
    $vassals = $empireCard->getVassals();
    foreach ($vassals as $vassal) {
      $vassal->returnToThrone();
    }
  }
}
