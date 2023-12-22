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
    $royalCouple = $this->ctx->getInfo()['royalCouple'];

    if ($royalCouple) {
      $this->sellRoyalCouple($player, $cardsPlayerCanSell, $cardId);
    } else {
      $this->sellCard($player, $cardsPlayerCanSell, $cardId);
    }


    $this->resolveAction(['cardId' => $cardId]);
  }

  private function sellRoyalCouple($player, $cardsPlayerCanSell, $cardId)
  {
    $royalCouple = Utils::array_find($cardsPlayerCanSell['royalCouples'], function ($couple) use ($cardId) {
      return $couple['king']->getId() === $cardId;
    });

    if ($royalCouple === null) {
      throw new \feException("Not allowed to sell card");
    }

    $royalCouple['king']->sellRoyalCouple($player, $royalCouple['queen']);
  }

  private function sellCard($player, $cardsPlayerCanSell, $cardId)
  {
    $card = Utils::array_find($cardsPlayerCanSell['cards'], function ($card) use ($cardId) {
      return $card->getId() === $cardId;
    });

    if ($card === null) {
      throw new \feException("Not allowed to sell card");
    }
    $card->sell($player);
  }
}
