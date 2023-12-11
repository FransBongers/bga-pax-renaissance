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

  public function argsPlayerAction()
  {
    $player = Players::get();
    $availableOps = $player->getAvailableOps();

    $cardsPlayerCanSell = $player->getCardsPlayerCanSell();
    unset($cardsPlayerCanSell['hand']);
    // Return possible actions
    $data = [
      'remainingActions' => Globals::getRemainingActions(),
      'cardsPlayerCanPurchase' => Market::getCardsPlayerCanPurchase($player),
      'cardsPlayerCanSell' => $cardsPlayerCanSell,
      'tradeFair' => Market::getTradeFairs(),
      'availableOps' => $availableOps,
    ];

    return $data;
  }

  // public function actPlayerAction($cardId, $strength)
  public function actPlayerAction($args)
  {
    self::checkAction('actPlayerAction');
    $parent = $this->ctx->getParent();
    // Notifications::log('actPlayerAction', $args);
    switch ($args['action']) {
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
            ]
          ]
        ]));
        break;
      case 'tableauOps':
        $this->ctx->insertAsBrother(Engine::buildTree([
          'children' => [
            [
              'action' => $args['region'] === EAST ? TABLEAU_OPS_SELECT_EAST : TABLEAU_OPS_SELECT_WEST,
              'playerId' => $this->ctx->getPlayerId(),
              'region' => $args['region'],
            ]
          ]
        ]));
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
}
