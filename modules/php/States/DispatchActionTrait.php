<?php

namespace PaxRenaissance\States;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Log;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\ActionStack;
use PaxRenaissance\Managers\Players;

trait DispatchActionTrait
{

  // ..######..########....###....########.########
  // .##....##....##......##.##......##....##......
  // .##..........##.....##...##.....##....##......
  // ..######.....##....##.....##....##....######..
  // .......##....##....#########....##....##......
  // .##....##....##....##.....##....##....##......
  // ..######.....##....##.....##....##....########

  // ....###.....######..########.####..#######..##....##..######.
  // ...##.##...##....##....##.....##..##.....##.###...##.##....##
  // ..##...##..##..........##.....##..##.....##.####..##.##......
  // .##.....##.##..........##.....##..##.....##.##.##.##..######.
  // .#########.##..........##.....##..##.....##.##..####.......##
  // .##.....##.##....##....##.....##..##.....##.##...###.##....##
  // .##.....##..######.....##....####..#######..##....##..######.

  function stDispatchAction($actionStack = null)
  {
    // $actionStack = ActionStack::get();
    $actionStack = $actionStack === null ? ActionStack::get() : $actionStack;

    $next = $actionStack[count($actionStack) - 1];
    switch ($next['type']) {

      case DISPATCH_TRANSITION:
        $this->dispatchTransition($actionStack);
        break;
      default:
        Notifications::log('---CHECK THIS---', $next);
        $this->nextState('playerActions');
    }
  }

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...



  /**
   * Transition to next state. 
   * Data:
   * - pop: set to true if actions needs to be popped from stack. Will also pop if not set at all
   * - giveExtraTime: set if player needs to receive extra time
   */
  function dispatchTransition($actionStack)
  {
    $next = $actionStack[count($actionStack) - 1];
    $playerId = $next['playerId'];

    $popSet = isset($next['data']['pop']);
    if (!$popSet || ($popSet && $next['data']['pop'])) {
      array_pop($actionStack);
    }
    $giveExtraTimeSet = isset($next['data']['giveExtraTime']);
    if ($giveExtraTimeSet && $next['data']['giveExtraTime']) {
      $this->giveExtraTime($playerId);
    }

    ActionStack::set($actionStack);
    if (Players::get()->getId() !== $playerId) {
      Log::checkpoint();
    }
    $this->nextState($next['data']['transition'], $playerId);
  }

}
