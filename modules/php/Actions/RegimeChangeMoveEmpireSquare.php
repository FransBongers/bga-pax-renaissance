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
    Notifications::log('stRegimeChangeMoveEmpireSquare',$parentInfo);

    $empireId = $parentInfo['empireId'];

    $empire = Empires::get($empireId);

    $empireCard = Cards::get($empire->getEmpireSquareId());
    $empireCardLocation = $empireCard->getLocation();

    $isInThrone = $empireCardLocation === Locations::throne($empireId);
    $isInOwnTableau = $empireCardLocation === Locations::tableau($playerId, EAST) || Locations::tableau($playerId, WEST);
    $isOnOtherPlayersTableau = !$isInOwnTableau && Utils::startsWith($empireCardLocation, 'tableau_');

    if ($isInThrone) {
      $empireCard->moveToTableau($player);
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

}