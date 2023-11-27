<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;

class PurchaseCard extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_PURCHASE_CARD;
  }

  public function stPurchaseCard()
  {
    // Notifications::log('stPurchaseCard', $this->ctx->getCardId());
    $cardId = $this->ctx->getCardId();
    $player = self::getPlayer();
    $availableCards = Market::getCardsPlayerCanPurchase($player);

    $card = Utils::array_find($availableCards, function ($card) use ($cardId) {
      return $card->getId() === $cardId;
    });

    if ($card === null) {
      throw new \feException("Not allowed to purchase card");
    }
    Globals::incRemainingActions(-1);
    // Notifications::log('card',$card);
    $card->purchase($player, $this->ctx);

    $this->resolveAction(['cardId' => $cardId]);
  }
}
