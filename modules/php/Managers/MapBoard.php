<?php

namespace PaxRenaissance\Managers;

use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Managers\Cards;

class MapBoard
{


  public static function getUiData()
  {
    $cards = Cards::getAllCardsInThrones()->toArray();
    return [
      'thrones' => [
        'cards' => $cards,
        'tokens' => self::getTokensOnCards($cards),
      ],
      'empires' => Empires::getAll()
    ];
  }

  public static function getTokensOnCards($cards)
  {
    $tokens = [];
    foreach($cards as $card) {
      $tokensOnCard = Tokens::getInLocation($card->getId())->toArray();
      $tokens = array_merge($tokens, $tokensOnCard);
    }
    return $tokens;
  }
}
