<?php

namespace PaxRenaissance\Actions;
// use PaxRenaissance\Managers\Meeples;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\ActionCards;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Utils;

class PlayerAction extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_PLAYER_ACTION;
  }

  public function argsPlayerAction()
  {
    $player = Players::get();

    $cardsPlayerCanSell = $player->getCardsPlayerCanSell();
    unset($cardsPlayerCanSell['hand']);
    // Return possible actions
    $data = [
      'remainingActions' => Globals::getRemainingActions(),
      'cardsPlayerCanPurchase' => Market::getCardsPlayerCanPurchase($player),
      'cardsPlayerCanSell' => $cardsPlayerCanSell,
    ];

    return $data;
  }

  // public function actPlayerAction($cardId, $strength)
  public function actPlayerAction($args)
  {
    self::checkAction('actPlayerAction');
    // Notifications::log('actPlayerAction', $args);
    switch ($args['action']) {
      case 'purchaseCard':
        Engine::insertAsChild([
          'action' => PURCHASE_CARD,
          'playerId' => $this->ctx->getPlayerId(),
          'cardId' => $args['cardId'],
        ]);
        break;
      case 'sellCard':
        Engine::insertAsChild([
          'action' => SELL_CARD,
          'playerId' => $this->ctx->getPlayerId(),
          'cardId' => $args['cardId'],
        ]);
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
