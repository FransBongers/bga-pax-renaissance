<?php

namespace PaxRenaissance\Actions;
// use PaxRenaissance\Managers\Meeples;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Helpers\Utils;

class FlipVictoryCard extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_FLIP_VICTORY_CARD;
  }

  public function argsFlipVictoryCard()
  {
    $cards = Cards::getVictoryCards();

    $data = [
      'victoryCards' => Utils::filter($cards, function ($card) {
        return $card->getUsed() == 0;
      })
    ];

    return $data;
  }

  // public function actPlayerAction($cardId, $strength)
  public function actFlipVictoryCard($args)
  {
    self::checkAction('actFlipVictoryCard');
    $cardId = $args['cardId'];
    $data = self::argsFlipVictoryCard();

    $card = Utils::array_find($data['victoryCards'], function ($victoryCard) use ($cardId) {
      return $victoryCard->getId() == $cardId;
    });

    if ($card === null) {
      throw new \feException("Not allowed to flip victory card");
    }

    $card->setState(1);
    $player = self::getPlayer();

    Notifications::flipVictoryCard($player, Cards::get($cardId));

    $this->resolveAction($args);
  }
}
