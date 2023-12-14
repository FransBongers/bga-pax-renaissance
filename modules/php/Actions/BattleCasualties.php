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

class BattleCasualties extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_BATTLE_CASUALTIES;
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

  public function stBattleCasualties()
  {
    $parentInfo = $this->ctx->getParent()->getInfo();
    if ($parentInfo['numberToEliminate'] > 0) {
      return;
    }

    $survivingAgents = $this->ctx->getParent()->getInfo()['agentsToEliminate'];
    if (count($survivingAgents) > 0) {
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => PLACE_AGENT,
        'playerId' => $this->ctx->getPlayerId(),
        'agents' => $survivingAgents,
        'empireId' => $parentInfo['empireId'],
        'optional' => false,
        'emptyCitiesFirst' => true,
        'repressCost' => 0,
      ]));
    }

    $this->resolveAction([]);
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsBattleCasualties()
  {
    $info = $this->ctx->getParent()->getInfo();

    $data = [
      'numberToEliminate' => $info['numberToEliminate'],
      'agents' => isset($info['agentsToEliminate']) ? $info['agentsToEliminate'] : [],
      'tokens' => array_map(function ($tokenId) {
        $token = Tokens::get($tokenId);
        return array_merge($token->jsonSerialize(), ['locationName' => $token->getLocationInstance()->getName()]);
      }, isset($info['tokensToEliminate']) ? $info['tokensToEliminate'] : []),
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

  public function actBattleCasualties($args)
  {
    self::checkAction('actBattleCasualties');

    $tokenSelected = isset($args['tokenId']);

    $info = $this->ctx->getParent()->getInfo();
    $player = self::getPlayer();



    if ($tokenSelected) {
      $this->handleTokenSelected($player, $args, $info);
    } else {
      $this->handleAgentSelected($player, $args, $info);
    }


    $numberToEliminate = $info['numberToEliminate'];
    $numberToEliminate = $numberToEliminate - 1;
    $this->ctx->getParent()->updateInfo('numberToEliminate', $numberToEliminate);

    Engine::save();
    Engine::proceed();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function handleAgentSelected($player, $args, $info)
  {
    $agents = $info['agentsToEliminate'];
    $selectedAgent = $args['agent'];

    $index = Utils::array_find_index($agents, function ($agent) use ($selectedAgent) {
      return $agent['type'] === $selectedAgent['type'] && $agent['separator'] === $selectedAgent['separator'];
    });

    Notifications::battleEliminateAgent($player, $selectedAgent);

    unset($agents[$index]);
    $agents = array_values($agents);
    $this->ctx->getParent()->updateInfo('agentsToEliminate', $agents);
  }

  private function handleTokenSelected($player, $args, $info)
  {
    $tokenIds = $info['tokensToEliminate'];
    $tokenId = $args['tokenId'];

    if (!in_array($tokenId, $tokenIds)) {
      throw new \feException("Not allowed to eliminate selected Token");
    }

    $token = Tokens::get($tokenId);
    $token->returnToSupply(ELIMINATE, $player, true);

    $remainingTokens = Utils::filter($tokenIds, function ($id) use ($tokenId) {
      return $id !== $tokenId;
    });
    $this->ctx->getParent()->updateInfo('tokensToEliminate', $remainingTokens);
  }
}
