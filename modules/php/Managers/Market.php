<?php

namespace PaxRenaissance\Managers;

use PaxRenaissance\Helpers\Locations;
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
      Cards::pickForLocation(1, DECK_WEST, Locations::market(WEST,$i));
      Cards::pickForLocation(1, DECK_EAST, Locations::market(EAST,$i));
    }
  }

  public static function setupNewGame($players = null, $options = null)
  {
    self::drawInitialMarketCards();
  }

  public static function getUiData()
  {
    return Cards::getSelectQuery()->where('card_location', 'LIKE', 'market%')->get()->ui();
  }
}