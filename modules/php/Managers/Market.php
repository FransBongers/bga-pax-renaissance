<?php

namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Cards;

class Market
{


  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  private function drawInitialMarketCards()
  {
    // Assign initial cards to market
    for ($i = 0; $i < 6; $i++) {
      Cards::pickForLocation(1, DECK_WEST, Locations::market(WEST, $i));
      Cards::pickForLocation(1, DECK_EAST, Locations::market(EAST, $i));
    }
  }

  public static function setupNewGame($players = null, $options = null)
  {
    self::drawInitialMarketCards();
  }

  public static function getFlorins() {
    return [
      EAST => [
        0 => 0,
        1 => 1,
        2 => 0,
        3 => 2,
        4 => 0,
        5 => 0
      ],
      WEST => [
        0 => 0,
        1 => 1,
        2 => 0,
        3 => 2,
        4 => 0,
        5 => 0
      ],
    ];
  }

  public static function getUiData()
  {
    $data = [
      'cards' => Cards::getSelectQuery()->where('card_location', 'LIKE', 'market%')->get()->ui(),
      'florins' => self::getFlorins(),
      'deckCounts' => []
    ];
    foreach (CARDINAL_DIRECTIONS as $direction) {
      $deck = Cards::getInLocation('deck_' . $direction)->toArray();
      $cardCount = count($deck);
      $cometCount = count(Utils::filter($deck, function ($card) {
        return Utils::startsWith($card->getId(), 'COMET');
      }));
      $data['deckCounts'][$direction] = [
        'cardCount' => $cardCount,
        'cometCount' => $cometCount,
      ];
    }

    return $data;
  }

  public static function getCardsPlayerCanPurchase($player) {
    $florins = $player->getFlorins();
    $cards = Cards::getSelectQuery()->where('card_location', 'LIKE', 'market%')->get()->toArray();

    return Utils::filter($cards, function ($card) use ($florins) {
      $column = intval(explode('_',$card->getLocation())[2]);
      return $column > 0 && $column <= $florins;
    });
  }
}
