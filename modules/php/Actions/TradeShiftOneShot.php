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

class TradeShiftOneShot extends \PaxRenaissance\Models\AtomicAction
{
  protected $destinationMap = [
    NOVGOROD => [TANA, TIMBUKTU],
    RED_SEA => [SPICE_ISLANDS, TREBIZOND],
    SPICE_ISLANDS => [RED_SEA, TREBIZOND],
    TIMBUKTU => [TANA, NOVGOROD],
  ];

  public function getState()
  {
    return ST_TRADE_SHIFT_ONE_SHOT;
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

  public function stTradeShiftOneShot()
  {
    $info = $this->ctx->getInfo();
    $cardId = $info['cardId'];
    $card = Cards::get($cardId);
    Notifications::log('stTradeShiftOneShot', $info);
    $oneShot = $card->getOneShot();

    $cityId = OneShots::getTradeShiftLocationMap()[$oneShot];

    $source = Cities::get($cityId);
    $destination = $this->getDiskDestination($cityId);

    $currentToken = $destination->getToken();
    if ($currentToken !== null) {
      $currentToken->repress($destination->getEmpire(), 0);
    }
    $disk = $source->getToken();
    $disk->move($destination->getId());
    
    if ($card->getAgents() !== null) {
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => PLACE_AGENT,
        'playerId' => $this->ctx->getPlayerId(),
        'agents' => $card->getAgents(),
        'empireId' => $card->getEmpire(),
        'optional' => false,
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

  public function argsTradeShiftOneShot()
  {

    $info = $this->ctx->getInfo();
    $cardId = $info['cardId'];

    $card = Cards::get($cardId);
    $oneShot = $card->getOneShot();
    // $empireId = $info['empireId'];
    // $agents = $info['agents'];



    $data = [
      'oneShot' => $oneShot,
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

  public function actTradeShiftOneShot($args)
  {
    self::checkAction('actTradeShiftOneShot');
    Notifications::log('actTradeShiftOneShot', $args);
    // $agent = $args['agent'];
    // $locationId = $args['locationId'];


    $this->resolveAction($args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getDiskDestination($cityId)
  {
    $options = $this->destinationMap[$cityId];
    $destinationId = Utils::array_find($options, function ($destinationId) {
      $city = Cities::get($destinationId);
      $token = $city->getToken();
      return $token === null || !Utils::startsWith($token->getId(), DISK);
    });
    return Cities::get($destinationId);
  }
}
