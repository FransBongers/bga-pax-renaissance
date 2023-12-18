<?php

namespace PaxRenaissance\Actions;
// use PaxRenaissance\Managers\Meeples;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\ActionCards;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Utils;

class SellCard extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_SELL_CARD;
  }

  public function stSellCard()
  {
    $cardId = $this->ctx->getCardId();
    $player = self::getPlayer();
    $cardsPlayerCanSell =  $player->getCardsPlayerCanSell();


    $card = Utils::array_find($cardsPlayerCanSell, function ($card) use ($cardId) {
      return $card->getId() === $cardId;
    });

    if ($card === null) {
      throw new \feException("Not allowed to sell card");
    }
    $card->sell($player);

    $this->resolveAction(['cardId' => $cardId]);
  }
}
