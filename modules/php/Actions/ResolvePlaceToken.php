<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine;
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

class ResolvePlaceToken extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_RESOLVE_PLACE_TOKEN;
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

  public function stResolvePlaceToken()
  {

    $info = $this->ctx->getParent()->getInfo();
    Notifications::log('stResolvePlaceToken',$info);
    $locationId = $info['toLocationId'];
    $locationType = $info['toLocationType'];
    $repressCost = $info['repressCost'];
    $supply = $info['fromSupply'];
    $empireId = isset($info['empireId']) ? $info['empireId'] : null;

    // $locationType = $stateArgs['locations'][$locationId]['type'];

    // $player = self::getPlayer();

    // $type = $agent['type'];
    // $supply = Locations::supply($type, $type === PAWN ? $player->getBank() : $agent['separator']);

    $token = isset($info['tokenId']) ? Tokens::get($info['tokenId']) : Tokens::getTopOf($supply);

    Notifications::log('token to place',$token);

    
    // Supply is empty and no token has been selected yet
    if ($token === null) {
      // Push child in front to select token
      $this->ctx->getParent()->unshiftChild(
        new LeafNode([
          'action' => SELECT_TOKEN,
          'playerId' => $this->ctx->getPlayerId(),
          'fromSupply' => $supply
        ])
      );

      Engine::save();
      Engine::proceed();
      return;
    }
    
    Notifications::log('token', $token);
    if ($locationType === BORDER) {
      Borders::get($locationId)->placeToken($token, $empireId, $repressCost);
    } else if ($locationType === CITY) {
      Cities::get($locationId)->placeToken($token, $repressCost);
    } else if ($locationType === TABLEAU_CARD) {
      Cards::get($locationId)->placeToken($token, $this->ctx);
    } else if ($locationType === EMPIRE_CARD) {
      Cards::get($locationId)->placeToken($token, $this->ctx);
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
