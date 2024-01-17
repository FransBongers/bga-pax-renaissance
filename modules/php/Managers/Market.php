<?php

namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Globals;
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

  public function setupNewGameMarketFlorins()
  {
    $marketFlorins = [];
    for ($i = 0; $i < 6; $i++) {
      $marketFlorins[Locations::marketFlorins(EAST, $i)] = 0;
      $marketFlorins[Locations::marketFlorins(WEST, $i)] = 0;
    }
    Globals::setMarketFlorins($marketFlorins);
  }

  public static function setupNewGame($players = null, $options = null)
  {
    self::drawInitialMarketCards();
    self::setupNewGameMarketFlorins();
  }

  public static function getFlorins()
  {
    return Globals::getMarketFlorins();
  }

  public static function getUiData()
  {
    $data = [
      'cards' => Cards::getSelectQuery()->where('card_location', 'LIKE', 'market%')->get()->ui(),
      'florins' => self::getFlorins(),
      'deckCounts' => []
    ];
    foreach (REGIONS as $direction) {
      $deck = Cards::getInLocation('deck_' . $direction)->toArray();
      $cardCount = count($deck);
      // $cometCount = count(Utils::filter($deck, function ($card) {
      //   return Utils::startsWith($card->getId(), 'COMET');
      // }));
      $data['deckCounts'][$direction] = [
        'cardCount' => $cardCount,
        // 'cometCount' => $cometCount,
      ];
      if ($direction === EAST) {
        $data['deckCounts'][$direction]['comet1'] = Utils::array_some($deck, function ($card) {
          return $card->getId() === 'COMET1_Copernicus';
        });
        $data['deckCounts'][$direction]['comet2'] = Utils::array_some($deck, function ($card) {
          return $card->getId() === 'COMET2_Nostradamus';
        });
      }
      if ($direction === WEST) {
        $data['deckCounts'][$direction]['comet3'] = Utils::array_some($deck, function ($card) {
          return $card->getId() === 'COMET3_Halley';
        });
        $data['deckCounts'][$direction]['comet4'] = Utils::array_some($deck, function ($card) {
          return $card->getId() === 'COMET4_Regiomontanus';
        });
      }
    }

    return $data;
  }

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...

  public static function getCards()
  {
    return Cards::getSelectQuery()->where('card_location', 'LIKE', 'market%')->get()->toArray();
  }

  public static function getCardsPlayerCanPurchase($player)
  {
    $atHandLimit = $player->isAtHandLimit();

    $florins = $player->getFlorins();
    $cards = Cards::getSelectQuery()->where('card_location', 'LIKE', 'market%')->get()->toArray();

    return Utils::filter($cards, function ($card) use ($florins, $atHandLimit) {
      if ($card->getUsed() == 1 || ($atHandLimit && !$card->isCometCard())) {
        return false;
      }
      $column = intval(explode('_', $card->getLocation())[2]);
      return $column > 0 && $column <= $florins;
    });
  }

  public static function takeFlorinsOnCard($card)
  {
    $florinLocation = $card->getLocation() . '_florins';
    $marketFlorins = Globals::getMarketFlorins();
    $florinsOnCard = $marketFlorins[$florinLocation] ?? 0;
    $marketFlorins[$florinLocation] = 0;
    Globals::setMarketFlorins($marketFlorins);
    return $florinsOnCard;
  }

  public static function payPurchaseCost($card)
  {
    $location = $card->getLocation();
    $locationExploded = explode('_', $location);

    $region = $locationExploded[1];
    $otherRowRegion = $region === EAST ? WEST : EAST;

    $column = intval($locationExploded[2]);

    $marketFlorins = self::getFlorins();
    $placedFlorins = [];

    // Place a Florin on each row 
    for ($i = 0; $i < $column; $i++) {
      $florinLocation = Locations::marketFlorins($region, $i);
      $topCard = Cards::getTopOf(Locations::market($region, $i));

      if ($topCard === null) {
        $topCard = Cards::getTopOf(Locations::market($otherRowRegion, $i));
        $florinLocation = Locations::marketFlorins($otherRowRegion, $i);
      }
      // TODO: check if it is possible both rows do not contain a card. 
      // If it is possible, how should this be handled?
      if ($topCard === null) {
        continue;
      }

      $topCard->setUsed();
      $marketFlorins[$florinLocation] = $marketFlorins[$florinLocation] + 1;
      $placedFlorins[] = $florinLocation;
    }

    Globals::setMarketFlorins($marketFlorins);
    return $placedFlorins;
  }

  public static function refreshShiftCards()
  {
    $marketFlorins = Globals::getMarketFlorins();
    $emptySpaces = [WEST => [], EAST => []];

    $cardMoves = [];

    // Go through market from left to right
    for ($column = 0; $column < 6; $column++) {
      foreach (REGIONS as $region) {
        $card = Cards::getTopOf(Locations::market($region, $column));
        // If no card in location mark it as empty
        if ($card === null) {
          $emptySpaces[$region][] = $column;
          // If there is a card check if there is an empty spot in the row.
          // If so move the card and any Florins on it
        } else if (count($emptySpaces[$region]) > 0) {
          $toColumn = array_shift($emptySpaces[$region]);
          $florinsFrom = $card->getLocation() . '_florins';

          // Move card
          $from = Locations::market($region, $column);
          $to = Locations::market($region, $toColumn);
          $cardMoves[] = [
            'card' => $card,
            'from' => $from,
            'to' => $to,
          ];
          Cards::move($card->getId(), $to);

          // Move florins
          $amount = $marketFlorins[$florinsFrom];
          $marketFlorins[$florinsFrom] = 0;
          $marketFlorins[Locations::marketFlorins($region, $toColumn)] = $marketFlorins[Locations::marketFlorins($region, $toColumn)] + $amount;

          $emptySpaces[$region][] = $column;
        }
      }
    }
    Globals::setMarketFlorins($marketFlorins);

    return [
      'emptySpaces' => $emptySpaces,
      'cardMoves' => $cardMoves
    ];
  }

  /**
   * Draw cards for any empty spaces left in the market.
   */
  public static function refreshDrawCards($emptySpaces)
  {
    $cardDraws = [];
    // Need to check if unable to refresh as it will trigger end of the game.
    $unableToRefresh = false;
    for ($column = 0; $column < 6; $column++) {
      foreach (REGIONS as $region) {
        if (count($emptySpaces[$region]) === 0 || $emptySpaces[$region][0] !== $column) {
          continue;
        }
        $card = Cards::pickOneForLocation(Locations::deck($region), Locations::market($region, $column));
        if ($card === null) {
          $card = Cards::pickOneForLocation(Locations::deck($region === EAST ? WEST : EAST), Locations::market($region, $column));
        }
        if ($card === null) {
          $unableToRefresh = true;
          continue;
          // Both decks are emtpy => Patron Victory
        }
        array_shift($emptySpaces[$region]);
        $cardDraws[] = $card;
      }
    }
    return [
      'unableToRefresh' => $unableToRefresh,
      'cardDraws' => $cardDraws
    ];
  }

  public static function refresh($player)
  {

    $shiftResult = self::refreshShiftCards();
    $emptySpaces = $shiftResult['emptySpaces'];
    $drawResult = self::refreshDrawCards($emptySpaces);
    $cardDraws = $drawResult['cardDraws'];
    if (count($shiftResult['cardMoves']) + count($drawResult['cardDraws']) > 0) {
      Notifications::refreshMarket($player, $shiftResult['cardMoves'], $cardDraws);
    }
    return $drawResult['unableToRefresh'];
  }

  public static function getTradeFairs()
  {
    $cities = Cities::getCitiesThatCanStartTradeFair();
    $data = [];
    foreach (REGIONS as $region) {
      $card = Cards::getTopOf(Locations::Market($region, 0));
      if ($card === null) {
        continue;
      }
      $data[$region] = [
        'card' => $card,
        'city' => Utils::filter($cities, function ($city) use ($region) {
          return $city->getEmporium() === $region;
        })[0],
      ];
    }
    return $data;
  }

  public static function incMarketFlorins(string $region, int $column, int $value)
  {
    $marketFlorins = Globals::getMarketFlorins();
    $location = Locations::marketFlorins($region, $column);
    $marketFlorins[$location] = $marketFlorins[$location] + $value;
    Globals::setMarketFlorins($marketFlorins);
  }

  public static function getMarketFlorins(string $region, int $column)
  {
    $marketFlorins = Globals::getMarketFlorins();
    $location = Locations::marketFlorins($region, $column);
    return $marketFlorins[$location];
  }
}
