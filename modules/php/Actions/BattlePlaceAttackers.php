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

class BattlePlaceAttackers extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_BATTLE_PLACE_ATTACKERS;
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

  public function stBattlePlaceAttackers()
  {
    $options = $this->getOptions();
    if (count($options['agents']) + count($options['repressedTokens']) === 0) {
      $this->repressRemaining();
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

  public function argsBattlePlaceAttackers()
  {
    $options = $this->getOptions();

    $data = [
      'options' => $options,
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

  public function actBattlePlaceAttackers($args)
  {
    self::checkAction('actBattlePlaceAttackers');

    if (isset($args['agent'])) {
      $this->handlePlaceAgent($args);
    } else if (isset($args['tokenId'])) {
      $this->handlePlaceRepressedToken($args);
    } else {
      throw new \feException("Not a valid option");
    }

    $info = $this->ctx->getInfo();
    $agents = $info['agents'];
    $repressedTokens = $info['repressedTokens'];

    if (count($agents) + count($repressedTokens) > 0) {
      $this->ctx->getParent()->pushChild(new LeafNode([
        'action' => BATTLE_PLACE_ATTACKERS,
        'playerId' => $this->ctx->getPlayerId(),
        'agents' => $agents,
        'empireId' => $info['empireId'],
        'optional' => false,
        'repressedTokens' => $repressedTokens,
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

  private function getOptions()
  {
    $info = $this->ctx->getInfo();
    $empireId = $info['empireId'];
    $empire = Empires::get($empireId);
    $borders = $empire->getBorders(true);
    $cities = $empire->getCities(true);
    $seaBorders = Utils::filter($borders, function ($border) {
      return $border->isSeaBorder();
    });

    $hasEmptyBorders = count($borders) > 0;
    $hasEmptyCities = count($cities) > 0;
    $hasEmptySeaborders = count($seaBorders) > 0;

    $agentOptions = [];
    $repressedTokenOptions = [];


    $agents = $info['agents'];
    $repressedTokens = $info['repressedTokens'];

    foreach ($agents as $agent) {
      $type = $agent['type'];
      switch ($type) {
        case PIRATE:
          if ($hasEmptySeaborders) {
            $agentOptions[] = [
              'agent' => $agent,
              'locations' => $seaBorders
            ];
          }
          break;
        case PAWN:
          if ($hasEmptyBorders) {
            $agentOptions[] = [
              'agent' => $agent,
              'locations' => $borders
            ];
          }
          break;
        case KNIGHT:
        case ROOK:
          if ($hasEmptyCities) {
            $agentOptions[] = [
              'agent' => $agent,
              'locations' => $cities
            ];
          }
          break;
        default:
          // Notifications::log('No match for agent type', []);
      }
    }

    foreach ($repressedTokens as $repressedTokenId) {
      $token = Tokens::get($repressedTokenId);
      $type = $token->getType();
      switch ($type) {
        case PIRATE: // should never happen
        case PAWN:
          if ($hasEmptyBorders) {
            $repressedTokenOptions[] = [
              'token' => $token,
              'locations' => $borders
            ];
          }
          break;
        case KNIGHT:
        case ROOK:
          if ($hasEmptyCities) {
            $repressedTokenOptions[] = [
              'token' => $token,
              'locations' => $cities
            ];
          }
          break;
        default:
          // Notifications::log('No match for token type', []);
      }
    }

    return [
      'agents' => $agentOptions,
      'repressedTokens' => $repressedTokenOptions,
    ];
  }

  private function handlePlaceAgent($args)
  {
    $agent = $args['agent'];
    $locationId = $args['locationId'];

    // Validate
    $options = $this->getOptions();
    $option = Utils::array_find($options['agents'], function ($option) use ($agent) {
      return $option['agent']['type'] === $agent['type'] && $option['agent']['separator'] === $agent['separator'];
    });

    if ($option === null) {
      throw new \feException("Not allowed to place selected Agent");
    }

    $location = Utils::array_find($option['locations'], function ($loc) use ($locationId) {
      return $loc->getId() === $locationId;
    });

    if ($location === null) {
      throw new \feException("Not allowed to place Agent on selected location");
    }


    $info = $this->ctx->getInfo();

    // Add placeToken flow to engine
    $type = $agent['type'];
    $repressCost = 0;
    $locationType = $location->getType();
    $player = self::getPlayer();
    $supply = Locations::supply($type, $type === PAWN ? $player->getBank() : $agent['separator']);
    $this->ctx->getParent()->pushChild(Engine::buildTree(Flows::placeToken($player->getId(), $supply, $locationId, $locationType, isset($args['empireId']) ? $args['empireId'] : $info['empireId'], $repressCost), $this->ctx));

    // Update agent info (needed to determine if we need to palce more attackers)
    $agents = $info['agents'];
    $index = Utils::array_find_index($agents, function ($argAgent) use ($agent) {
      return $argAgent['type'] === $agent['type'] && $argAgent['separator'] === $agent['separator'];
    });
    unset($agents[$index]);
    $agents = array_values($agents);
    $this->ctx->updateInfo('agents', $agents);
  }

  private function handlePlaceRepressedToken($args)
  {
    $tokenId = $args['tokenId'];
    $locationId = $args['locationId'];

    // Validate
    $options = $this->getOptions();
    $option = Utils::array_find($options['repressedTokens'], function ($option) use ($tokenId) {
      return $option['token']->getId() === $tokenId;
    });

    if ($option === null) {
      throw new \feException("Not allowed to place selected Token");
    }

    $location = Utils::array_find($option['locations'], function ($loc) use ($locationId) {
      return $loc->getId() === $locationId;
    });

    if ($location === null) {
      throw new \feException("Not allowed to place Token on selected location");
    }

    // Move token
    $option['token']->move($locationId);

    // Update info for remaining tokens
    $info = $this->ctx->getInfo();
    $repressedTokens = Utils::filter($info['repressedTokens'], function ($id) use ($tokenId) {
      return $id !== $tokenId;
    });
    $this->ctx->updateInfo('repressedTokens', $repressedTokens);
  }

  private function repressRemaining()
  {
    $info = $this->ctx->getInfo();
    $empireId = $info['empireId'];
    $empire = Empires::get($empireId);

    $player = self::getPlayer();

    $agents = Utils::filter($info['agents'], function ($agent) {
      return $agent['type'] !== PIRATE;
    });


    // We only need to repress remaining agents, since the tokens are repressed already
    if (count($agents) > 0) {
      Notifications::repressRemainingAttackers($player);
      foreach ($agents as $agent) {
        $type = $agent['type'];
        $repressCost = 0;
        $locationType = EMPIRE_CARD;
        $player = self::getPlayer();
        $supply = Locations::supply($type, $type === PAWN ? $player->getBank() : $agent['separator']);
        $locationId = $empire->getEmpireSquareId();
        $this->ctx->getParent()->pushChild(Engine::buildTree(Flows::placeToken($player->getId(), $supply, $locationId, $locationType, $empireId, $repressCost), $this->ctx));
      }
    }
  }
}
