<?php

namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Helpers\Utils;

/**
 * Cards
 */
class Cards extends \PaxRenaissance\Helpers\Pieces
{
  protected static $table = 'cards';
  protected static $prefix = 'card_';
  protected static $customFields = ['used'];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($card)
  {
    return self::getCardInstance($card['card_id'], $card);
  }

  private static function getClassPrefix($cardId) {
    if (Utils::startsWith($cardId,'Victory')) {
      return 'Victory';
    } 
    if (Utils::startsWith($cardId,'Empire')) {
      return 'Empire';
    }
    return 'Tableau';
  }

  public static function getCardInstance($id, $data = null)
  {
    $prefix = self::getClassPrefix($id);

    $className = "\PaxRenaissance\Cards\\$prefix\\$id";
    return new $className($data);
  }

  //////////////////////////////////
  //////////////////////////////////
  //////////// GETTERS //////////////
  //////////////////////////////////
  //////////////////////////////////

  // /**
  //  * getOfPlayer: return the cards in the hand of given player
  //  */
  // public static function getOfPlayer($pId)
  // {
  //   return self::getInLocation(['hand', $pId]);
  // }

  // public static function getOfTypeInLocation($type, $location)
  // {
  //   return self::getSelectQuery()
  //     ->where(static::$prefix . 'id', 'LIKE', $type . '%')
  //     ->where(static::$prefix . 'location', 'LIKE', $location . '%')
  //     ->get()
  //     ->toArray();
  // }

  // public static function getUiData()
  // {
  //   return self::getPool()
  //     ->merge(self::getInLocationOrdered('inPlay'))
  //     ->merge(self::getInLocation('base_%'))
  //     ->merge(self::getInLocation('projects_%'))
  //     ->ui();
  // }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  private static function setupCreateMarketDecks()
  {
    self::pickForLocation(7, POOL_EAST, DECK_EAST);
    self::pickForLocation(7, POOL_WEST, DECK_WEST);
  }

  private static function setupLoadCards()
  {
    // Load list of cards
    include dirname(__FILE__) . '/../Cards/list.inc.php';

    // $baseProjects = [];
    foreach ($cardIds as $cId) {
      $card = self::getCardInstance($cId);

      $type = $card->getType();

      $location = '';
      if ($type === TABLEAU_CARD) {
        $region = $card->getRegion();
        $location = 'pool_' . $region;
      } else if ($type === VICTORY_CARD || $type === EMPIRE_CARD) {
        $location = $card->getStartLocation();
      }

      $cards[$cId] = [
        'id' => $cId,
        'location' => $location,
        'used' => 0,
      ];
    }
    Notifications::log('cards', $cards);
    // // Draw base projects on association board (projects_base_X)
    // shuffle($baseProjects);
    // $nbBaseProjects = count($players) == 4 ? 4 : 3;

    // for ($i = 0; $i < $nbBaseProjects; $i++) {
    //   $value = array_pop($baseProjects);
    //   $cards[$value]['location'] = 'base_' . $i;
    // }

    // // Create the cards
    self::create($cards, null);
    self::shuffle('pool_'.EAST);
    self::shuffle('pool_'.WEST);
  }

  /* Creation of the cards */
  public static function setupNewGame($players = null, $options = null)
  {
    self::setupLoadCards();
    self::setupCreateMarketDecks();
  }

  // /**
  //  * setupNewGame: create the deck of cards
  //  */
  // public static function setupNewGame($players, $options)
  // {
  //   $wakhan = Globals::getWakhanEnabled() ? 1 : 0;
  //   self::createDeck(count($players) + $wakhan);
  // }

  // private function createDeck($player_count)
  // {
  //   $cards = [];
  //   array_push($cards, [
  //     "id" => "card_{INDEX}",
  //     "nbr" => 100,
  //     "nbrStart" => 1,
  //     "location" => COURT_CARD,
  //     "used" => 0,
  //   ]);
  //   array_push($cards, [
  //     "id" => "card_{INDEX}",
  //     "nbr" => 4,
  //     "nbrStart" => 101,
  //     "location" => 'dominanceCheckCard',
  //     "used" => 0,
  //   ]);
  //   array_push($cards, [
  //     "id" => "card_{INDEX}",
  //     "nbr" => 12,
  //     "nbrStart" => 105,
  //     "location" => EVENT_CARD,
  //     "used" => 0,
  //   ]);
  //   self::create($cards);
  //   self::shuffle(COURT_CARD);
  //   self::shuffle(EVENT_CARD);

  //   for ($i = 6; $i >= 1; $i--) {
  //     self::pickForLocation($player_count + 5, COURT_CARD, 'pile');
  //     if ($i == 2) {
  //       self::pickForLocation(2, EVENT_CARD, 'pile');
  //     } elseif ($i > 2) {
  //       self::pickForLocation(1, EVENT_CARD, 'pile');
  //       self::pickForLocation(1, 'dominanceCheckCard', 'pile');
  //     }
  //     self::shuffle('pile');
  //     $pile = self::getInLocation('pile');
  //     $n_cards = self::countInLocation('deck');
  //     foreach ($pile as $id => $info) {
  //       self::move($id, 'deck', $info['state'] + $n_cards);
  //     }
  //   }
  // }

  // public static function setUsed($id, $value)
  // {
  //   self::DB()->update([
  //     'used' => $value,
  //   ], $id);
  // }

  // /**
  //  * Should returns the cards that are not available for sale (because player already put rupee on it)
  //  */
  // public static function getUnavailableCards()
  // {
  //   return array_map(function ($card) {
  //     return $card['id'];
  //   }, self::getSelectQuery()->where('used', 1)->get()->toArray());
  // }

}
