<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\ActionCards;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Utils;

class SellCard extends \PaxRenaissance\Models\AtomicAction
{

  private $machiavellianismOneShots = [
    PEASANT_REVOLT_ONE_SHOT,
    CONSPIRACY_ONE_SHOT,
    CRUSADE_ONE_SHOT,
    APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT,
    APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT,
    APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT,
  ];

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

    if (!$player->hasSpecialAbility(SA_SELL_AND_PERFORM_ONE_SHOT)) {
      return;
    }

    $oneShot = null;
    if ($card->getType() === TABLEAU_CARD) {
      $card->getOneShot();
    }
    if ($oneShot !== null && in_array($oneShot, $this->machiavellianismOneShots)) {
      $this->ctx->insertAsBrother(new LeafNode(
        [
          'action' => ANNOUNCE_ONE_SHOT,
          'playerId' => $this->ctx->getPlayerId(),
          'cardId' => $cardId,
        ]
      ));
    }
  }

  private function getTotalValueRoyalCouple($player, $king, $queens)
  {
    $totalValue = $king->getSellValue();
    foreach ($queens as $queen) {
      $totalValue += $queen->getSellValue();
    }
    return $totalValue;
  }
}
