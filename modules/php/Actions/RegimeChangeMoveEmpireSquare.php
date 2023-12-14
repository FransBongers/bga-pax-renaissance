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
    $player = self::getPlayer();
    $playerId = $player->getId();
    Notifications::log('playerId', $playerId);
    $empireId = $parentInfo['empireId'];

    $empire = Empires::get($empireId);
    Notifications::log('empire', $empire);
    $empireCard = Cards::get($empire->getEmpireSquareId());
    $empireCardLocation = $empireCard->getLocation();

    // TODO handle Vassal

    $isInThrone = $empireCardLocation === Locations::throne($empireId);
    Notifications::log('empireCardLocation', $empireCardLocation);
    $isInOwnTableau = in_array($empireCardLocation, [Locations::tableau($playerId, EAST), Locations::tableau($playerId, WEST)]);
    Notifications::log('isInOwnTableau', $isInOwnTableau);
    $isInEnemeyTableau = !$isInOwnTableau && Utils::startsWith($empireCardLocation, 'tableau_');
    Notifications::log('isInEnemeyTableau', $isInEnemeyTableau);

    if ($isInThrone) {
      // Comes with bishop and queen
      $empireCard->moveToTableau($player); 
    } else if ($isInEnemeyTableau) {
      // Discard bishop, queen, vassals
      $this->discardBishopQueenVassals($player, $empireCard);
      $empireCard->moveToTableau($player); 
    } else if ($isInOwnTableau) {
      // Flip card to republic, discard bishop, queen vassals
      $this->discardBishopQueenVassals($player, $empireCard);
      $empireCard->flip($player);
      
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

  private function discardBishopQueenVassals($player, $empireCard) {
    $tokens = $empireCard->getTokens();
    // Note should never be more than 1 bishop
    foreach($tokens as $token) {
      if ($token->getType() !== BISHOP) {
        continue;
      }
      $token->returnToSupply(RETURN_TO_SUPPLY, $player);
    }

    // TODO: discard queen
    // TODO: return Vassals
  }
}
