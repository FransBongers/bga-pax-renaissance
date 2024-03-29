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
  private $tableauOpsActionMap = [
    EAST => TABLEAU_OPS_SELECT_EAST,
    WEST => TABLEAU_OPS_SELECT_WEST,
    EAST_AND_WEST => TABLEAU_OPS_SELECT_EAST_AND_WEST,
  ];

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
    Stats::incPassActionCount($player->getId(), 1);
    Engine::resolve(PASS);
  }

  // public function actPlayerAction($cardId, $strength)
  public function actPlayerAction($args)
  {
    self::checkAction('actPlayerAction');
    $player = self::getPlayer();
    $playerId = $player->getId();
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
        Stats::incPlayCardCount($playerId, 1);
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
        Stats::incPurchaseCardCount($playerId, 1);
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
        Stats::incSellActionCount($playerId, 1);
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
        $action = $this->tableauOpsActionMap[$args['region']];
        if ($action === TABLEAU_OPS_SELECT_EAST_AND_WEST && !$player->hasSpecialAbility(SA_EAST_AND_WEST_OPS_IN_ONE_ACTION)) {
          throw new \feException("Not allowed to perform east and west ops in one action");
        }
        $this->incTableauOpsStat($playerId, $action);
        Notifications::tableauOpsAction($player, $action);
        $this->ctx->insertAsBrother(Engine::buildTree([
          'children' => [
            [
              'action' => $action,
              'playerId' => $this->ctx->getPlayerId(),
              'region' => $args['region'],
              'firstOp' => $args['firstOp'],
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
        if ($args['region'] === EAST) {
          Stats::incTradeFairEastActionCount($playerId, 1);
        } else if ($args['region'] === WEST) {
          Stats::incTradeFairWestActionCount($playerId, 1);
        }
        $freeTradeFair = $player->hasSpecialAbility(SA_FREE_TRADE_FAIR) && count(Engine::getResolvedActions([TRADE_FAIR_FREE])) === 0;
        if ($freeTradeFair) {
          Engine::insertExtraPlayerAction($player);
        }
        $this->ctx->insertAsBrother(Engine::buildTree([
          'children' => [
            [
              'action' => $freeTradeFair ? TRADE_FAIR_FREE : TRADE_FAIR,
              'playerId' => $this->ctx->getPlayerId(),
              'region' => $args['region'],
            ]
          ]
        ]));
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

  private function incTableauOpsStat($playerId, $action)
  {
    switch ($action) {
      case TABLEAU_OPS_SELECT_EAST:
        Stats::incTableauOpsEastActionCount($playerId, 1);
        break;
      case TABLEAU_OPS_SELECT_WEST:
        Stats::incTableauOpsWestActionCount($playerId, 1);
        break;
      case TABLEAU_OPS_SELECT_EAST_AND_WEST:
        Stats::incTableauOpsEastActionCount($playerId, 1);
        Stats::incTableauOpsWestActionCount($playerId, 1);
        break;
    }
  }
}
