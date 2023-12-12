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
  protected static $customFields = ['used', 'extra_data'];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($card)
  {
    return self::getCardInstance($card['card_id'], $card);
  }

  private static function getClassPrefix($cardId)
  {
    if (Utils::startsWith($cardId, 'Victory')) {
      return 'Victory';
    }
    if (Utils::startsWith($cardId, 'Empire')) {
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

  public static function getAllCardsInTableaux()
  {
    return self::getSelectQuery()
      ->where(static::$prefix . 'location', 'LIKE', 'tableau' . '%')
      ->get();
  }

  public static function getAllCardsInThrones()
  {
    return self::getSelectQuery()
      ->where(static::$prefix . 'location', 'LIKE', 'throne' . '%')
      ->get();
  }

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

  public static function setupCreateMarketDecks($players = [], $options = null)
  {
    $numberOfAdditionalCards = count($players) * 4;

    foreach (REGIONS as $direction) {
      $pool = 'pool_' . $direction;
      $deck = 'deck_' . $direction;
      self::pickForLocation(12, $pool, $deck);
      self::shuffle($deck);
      // Notifications::log('extra', $numberOfAdditionalCards);
      self::pickForLocation($numberOfAdditionalCards, $pool, 'pile');
      self::shuffle('pile');
      $cardsInPile = self::getInLocation('pile');
      // Notifications::log('cardInPile', $cardsInPile);
      foreach ($cardsInPile as $cardId => $cardInfo) {
        // Add 14 because that is the number of cards already in each deck, so all
        // picked cards will be added on top.
        self::move($cardId, $deck, $cardInfo->getState() + 14);
      }
    }
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
      $extraData = null;
      if ($type === TABLEAU_CARD && Utils::startsWith($card->getId(), 'COMET')) {
        $region = $card->getRegion();
        $location = 'deck_' . $region;
      } else if ($type === TABLEAU_CARD) {
        $region = $card->getRegion();
        $location = 'pool_' . $region;
      } else if ($type === VICTORY_CARD) {
        $location = $card->getStartLocation();
      } else if ($type === EMPIRE_CARD) {
        $location = $card->getStartLocation();
        $extraData = [
          'side' => KING,
        ];
      }

      $cards[$cId] = [
        'id' => $cId,
        'location' => $location,
        'used' => 0,
        'extra_data' => json_encode($extraData)
      ];
    }

    // // Create the cards
    self::create($cards, null);
    self::shuffle(POOL_EAST);
    self::shuffle(POOL_WEST);
  }

  /* Creation of the cards */
  public static function setupNewGame($players = null, $options = null)
  {
    self::setupLoadCards();
    self::setupCreateMarketDecks($players, $options);
  }


  public static function setUsed($id, $value)
  {
    self::DB()->update([
      'used' => $value,
    ], $id);
  }

  public static function resetUsed()
  {
    self::DB()->update(['used' => 0])->run();
  }

  public static function getVictoryCards()
  {
    return Cards::getSelectQuery()->where('card_location', 'LIKE', 'victory%')->get()->toArray();
  }

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
