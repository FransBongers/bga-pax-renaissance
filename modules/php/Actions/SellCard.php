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
    $king = $royalCouple['king'];
    $queens = $royalCouple['queens'];
    $value = $this->getTotalValueRoyalCouple($player, $king, $queens);

    Players::incFlorins($player->getId(), $value);

    

    Notifications::sellRoyalCouple($player, $king, $queens, $value);
    $king->returnToThrone();
  }


  private function sellCard($player, $cardsPlayerCanSell, $cardId)
  {
    $card = Utils::array_find($cardsPlayerCanSell['cards'], function ($card) use ($cardId) {
      return $card->getId() === $cardId;
    });

    if ($card === null) {
      throw new \feException("Not allowed to sell card");
    }

    $playerId = $player->getId();

    $value = $card->getSellValue($player);
    Players::incFlorins($playerId, $value);

    Notifications::sellCard($player, $card, $value);

    $card->sell();
  }

  private function getTotalValueRoyalCouple($player, $king, $queens) {
    $totalValue = $king->getSellValue();
    foreach($queens as $queen) {
      $totalValue += $queen->getSellValue();
    }
    return $totalValue;
  }
}
