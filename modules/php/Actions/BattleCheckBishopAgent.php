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

/**
 * Checks for placement of agents that did not participate in battle
 * Usually only bishops, but there are also cases of pawns not fighting in
 * religious wars
 */
class BattleCheckBishopAgent extends \PaxRenaissance\Models\AtomicAction
{
  private $battleOneShots = [
    CONSPIRACY_ONE_SHOT,
    CRUSADE_ONE_SHOT,
    JIHAD_ONE_SHOT,
    PEASANT_REVOLT_ONE_SHOT,
    REFORMATION_ONE_SHOT,
  ];

  private $religiousWarOneShots = [
    CRUSADE_ONE_SHOT,
    JIHAD_ONE_SHOT,
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

    $source = $parentInfo['source'];
    $data = $parentInfo['data'];

    if (!in_array($source, $this->battleOneShots)) {
      $this->resolveAction([]);
      return;
    }

    $card = Cards::get($data['cardId']);

    $affectedAgents = Utils::filter($card->getAgents(), function ($agent) use ($source) {
      if ($agent['type'] === BISHOP) {
        return true;
      }
      if (in_array($source, $this->religiousWarOneShots) && $agent['type'] === PAWN) {
        return true;
      }
      return false;
    });

    if (count($affectedAgents) > 0) {
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => PLACE_AGENT,
        'playerId' => $this->ctx->getPlayerId(),
        'agents' => $affectedAgents,
        'empireId' => $card->getEmpireId(),
        'source' => $source,
        'optional' => false,
        // 'emptyCitiesFirst' => true,
        // 'repressCost' => 0,
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
