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

class PlaceAgent extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_PLACE_AGENT;
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

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsPlaceAgent()
  {
    // $player = Players::get();
    // $empireId = $this->ctx->getInfo()['empireId'];
    // $empire = Empires::get($empireId);
    // $cities = $empire->getCities();

    $info = $this->ctx->getInfo();
    $empireId = $info['empireId'];
    $agents = $info['agents'];

    $exludedLocationIds = isset($info['exludedLocationIds']) ? $info['exludedLocationIds'] : [];
    // $borders = ->getBorders();

    $data = [
      'agents' => $agents,
      // Assumption: card only place agents of the same type
      'locations' => $this->getLocations($empireId, $agents[0]['type'], $exludedLocationIds),
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

    $locationType = $stateArgs['locations'][$locationId]['type'];

    $player = self::getPlayer();

    $type = $agent['type'];
    $supply = Locations::supply($type, $type === PAWN ? $player->getBank() : $agent['religion']);

    Engine::insertAsChild(Flows::placeToken($player->getId(), $supply, $locationId, $locationType), $this->ctx);

    $agents = $stateArgs['agents'];

    if (count($agents) > 1) {
      $index = Utils::array_find_index($agents, function ($argAgent) use ($agent) {
        return $argAgent['type'] === $agent['type'] && $argAgent['religion'] === $agent['religion'];
      });
      unset($agents[$index]);
      $agents = array_values($agents);

      $this->ctx->insertAsBrother(new LeafNode([
        'action' => PLACE_AGENT,
        'playerId' => $this->ctx->getPlayerId(),
        'agents' => $agents,
        'empireId' => $this->ctx->getInfo()['empireId'],
        'exludedLocationIds' => [$locationId],
      ]));
    }

    $this->resolveAction($args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getLocations($empireId, $type, $exludedLocationIds)
  {
    $empires = $this->getEmpires($empireId);
    switch ($type) {
      case PIRATE:
      case PAWN:
        return $this->getBorders($empires, $type, $exludedLocationIds);
        break;
      case KNIGHT:
      case ROOK:
        return $this->getCities($empires, $type, $exludedLocationIds);
        break;
    }
  }

  private function getEmpires($empireId)
  {
    if (in_array($empireId, [EAST, WEST])) {
      return Empires::getRegion($empireId);
    } else {
      return [Empires::get($empireId)];
    }
  }

  private function getBorders($empires, $type, $exludedLocationIds)
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
      if (in_array($borderId, $exludedLocationIds)) {
        continue;
      }

      if (array_key_exists($borderId, $locations)) {
        continue;
      }
      if ($type === PIRATE && !$border->isSeaBorder()) {
        continue;
      }

      if ($type === PAWN) {
        $tokenInLocation = $border->getToken();
        if ($tokenInLocation !== null && $tokenInLocation->getType() === PIRATE) {
          continue;
        } else if ($tokenInLocation !== null) {
          $locations[$borderId] = [
            'id' => $borderId,
            'type' => BORDER,
            'cost' => 1,
            'name' => $border->getName(),
            'repressed' => $tokenInLocation,
          ];
          continue;
        }
      }

      $locations[$borderId] = [
        'id' => $borderId,
        'type' => BORDER,
        'cost' => 0,
        'name' => $border->getName(),
      ];
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

  private function getCities($empires, $type, $exludedLocationIds)
  {
    $cities = array_merge(...array_map(function ($empire) {
      return $empire->getCities();
    }, $empires));

    $player = self::getPlayer();
    $florins = $player->getFlorins();

    $locations = [];
    foreach ($cities as $city) {
      $cityId = $city->getId();
      if (in_array($cityId, $exludedLocationIds)) {
        continue;
      }

      $token = $city->getToken();
      if ($token === null) {
        $locations[$cityId] = [
          'id' => $cityId,
          'type' => CITY,
          'cost' => 0,
          'name' => $city->getName(),
        ];
      } else if ($token->getType() === DISK || $florins === 0) {
        continue;
      } else {
        $locations[$cityId] = [
          'id' => $cityId,
          'type' => CITY,
          'cost' => 1,
          'name' => $city->getName(),
          'repressed' => $token,
        ];
      }
    }

    return $locations;
  }
}
