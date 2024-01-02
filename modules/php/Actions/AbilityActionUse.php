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
use PaxRenaissance\Managers\TableauOps;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Models\Border;

class AbilityActionUse extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_ABILITY_ACTION_USE;
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

  public function stAbilityActionUse()
  {
    $info = $this->ctx->getInfo();
    $cardId = $info['cardId'];
    $abilityId = $info['abilityId'];
    $source = $info['source'];
    $player = self::getPlayer();


    $actions = $player->getAbilityActions($source === FREE_ACTION);

    if (!isset($actions[$cardId]) || !$actions[$cardId]->getId() === $abilityId) {
      throw new \feException("Not allowed to perform action from ability");
    } 

    $ability = $actions[$cardId];
    $isFreeAction = $ability->isFreeAction();

    if ($source === FREE_ACTION && !$isFreeAction) {
      throw new \feException("No actions remaining to perform action");
    }

    if ($source === PLAYER_ACTION && $isFreeAction) {
      Engine::insertExtraPlayerAction($player);
    }

    $flow = $ability->getFlow($player, $cardId);
    if ($source === PLAYER_ACTION) {
      $this->ctx->insertAsBrother($flow);
    } else if ($source === FREE_ACTION) {
      $this->ctx->getParent()->unshiftChild($flow);
    }
    

    $this->resolveAction(['automatic' => true]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

}
