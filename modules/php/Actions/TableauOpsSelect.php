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
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Models\Border;

class TableauOpsSelect extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_TABLEAU_OPS_SELECT;
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

  public function stTableauOpsSelect()
  {
    $player = self::getPlayer();
    $availableOps = $this->getAvailableOps($player);

    if (count($availableOps) === 0) {
      $this->resolveAction([]);
    }
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsTableauOpsSelect()
  {
    $info = $this->ctx->getInfo();
    $region = $info['region'];
    
    $player = self::getPlayer();
    $availableOps = $this->getAvailableOps($player);

    $data = [
      'availableOps' => $availableOps,
      'tableauCards' => $player->getTableauCardsPerRegion()[$region],
      'optional' => $this->hasAtLeastOneOpBeenResolved(),
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

  public function actTableauOpsSelect($args)
  {
    self::checkAction('actTableauOpsSelect');
    $player = self::getPlayer();
    
    $available = $this->getAvailableOps($player);

    $cardId = isset($args['cardId']) ? $args['cardId'] : null;
    if ($cardId === null && $this->hasAtLeastOneOpBeenResolved()) {
      Notifications::tableauOpSkip($player);
      $this->resolveAction($args);
      return;  
    } else if ($cardId === null) {
      throw new \feException("At least one Op has to be performed");
    }
    $tableauOpId = $args['tableauOpId'];
    
    if (!isset($available[$cardId])) {
      throw new \feException("Not allowed to perform Ops from selected card");
    }

    $tableauOp = Utils::array_find($available[$cardId], function ($op) use ($tableauOpId) {
      return $op->getId() === $tableauOpId;
    });

    if ($tableauOp === null) {
      throw new \feException("Not allowed to perform selected Op");
    }
    // Notifications::log('tableauOp', $tableauOp);
    $this->ctx->getParent()->unshiftChild($tableauOp->getFlow($player, $cardId));
    $card = Cards::get($cardId);
    $card->setUsed();

    Notifications::tableauOpSelected($player, $tableauOp, $card);

    Engine::save();
    Engine::proceed();
    // $this->resolveAction($args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getAvailableOps($player)
  {
    $info = $this->ctx->getInfo();
    return $player->getAvailableOps()[$info['region']];
  }

  private function hasAtLeastOneOpBeenResolved()
  {
    return Utils::array_some($this->ctx->getParent()->getChildren(), function ($child) {
      return $child->isResolved();
    });
  }
}
