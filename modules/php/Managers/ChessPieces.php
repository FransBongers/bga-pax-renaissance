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

  public static function getUiData()
  {
    $data = [
      'inPlay' => ChessPieces::getSelectQuery()->where('piece_location', 'NOT LIKE', 'supply%')->get()->toArray(),
      'supply' => [
        CATHOLIC => [],
        ISLAMIC => [],
        REFORMIST => [],
      ],
    ];

    foreach (RELIGIONS as $religion) {
      $data['supply'][$religion][BISHOP] = count(ChessPieces::getInLocation(Locations::supply(BISHOP, $religion)));
      $data['supply'][$religion][KNIGHT] = count(ChessPieces::getInLocation(Locations::supply(KNIGHT, $religion)));
      $data['supply'][$religion][ROOK] = count(ChessPieces::getInLocation(Locations::supply(ROOK, $religion)));
    }

    return $data;
  }

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
    self::setupPlaceChessPieces($players, $options);
    self::setupPlaceStartingConcessions($players, $options);
  }

  public function setupCreateTokens()
  {
    $chessPieces = [];
    $setup = [
      [BISHOP, CATHOLIC, 5],
      [BISHOP, ISLAMIC, 5],
      [BISHOP, REFORMIST, 5],
      [KNIGHT, CATHOLIC, 10],
      [KNIGHT, ISLAMIC, 7],
      [KNIGHT, REFORMIST, 7],
      [ROOK, CATHOLIC, 10],
      [ROOK, ISLAMIC, 7],
      [ROOK, REFORMIST, 7],
      [PIRATE, CATHOLIC, 6],
      [PIRATE, ISLAMIC, 4],
      [PIRATE, REFORMIST, 3],
      [PAWN, FUGGER, 10],
      [PAWN, MEDICI, 10],
      [PAWN, COEUR, 10],
      [PAWN, MARCHIONNI, 10],
      [DISK, BLACK, 2],
      [DISK, WHITE, 2],
    ];

    foreach ($setup as $setupRecord) {
      $chessPieces[] = [
        "id" => $setupRecord[0] . "_" . $setupRecord[1] . "_{INDEX}",
        "nbr" => $setupRecord[2],
        "nbrStart" => 1,
        "location" => Locations::supply($setupRecord[0], $setupRecord[1]),
      ];
    };

    self::create($chessPieces);
    foreach ([BISHOP, KNIGHT, PIRATE, ROOK] as $type) {
      foreach (RELIGIONS as $religion) {
        self::shuffle(Locations::supply($type, $religion));
      }
    }

    foreach (BANKS as $bank) {
      self::shuffle(Locations::supply(PAWN, $bank));
    }
  }

  private function setupPlaceChessPieces($players, $options)
  {
    $setup = [
      LONDON => Locations::supply(ROOK, CATHOLIC),
      PARIS => Locations::supply(KNIGHT, CATHOLIC),
      VIENNA => Locations::supply(ROOK, CATHOLIC),
      BUDA => Locations::supply(KNIGHT, CATHOLIC),
      TANA => Locations::supply(KNIGHT, ISLAMIC),
      TOLEDO => Locations::supply(KNIGHT, CATHOLIC),
      VALENCIA => Locations::supply(KNIGHT, CATHOLIC),
      VENICE => Locations::supply(KNIGHT, CATHOLIC),
      CONSTANTINOPLE_1 => Locations::supply(ROOK, ISLAMIC),
      CONSTANTINOPLE_2 => Locations::supply(KNIGHT, ISLAMIC),
      CONSTANTINOPLE_3 => Locations::supply(KNIGHT, ISLAMIC),
      CAIRO => Locations::supply(ROOK, ISLAMIC),
      TIMBUKTU => Locations::supply(DISK, BLACK),
      NOVGOROD => Locations::supply(DISK, BLACK),
      SPICE_ISLANDS => Locations::supply(DISK, WHITE),
      RED_SEA => Locations::supply(DISK, WHITE),
      // TODO: remove
      BORDER_HUNGARY_OTTOMAN => Locations::supply(PIRATE, ISLAMIC),
      BORDER_ARAGON_PORTUGAL => Locations::supply(PIRATE, REFORMIST),
      BORDER_OTTOMAN_PAPAL_STATES => Locations::supply(PIRATE, CATHOLIC),
    ];

    foreach ($setup as $location => $pool) {
      $piece = self::getTopOf($pool);
      if ($piece === null) {
        // Should never happen
        continue;
      };
      self::move($piece['id'], $location);
    }
  }

  private function setupPlaceStartingConcessions($players, $options)
  {
    $players = Players::getAll();
    foreach ($players as $playerId => $player) {
      $bank = $player->getBank();
      $piece = self::getTopOf(Locations::supply(PAWN, $bank));
      if ($piece === null) {
        // Should never happen
        continue;
      };
      self::move($piece['id'], BANK_STARTING_CONCESSION_MAP[$bank]);
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
