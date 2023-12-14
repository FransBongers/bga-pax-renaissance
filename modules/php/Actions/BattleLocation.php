<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\Flows;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\AtomicActions;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Models\Border;

class BattleLocation extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_BATTLE_LOCATION;
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

  public function stBattleLocation()
  {
    $locations = $this->getLocation(false);

    if (count($locations) === 1) {
      $this->ctx->getParent()->updateInfo('empireId', $locations[0]);
      $this->resolveAction([]);
      return;
    }
    // throw new \feException("Implement Empire selection for battle");

    // $this->resolveAction([]);
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsBattleLocation()
  {
    $parentInfo = $this->ctx->getParent()->getInfo();

    $source = $parentInfo['source'];
    $data = $parentInfo['data'];
    

    $data = [
      // 'info' => $info,
      // 'parentInfo' => $parentInfo,
      'source' => $source,
      'data' => $data,
      'empires' => array_map(function ($empireId) {
        return Empires::get($empireId);
      }, $this->getLocation(false)),
    ];

    return $data;
  }

  //  .########..##..........###....##....##.########.########.
  //  .##.....##.##.........##.##....##..##..##.......##.....##
  //  .##.....##.##........##...##....####...##.......##.....##
  //  .########..##.......##.....##....##....######...########.
  //  .##........##.......#########....##....##.......##...##..
  //  .##........##.......##.....##....##....##.......##....##.
  //  .##........########.##.....##....##....########.##.....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function actBattleLocation($args)
  {
    self::checkAction('actBattleLocation');
    $empireId = $args['empireId'];

    $locations = $this->getLocation(false);

    if (!in_array($empireId, $locations)) {
      throw new \feException("Not allowed to battle in selected Empire");
    }
    $empire = Empires::get($empireId);

    Notifications::battleLocation(self::getPlayer(), $empire);

    $this->ctx->getParent()->updateInfo('empireId', $empireId);

    $this->resolveAction($args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getLocation()
  {
    $parentInfo = $this->ctx->getParent()->getInfo();
    $source = $parentInfo['source'];
    $data = $parentInfo['data'];

    switch ($source) {
      case CONSPIRACY_ONE_SHOT:
      case PEASANT_REVOLT_ONE_SHOT:
      case JIHAD_ONE_SHOT:
      case REFORMATION_ONE_SHOT:
      case CRUSADE_ONE_SHOT:
        return Cards::get($data['cardId'])->getAllEmpireIds(false);
      case CAMPAIGN_OP:
        return [$data['defendingEmpireId']];
      default:
        return [];
    }
  }
}
