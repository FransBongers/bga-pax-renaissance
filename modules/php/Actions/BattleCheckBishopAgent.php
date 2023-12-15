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

class BattleCheckBishopAgent extends \PaxRenaissance\Models\AtomicAction
{
  private $battleOneShots = [
    CONSPIRACY_ONE_SHOT,
    CRUSADE_ONE_SHOT,
    JIHAD_ONE_SHOT,
    PEASANT_REVOLT_ONE_SHOT,
    REFORMATION_ONE_SHOT,
  ];

  public function getState()
  {
    return ST_BATTLE_CHECK_BISHOP_AGENT;
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

  public function stBattleCheckBishopAgent()
  {
    $parentInfo = $this->ctx->getParent()->getInfo();
    $player = self::getPlayer();

    $source = $parentInfo['source'];
    $data = $parentInfo['data'];

    if (!in_array($source, $this->battleOneShots)) {
      $this->resolveAction([]);
      return;
    }

    $card = Cards::get($data['cardId']);

    $bishopAgents = Utils::filter($card->getAgents(), function ($agent) {
      return $agent['type'] === BISHOP;
    });

    if (count($bishopAgents) > 0) {
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => PLACE_AGENT,
        'playerId' => $this->ctx->getPlayerId(),
        'agents' => $bishopAgents,
        'empireId' => $card->getEmpire(),
        'optional' => false,
        'emptyCitiesFirst' => true,
        'repressCost' => 0,
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

}
