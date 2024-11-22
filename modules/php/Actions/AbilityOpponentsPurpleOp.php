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

class AbilityOpponentsPurpleOp extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_ABILITY_OPPONENTS_PURPLE_OP;
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

  public function stAbilityOpponentsPurpleOp()
  {
    $available = $this->getOptions()['options'];
    if (count($available) === 0) {
      $this->resolveAction(['automatic' => true]);
    }
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsAbilityOpponentsPurpleOp()
  {
    $data = $this->getOptions();
    // $data = [
    //   'options' => $op
    // ];

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

  public function actAbilityOpponentsPurpleOp($args)
  {
    self::checkAction('actAbilityOpponentsPurpleOp');

    // Notifications::log('args', $args);

    $player = self::getPlayer();

    $available = $this->getOptions()['options'];

    $cardId = $args['cardId'];

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
    $this->ctx->getParent()->pushChild($tableauOp->getFlow($player, $cardId));
    $card = Cards::get($cardId);
    $card->setUsed();

    Notifications::tableauOpSelected($player, $tableauOp, $card);

    $this->resolveAction($args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getOptions()
  {
    $activePlayer = self::getPlayer();
    $players = Players::getAll();
    $options = [];
    $cards = [];

    foreach ($players as $player) {
      if ($player->getId() === $activePlayer->getId()) {
        continue;
      }
      // $availableOpsPlayer = $player->getAvailableOps();
      // Notifications::log('availableOps',$availableOpsPlayer);
      // $availableOps = array_merge($availableOps, $availableOpsPlayer);
      $tableauCards = $player->getTableauCards();
      foreach ($tableauCards as $card) {
        $availableOps = $card->getAvailableOps($activePlayer);
        $availableOps = Utils::filter($availableOps, function ($op) {
          return $op->getType() === POLITICAL;
        });
        if (count($availableOps) > 0) {
          $options[$card->getId()] = $availableOps;
          $cards[] = $card;
        }
      }
    }

    return [
      'options' => $options,
      'tableauCards' => $cards,
    ];
  }

}
