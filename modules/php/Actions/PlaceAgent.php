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

class PlaceAgent extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_PLACE_AGENT;
  }

  public function stPlaceAgent()
  {
    // $args = self::getPossibleLevies();
    // if (count($args['possibleLevies']) === 0) {
    //   $this->resolveAction([]);
    // } else if (count($args['possibleLevies']) === 1) {
    //   $this->actTradeFairLevy([
    //     'cityId' => array_keys($args['possibleLevies'])[0]
    //   ]);
    // }
  }

  public function argsPlaceAgent()
  {
    // $player = Players::get();
    // $empireId = $this->ctx->getInfo()['empireId'];
    // $empire = Empires::get($empireId);
    // $cities = $empire->getCities();

    $info = $this->ctx->getInfo();
    $empireId = $info['empire'];
    $agents = $info['agents'];

    // $borders = ->getBorders();

    $data = [
      'agents' => $agents,
      'locations' => $this->getBorders($this->getEmpires($empireId), $agents[0]['type']),
      // 'info' => ,
      // 'possibleLevies' => [],
      // 'empire' => $empire,
    ];


    // foreach($cities as $city) {
    //   $levy = $city->getPossibleLevy();
    //   if ($levy !== null) {
    //     $data['possibleLevies'][$city->getId()] = [
    //       'cityName' => $city->getName(),
    //       'levy' => $levy
    //     ];
    //   }
    // }

    return $data;
  }

  // public function actPlayerAction($cardId, $strength)
  public function actPlaceAgent($args)
  {
    self::checkAction('actPlaceAgent');
    $agent = $args['agent'];
    $locationId = $args['locationId'];

    Notifications::log('agent', $agent);
    Notifications::log('locationId', $locationId);

    $stateArgs = $this->argsPlaceAgent();
    
    // Notifications::log('argsPlaceAgent', $this->argsPlaceAgent());

    if (!array_key_exists($locationId, $stateArgs['locations'])) {
      throw new \feException("Not allowed to place Agent on selected location");  
    }

    $player = self::getPlayer();

    $type = $agent['type'];
    $supply = Locations::supply($type, $type === PAWN ? $player->getBank() : $agent['religion']);
    $token = Tokens::getTopOf($supply);

    Notifications::log('token',$token);
    // TODO: handle empty splice
    if (Utils::startsWith($locationId, 'border')) {
      Borders::get($locationId)->placeAgent($token);
    } else {
      Cities::get($locationId)->placeAgent($token);
    }

    // $cityId = $args['cityId'];

    // $possible = self::getPossibleLevies();

    // if (!isset($possible['possibleLevies'][$cityId])) {
    //   throw new \feException("Not allowed to place Levy in selected City");
    // }
    // $levy = $possible['possibleLevies'][$cityId]['levy'];

    // $location = Locations::supply($levy['levyIcon'], $levy['religion']);

    // $token = Tokens::getTopOf($location);

    // // TODO: check what to do if supply is empty
    // if ($token !== null) {
    //   $token = $token->move($cityId);
    //   // Tokens::move($piece['id'], $cityId);
    //   // $piece['location'] = $cityId;
    //   Notifications::tradeFairPlaceLevy(self::getPlayer(),Cities::get($cityId),$token);
    // }

    // // $this->ctx->insertAsBrother(new LeafNode([
    // //   'action' => PURCHASE_CARD,
    // //   'playerId' => $this->ctx->getPlayerId(),
    // //   'args' => [
    // //     'cardId' => $args['cardId'],
    // //   ],
    // // ]));

    $this->resolveAction($args);
  }

  private function getEmpires($empireId)
  {
    if (in_array($empireId, [EAST, WEST])) {
      return Empires::getRegion($empireId);
    } else {
      return [Empires::get($empireId)];
    }
  }

  private function getBorders($empires, $type)
  {
    $borders = array_merge(...array_map(function ($empire) {
      return $empire->getBorders();
    }, $empires));
    // $borders = array_map(function ($empire) {
    //   return $empire->getBorders();
    // }, $empires);
    $locations = [];

    foreach ($borders as $border) {
      $borderId = $border->getId();
      if (array_key_exists($borderId, $locations)) {
        continue;
      }
      if ($type === PIRATE && !$border->isSeaBorder()) {
        continue;
      }
      $locations[$borderId] = $border;
    }

    // foreach ($empires as $empire) {
    //   $borders = 
    //   $seaBorders = Utils::filter($borders, function ($border) {
    //     return $border->isSeaBorder();
    //   });
    //   $locations = array_merge($locations, $seaBorders);
    // }
    return $locations;
  }
}
