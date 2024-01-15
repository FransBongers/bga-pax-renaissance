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

class TableauOpCommerce extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_TABLEAU_OP_COMMERCE;
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

  public function stTableauOpCommerce()
  {

  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsTableauOpCommerce()
  {
    $info = $this->ctx->getInfo();
    $tableauOpId = $info['tableauOpId'];

    $tableauOp = TableauOps::get($tableauOpId);

    $data = [
      'options' => $tableauOp->getOptions(),
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

  public function actTableauOpCommerce($args)
  {
    self::checkAction('actTableauOpCommerce');

    $cardId = isset($args['cardId']) ? $args['cardId'] : null;
    $space = isset($args['space']) ? $args['space'] : null;

    if ($cardId === null && $space === null) {
      throw new \feException("Not able to parse data");
    }

    $info = $this->ctx->getInfo();
    $tableauOpId = $info['tableauOpId'];

    $tableauOp = TableauOps::get($tableauOpId);

    $options = $tableauOp->getOptions();

    $market = null;
    if ($cardId !== null) {
      $market = $this->handleCardSelected($cardId, $options);
    } else {
      $market = $this->handleSpaceSelected($space, $options);
    }
 


    Market::incMarketFlorins($market['region'],$market['column'],-1);
    $player = self::getPlayer();
    $player->incFlorins(1);

    Notifications::tableauOpCommerce($player, $market['card'], $market['space']);
    
    $this->resolveAction($args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function handleCardSelected($cardId, $options) {
    $card = Utils::array_find($options['cards'], function ($option) use ($cardId) {
      return $cardId === $option->getId();
    });

    if ($card === null) {
      throw new \feException("Not allowed to take Florin from selected card");
    }

    $cardLocation = $card->getLocation();
    $splitLocation = explode('_', $cardLocation);

    return [
      'region' => $splitLocation[1],
      'column' => $splitLocation[2],
      'card' => $card,
      'space' => null
    ];
  }

  private function handleSpaceSelected($space, $options) {
    $validSpace = Utils::array_some($options['spaces'], function ($option) use ($space) {
      return $space === $option;
    });

    if (!$validSpace) {
      throw new \feException("Not allowed to take Florin from selected space");
    }

    $splitLocation = explode('_', $space);

    return [
      'region' => $splitLocation[1],
      'column' => $splitLocation[2],
      'card' => null,
      'space' => $space
    ];
  }

}
