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

  public function stRegimeChangeMoveEmpireSquare()
  {
    $parentInfo = $this->ctx->getParent()->getInfo();
    $source = $parentInfo['source'];
    // Notifications::log('stRegimeChangeMoveEmpireSquare', $parentInfo['data']);

    $player = self::getPlayer();
    // $playerId = $player->getId();

    $empireId = $parentInfo['empireId'];

    $empire = Empires::get($empireId);
    $empireCard = Cards::get($empire->getEmpireSquareId());
    // $empireCardLocation = $empireCard->getLocation();

    $isCampaign = $source === CAMPAIGN_OP;

    // $isInThrone = $empireCardLocation === Locations::throne($empireId);
    // $isInOwnTableau = in_array($empireCardLocation, [Locations::tableau($playerId, EAST), Locations::tableau($playerId, WEST)]);
    // $isInEnemeyTableau = !$isInOwnTableau && Utils::startsWith($empireCardLocation, 'tableau_');

    if ($source === CORONATION_ONE_SHOT) {
      $king = Cards::get($parentInfo['data']['kingId']);
      $queen = Cards::get($parentInfo['data']['queenId']);
      $king->marry($player, $queen);
      Notifications::coronation($player, $queen, $king);
    } else {
      // TODO: handle cards that are a Vassal right now
      $empireCard->resolveRegimeChange($player, $isCampaign, $isCampaign ?
        Empires::get($parentInfo['data']['attackingEmpireId'])->getEmpireCard() :
        null);
    }

    // if ($isInThrone) {
    //   // Comes with bishop and queen
    //   if ($isCampaign) {
    //     $empireCard->vassalage($player, Empires::get($parentInfo['data']['attackingEmpireId'])->getEmpireCard());
    //   } else {
    //     $empireCard->moveToTableau($player); 
    //   }
    // } else if ($isInEnemeyTableau) {
    //   // Discard bishop, queen, vassals
    //   $empireCard->discardBishopQueenVassals($player);
    //   if ($isCampaign) {
    //     $empireCard->vassalage($player, Empires::get($parentInfo['data']['attackingEmpireId']));
    //   } else {
    //     $empireCard->moveToTableau($player);
    //   }
    // } else if ($isInOwnTableau) {
    //   // Flip card to republic, discard bishop, queen vassals
    //   $empireCard->discardBishopQueenVassals($player, $empireCard);
    //   $empireCard->flip($player);
    // }

    $this->resolveAction([]);
  }




  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...


}
