<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;

class PlayerAction extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_PLAYER_ACTION;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsPlayerAction()
  {
    $player = self::getPlayer();
    $playerId = $player->getId();
    $availableOps = $player->getAvailableOps();
    $remainingActions = count(Engine::getUnresolvedActions([PLAYER_ACTION]));
    // Return possible actions
    $data = [
      'remainingActions' => $remainingActions,
      'cardsPlayerCanPurchase' => Market::getCardsPlayerCanPurchase($player),
      'tradeFair' => Market::getTradeFairs(),
      'availableOps' => $availableOps,
      'declarableVictories' => $this->getDeclarableVictrories($player),
      // 'cardsPlayerCanSell' => $player->getCardsPlayerCanSell(),
      'abilityActions' => $player->getAbilityActions(),
      '_private' => [
        $playerId => [
          'cardsPlayerCanSell' => $player->getCardsPlayerCanSell(),
        ]
      ]
    ];

    // args['_private'][specificPid]=

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

  public function actPassPlayerAction()
  {
    $player = self::getPlayer();
    Notifications::passPlayerAction($player);
    Engine::resolve(PASS);
  }

  // public function actPlayerAction($cardId, $strength)
  public function actPlayerAction($args)
  {
    self::checkAction('actPlayerAction');
    $player = self::getPlayer();
    $parent = $this->ctx->getParent();
    // Notifications::log('actPlayerAction', $args);
    switch ($args['action']) {
      case 'abilityAction':
        $this->ctx->insertAsBrother(Engine::buildTree([
          'children' => [
            [
              'action' => ABILITY_ACTION_USE,
              'playerId' => $this->ctx->getPlayerId(),
              'cardId' => $args['cardId'],
              'abilityId' => $args['abilityId'],
              'source' => PLAYER_ACTION,
            ]
          ]
        ]));
        break;
      case 'declareVictory':
        $this->ctx->insertAsBrother(Engine::buildTree([
          'children' => [
            [
              'action' => DECLARE_VICTORY,
              'playerId' => $this->ctx->getPlayerId(),
              'cardId' => $args['cardId'],
            ]
          ]
        ]));
        break;
      case 'playCard':
        $this->ctx->insertAsBrother(Engine::buildTree([
          'children' => [
            [
              'action' => PLAY_CARD,
              'playerId' => $this->ctx->getPlayerId(),
              'cardId' => $args['cardId'],
            ]
          ]
        ]));
        break;
      case 'purchaseCard':
        $this->ctx->insertAsBrother(Engine::buildTree([
          'children' => [
            [
              'action' => PURCHASE_CARD,
              'playerId' => $this->ctx->getPlayerId(),
              'cardId' => $args['cardId'],
            ]
          ]
        ]));
        break;
      case 'sellCard':
        $this->ctx->insertAsBrother(Engine::buildTree([
          'children' => [
            [
              'action' => SELL_CARD,
              'playerId' => $this->ctx->getPlayerId(),
              'cardId' => $args['cardId'],
              'royalCouple' => $args['royalCouple'],
            ]
          ]
        ]));
        break;
      case 'tableauOps':
        $action = $args['region'] === EAST ? TABLEAU_OPS_SELECT_EAST : TABLEAU_OPS_SELECT_WEST;
        $this->ctx->insertAsBrother(Engine::buildTree([
          'children' => [
            [
              'action' => $action,
              'playerId' => $this->ctx->getPlayerId(),
              'region' => $args['region'],
            ]
          ]
        ]));
        if ($action === TABLEAU_OPS_SELECT_EAST && $player->hasSpecialAbility(SA_FREE_EASTERN_OPS)) {
          Engine::insertExtraPlayerAction($player);
        } else if ($action === TABLEAU_OPS_SELECT_WEST && $player->hasSpecialAbility(SA_FREE_WESTERN_OPS)) {
          Engine::insertExtraPlayerAction($player);
        }
        break;
      case 'tradeFair':
        $this->ctx->insertAsBrother(Engine::buildTree([
          'children' => [
            [
              'action' => TRADE_FAIR,
              'playerId' => $this->ctx->getPlayerId(),
              'region' => $args['region'],
            ]
          ]
        ]));
        if ($player->hasSpecialAbility(SA_FREE_TRADE_FAIR) && count(Engine::getResolvedActions([TRADE_FAIR])) === 0) {
          Engine::insertExtraPlayerAction($player);
        }
        break;
    }


    // $this->ctx->insertAsBrother(new LeafNode([
    //   'action' => PURCHASE_CARD,
    //   'playerId' => $this->ctx->getPlayerId(),
    //   'args' => [
    //     'cardId' => $args['cardId'],
    //   ],
    // ]));

    $this->resolveAction($args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getDeclarableVictrories($player)
  {
    return Utils::filter(Cards::getVictoryCards(), function ($victoryCard) use ($player) {
      return $victoryCard->canBeDeclaredByPlayer($player);
    });
  }
}
