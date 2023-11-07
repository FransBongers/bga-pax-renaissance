<?php

namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Helpers\Utils;

/**
 * ChessPieces
 */
class ChessPieces extends \PaxRenaissance\Helpers\Pieces
{
  protected static $table = 'chess_pieces';
  protected static $prefix = 'piece_';
  protected static $customFields = [];
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;
  protected static function cast($chessPiece)
  {
    return [
      'id' => $chessPiece['id'],
      'location' => $chessPiece['location'],
      'state' => intval($chessPiece['state']),
      // 'used' => intval($token['used']),
    ];
  }

  //////////////////////////////////
  //////////////////////////////////
  //////////// GETTERS //////////////
  //////////////////////////////////
  //////////////////////////////////

  /**
   * getOfPlayer: return the cards in the hand of given player
   */
  // public static function getOfPlayer($pId)
  // {
  //   return self::getInLocation(['hand', $pId]);
  // }

  public static function getOfType($type)
  {
    return self::getSelectQuery()
      ->where(static::$prefix . 'id', 'LIKE', $type . '%')
      ->get()
      ->toArray();
  }

  public static function getOfTypeInLocation($type, $location)
  {
    return self::getSelectQuery()
      ->where(static::$prefix . 'id', 'LIKE', $type . '%')
      ->where(static::$prefix . 'location', 'LIKE', $location . '%')
      ->get()
      ->toArray();
  }

  // public static function getOfTypeInLocation($type, $location)
  // {
  //   return self::getSelectQuery()
  //     ->where(static::$prefix . 'id', 'LIKE', $type . '%')
  //     ->where(static::$prefix . 'location', $location)
  //     ->get()
  //     ->toArray();
  // }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  /**
   * setupNewGame: create the deck of cards
   */
  public static function setupNewGame($players = null, $options = null)
  {
    self::setupCreateTokens();
    self::setupPlaceChessPieces($players,$options);
  }

  public function setupCreateTokens()
  {
    $chessPieces = [];
    foreach(RELIGIONS as $religion) {
      $chessPieces[] = [
        "id" => "bishop_".$religion."_{INDEX}",
        "nbr" => 5,
        "nbrStart" => 1,
        "location" => Locations::bishopsSupply($religion),
      ];
      $chessPieces[] = [
        "id" => "knight_".$religion."_{INDEX}",
        "nbr" => 8,
        "nbrStart" => 1,
        "location" => Locations::knightsSupply($religion),
      ];
      $chessPieces[] = [
        "id" => "rook_".$religion."_{INDEX}",
        "nbr" => 8,
        "nbrStart" => 1,
        "location" => Locations::rooksSupply($religion),
      ];
    };

    foreach(PLAYER_COLORS as $color) {
      $chessPieces[] = [
        "id" => "pawn_".$color."_{INDEX}",
        "nbr" => 10,
        "nbrStart" => 1,
        "location" => Locations::pawnsSupply($color),
      ];
    }

    self::create($chessPieces);
    foreach(RELIGIONS as $religion) {
      self::shuffle(Locations::bishopsSupply($religion));
      self::shuffle(Locations::knightsSupply($religion));
      self::shuffle(Locations::rooksSupply($religion));
    }

    foreach(PLAYER_COLORS as $color) {
      self::shuffle(Locations::pawnsSupply($color));
    }
  }

  private function setupPlaceChessPieces($players,$options) {
    $setup = [
      LONDON => Locations::rooksSupply(CATHOLIC),
      PARIS => Locations::knightsSupply(CATHOLIC),
      VIENNA => Locations::rooksSupply(CATHOLIC),
      BUDA => Locations::knightsSupply(CATHOLIC),
      TANA => Locations::knightsSupply(ISLAMIC),
      TOLEDO => Locations::knightsSupply(CATHOLIC),
      VALENCIA => Locations::knightsSupply(CATHOLIC),
      VENICE => Locations::knightsSupply(CATHOLIC),
      CONSTANTINOPLE_1 => Locations::rooksSupply(ISLAMIC),
      CONSTANTINOPLE_2 => Locations::knightsSupply(ISLAMIC),
      CONSTANTINOPLE_3 => Locations::knightsSupply(ISLAMIC),
      CAIRO => Locations::rooksSupply(ISLAMIC),
    ];

    foreach($setup as $city => $pool) {
      $piece = self::getTopOf($pool);
      if ($piece === null) {
        // Should never happen
        continue;
      };
      self::move($piece['id'],$city);
    }
  }

  // public static function setUsed($id, $value)
  // {
  //   self::DB()->update([
  //     'used' => $value,
  //   ], $id);
  // }

  // public static function resetUsed()
  // {
  //   self::DB()->update(['used' => 0])->run();
  // }
}
