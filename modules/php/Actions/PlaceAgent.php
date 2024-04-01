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
    $options = $this->getOptions();

    $isOptional = $this->getOptional($options);
    $this->ctx->updateInfo('optional', $isOptional);

    Engine::save();
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
    $options = $this->getOptions();

    // We need to set here since this is executed before state function can update it.
    $isOptional = $this->getOptional($options);
    $this->ctx->updateInfo('optional', $isOptional);

    return $options;
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

  public function actPassPlaceAgent()
  {
    Engine::resolve(PASS);
  }

  public function actPlaceAgent($args)
  {
    self::checkAction('actPlaceAgent');
    $agent = $args['agent'];
    $locationId = $args['locationId'];

    $options = $this->getOptions();


    if (!array_key_exists($locationId, $options['locations'])) {
      throw new \feException("Not allowed to place Agent on selected location");
    }
    $info = $this->ctx->getInfo();
    $type = $agent['type'];

    $locationType = $type === BISHOP ? $options['locations'][$locationId]->getType() : $options['locations'][$locationId]['type'];
    $player = self::getPlayer();
    $supply = Locations::supply($type, $type === PAWN ? $player->getBank() : $agent['separator']);

    $cost = $type !== BISHOP && isset($options['locations'][$locationId]['cost']) ? $options['locations'][$locationId]['cost'] : 0;

    Engine::insertAsChild(Flows::placeToken($player->getId(), $supply, $locationId, $locationType, isset($args['empireId']) ? $args['empireId'] : $info['empireId'], $cost), $this->ctx);


    $this->insertNextAgentAction($options, $agent, $locationId);

    $this->resolveAction($args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getOptional($options)
  {
    $info = $this->ctx->getInfo();
    $source = isset($info['source']) ? $info['source'] : null;

    // Source is null if there is no one-shot, one-shot cannot be executed or player chooses not to 
    // perform one-shot
    if ($source === null || $source === REGIME_CHANGE_CONCESSION) {
      return true;
    }

    // For everything below source is a one-shot. Placement is not optional as long as empire is not saturated.

    if ($options['agents'][0]['type'] === BISHOP) {
      return false;
    }

    $hasEmptyPlacement = Utils::array_some($options['locations'], function ($location) {
      if (isset($location['tokenToRepress']) && $location['tokenToRepress'] !== null) {
        return false;
      }
      if (isset($location['tokenToKill']) && $location['tokenToKill'] !== null) {
        return false;
      }
      return true;
    });

    if ($hasEmptyPlacement) {
      return false;
    } else {
      return true;
    }
  }

  private function insertNextAgentAction($options, $agent, $locationId)
  {
    $agents = $options['agents'];
    $info = $this->ctx->getInfo();
    $optional = $this->ctx->isOptional();
    $source = isset($info['source']) ? $info['source'] : null;

    if (count($agents) > 1) {
      $index = Utils::array_find_index($agents, function ($argAgent) use ($agent) {
        return $argAgent['type'] === $agent['type'] && $argAgent['separator'] === $agent['separator'];
      });
      unset($agents[$index]);
      $agents = array_values($agents);

      $this->ctx->insertAsBrother(new LeafNode([
        'action' => PLACE_AGENT,
        'playerId' => $this->ctx->getPlayerId(),
        'agents' => $agents,
        'empireId' => $this->ctx->getInfo()['empireId'],
        'optional' => $optional,
        'source' => $source,
        'placedAgent' => [
          'agent' => $agent,
          'locationId' => $locationId,
        ],
      ]));
    }
  }

  private function getOptions()
  {
    $info = $this->ctx->getInfo();
    $empireId = $info['empireId'];
    $agents = $info['agents'];

    $player = self::getPlayer();
    // Assumption: card only place agents of the same type
    $type = $agents[0]['type'];

    $playerHasFlorins = $player->getFlorins() > 0;

    $excludedLocationId = null;
    if (
      isset($info['placedAgent'])
      // && $info['placedAgent']['agent']['separator'] === $agents[0]['separator'] &&
      // $info['placedAgent']['agent']['type'] === $agents[0]['type']
    ) {
      $excludedLocationId = $info['placedAgent']['locationId'];
    }
    $locations = $this->getLocations($playerHasFlorins, $empireId, $type, $excludedLocationId);
    return [
      'agents' => $agents,
      'locations' => $locations,
    ];
  }


  private function getLocations($playerHasFlorins, $empireId, $type, $excludedLocationId)
  {
    $empires = $this->getEmpires($empireId);
    switch ($type) {
      case PIRATE:
      case PAWN:
        return $this->getBorders($playerHasFlorins, $empireId, $type, $excludedLocationId);
        break;
      case KNIGHT:
      case ROOK:
        return $this->getCities($playerHasFlorins, $empires, $type, $excludedLocationId);
        break;
      case BISHOP:
        return $this->getCards($empireId, $type, $excludedLocationId);
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

  private function getBorders($playerHasFlorins, $empireId, $type, $excludedLocationId)
  {
    $empires = $this->getEmpires($empireId);
    $borders = array_merge(...array_map(function ($empire) {
      return $empire->getBorders();
    }, $empires));

    $locations = [];

    foreach ($borders as $border) {
      $borderId = $border->getId();
      if ($excludedLocationId !== null && $borderId === $excludedLocationId) {
        continue;
      }
      if (array_key_exists($borderId, $locations)) {
        continue;
      }
      if ($type === PIRATE && !$border->isSeaBorder()) {
        continue;
      }

      $tokensInLocation = $border->getTokens();
      $hasTokens = count($tokensInLocation) > 0;

      if ($type === PAWN) {

        $hasPirate = $hasTokens && Utils::array_some($tokensInLocation, function ($tokenInLocation) {
          return $tokenInLocation->getType() === PIRATE;
        });
        $hasTokenAndPlayerCannotPay = $hasTokens && !$playerHasFlorins;
        if ($hasPirate || $hasTokenAndPlayerCannotPay) {
          continue;
        } else if ($hasTokens) {
          $locations[$borderId] = [
            'id' => $borderId,
            'type' => BORDER,
            'cost' => 1,
            'name' => $border->getName(),
            'tokenToRepress' => [
              'token' => $tokensInLocation[0], // There is no pirate so there can only be one pawn
              'empires' => in_array($empireId, REGIONS) ? $border->getAdjacentEmpires() : null, // Only set if player needs to select an empire?
            ],
          ];
          continue;
        } else {
          $locations[$borderId] = [
            'id' => $borderId,
            'type' => BORDER,
            'cost' => 0,
            'name' => $border->getName(),
            'tokenToRepress' => null
          ];
        }
      } else if ($type === PIRATE) {
        $tokenToKill = null;

        if ($hasTokens) {
          foreach ($tokensInLocation as $currentToken) {
            if ($currentToken->getType() === PAWN && $currentToken->getOwner()->hasSpecialAbility(SA_CONCESSIONS_CANNOT_BE_KILLED_BY_PIRATES)) {
              continue;
            }
            $tokenToKill = $currentToken;
          }
        };

        $locations[$borderId] = [
          'id' => $borderId,
          'type' => BORDER,
          'cost' => 0,
          'name' => $border->getName(),
          'tokenToKill' => $tokenToKill,
        ];
      }
    }

    return $locations;
  }

  private function getCards($empireId, $type, $excludedLocationId)
  {

    $cards = array_merge(Cards::getAllCardsInTableaux(), Cards::getAllCardsInThrones()->toArray());
    $validEmpireIds = [$empireId];
    if (in_array($empireId, [WEST, EAST])) {
      $regionEmpireIds = array_map(function ($empire) {
        return $empire->getId();
      }, Empires::getRegion($empireId));
      $validEmpireIds = array_merge($validEmpireIds, $regionEmpireIds);
    } else {
      $validEmpireIds[] = Empires::get($empireId)->getRegion();
    }

    $locations = [];
    foreach ($cards as $card) {
      // Skip for cards for now as there can lead to a situation where the game is stuck and only option is undo
      // (ie, Oratory of Divine Love discards itself with apostasy One-shot).
      // if ($excludedLocationId !== null && $card->getId() === $excludedLocationId) {
      //   continue;
      // }
      if (in_array($card->getEmpireId(), $validEmpireIds)) {
        $locations[$card->getId()] = $card;
      }
    }
    return $locations;
  }

  private function getCities($playerHasFlorins, $empires, $type, $excludedLocationId)
  {
    $cities = array_merge(...array_map(function ($empire) {
      return $empire->getCities();
    }, $empires));

    $locations = [];
    foreach ($cities as $city) {
      $cityId = $city->getId();
      if ($excludedLocationId !== null && $cityId === $excludedLocationId) {
        continue;
      }

      $token = $city->getToken();
      if ($token === null) {
        $locations[$cityId] = [
          'id' => $cityId,
          'type' => CITY,
          'cost' => 0,
          'name' => $city->getName(),
          'tokenToRepress' => null,
        ];
      } else if ($token->getType() === DISK || !$playerHasFlorins) {
        continue;
      } else {
        $locations[$cityId] = [
          'id' => $cityId,
          'type' => CITY,
          'cost' => 1,
          'name' => $city->getName(),
          'tokenToRepress' => [
            'token' => $token,
            'empires' => null
          ],
        ];
      }
    }

    return $locations;
  }
}
