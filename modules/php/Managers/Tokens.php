<?php

namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Helpers\Utils;

use const PaxRenaissance\OPTION_STARTING_MAP_1550_VARIANT;
use const PaxRenaissance\OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

/**
 * Tokens
 */
class Tokens extends \PaxRenaissance\Helpers\Pieces
{
  protected static $table = 'tokens';
  protected static $prefix = 'token_';
  protected static $customFields = [];
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;
  // protected static function cast($token)
  // {
  //   Notifications::log('token in cast', $token);
  //   return [
  //     'id' => $token['id'],
  //     'location' => $token['location'],
  //     'state' => intval($token['state']),
  //     // 'used' => intval($token['used']),
  //   ];
  // }
  // Mapping of token type and corresponding class
  static $classes = [
    BISHOP => 'ChessPiece',
    DISK => 'Disk',
    KNIGHT => 'ChessPiece',
    PAWN => 'Pawn',
    PIRATE => 'ChessPiece',
    ROOK => 'ChessPiece',
  ];

  protected static function cast($token)
  {
    return self::getTokenInstance($token['id'], $token);
  }

  public static function getTokenInstance($id, $data = null)
  {
    $type = explode('_', $id)[0];
    if (!\array_key_exists($type, self::$classes)) {
      // throw new \feException(print_r(debug_print_backtrace()));
      // throw new \feException(print_r(Globals::getEngine()));
      throw new \BgaVisibleSystemException('Trying to get a token not defined in Tokens.php : ' . $type);
    }

    $className = "\PaxRenaissance\Tokens\\" . self::$classes[$type];
    return new $className($data);
  }

  //////////////////////////////////
  //////////////////////////////////
  //////////// GETTERS //////////////
  //////////////////////////////////
  //////////////////////////////////

  public static function getUiData()
  {
    $data = [
      'inPlay' => self::getSelectQuery()->where('token_location', 'NOT LIKE', 'supply%')->get()->toArray(),
      'supply' => [
        CATHOLIC => [],
        ISLAMIC => [],
        REFORMIST => [],
        'banks' => []
      ],
    ];

    foreach (RELIGIONS as $religion) {
      $data['supply'][$religion][BISHOP] = count(self::getInLocation(Locations::supply(BISHOP, $religion)));
      $data['supply'][$religion][KNIGHT] = count(self::getInLocation(Locations::supply(KNIGHT, $religion)));
      $data['supply'][$religion][PIRATE] = count(self::getInLocation(Locations::supply(PIRATE, $religion)));
      $data['supply'][$religion][ROOK] = count(self::getInLocation(Locations::supply(ROOK, $religion)));
    }

    foreach (Players::getAll() as $player) {
      $bank = $player->getBank();
      $data['supply']['banks'][$bank] = count(self::getInLocation(Locations::supply(PAWN, $bank)));
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


  public static function getBishopsInPlay()
  {
    $bishops = self::getOfType('bishop_');
    return Utils::filter($bishops, function ($bishop) {
      return !Utils::startsWith($bishop->getLocation(), 'supply');
    });
  }

  public static function getConcessions()
  {
    return self::getOfTypeInLocation('pawn_', 'border_');
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
    self::setupPlaceTokens($players, $options);
    self::setupPlaceStartingConcessions($players, $options);
  }

  public function setupCreateTokens()
  {
    $tokens = [];
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
      [PAWN, BERENBERG, 10],
      [PAWN, MENDES, 10],
      [DISK, BLACK, 2],
      [DISK, WHITE, 2],
    ];

    foreach ($setup as $setupRecord) {
      $tokens[] = [
        "id" => $setupRecord[0] . "_" . $setupRecord[1] . "_{INDEX}",
        "nbr" => $setupRecord[2],
        "nbrStart" => 1,
        "location" => Locations::supply($setupRecord[0], $setupRecord[1]),
      ];
    };

    self::create($tokens);
    foreach ([BISHOP, KNIGHT, PIRATE, ROOK] as $type) {
      foreach (RELIGIONS as $religion) {
        self::shuffle(Locations::supply($type, $religion));
      }
    }

    foreach (BANKS as $bank) {
      self::shuffle(Locations::supply(PAWN, $bank));
    }
  }

  private function setupPlaceTokens($players, $options)
  {
    $mapOption = Globals::getStartingMap();
    $mapVariant1550 = $mapOption === OPTION_STARTING_MAP_1550_VARIANT;
    $mapVariantAgeOfReformationPromo = $mapOption === OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;


    $setup = [
      LONDON => $mapVariant1550 || $mapVariantAgeOfReformationPromo ? Locations::supply(KNIGHT, REFORMIST) : Locations::supply(ROOK, CATHOLIC),
      PARIS => Locations::supply(KNIGHT, CATHOLIC),
      VIENNA => $mapVariant1550 || $mapVariantAgeOfReformationPromo ? Locations::supply(KNIGHT, REFORMIST) : Locations::supply(ROOK, CATHOLIC),
      BUDA => Locations::supply(KNIGHT, CATHOLIC),
      TANA => Locations::supply(KNIGHT, ISLAMIC),
      TOLEDO => Locations::supply(KNIGHT, CATHOLIC),
      VALENCIA => Locations::supply(KNIGHT, CATHOLIC),
      VENICE => Locations::supply(KNIGHT, CATHOLIC),
      CONSTANTINOPLE_1 => $mapVariantAgeOfReformationPromo ? Locations::supply(ROOK, REFORMIST) : Locations::supply(ROOK, ISLAMIC),
      CONSTANTINOPLE_2 => $mapVariantAgeOfReformationPromo ? Locations::supply(KNIGHT, REFORMIST) : Locations::supply(KNIGHT, ISLAMIC),
      CAIRO => Locations::supply(ROOK, ISLAMIC),
      TIMBUKTU => Locations::supply(DISK, BLACK),
      NOVGOROD => Locations::supply(DISK, BLACK),
      SPICE_ISLANDS => Locations::supply(DISK, WHITE),
      
    ];
    if ($mapVariantAgeOfReformationPromo) {
      $setup[TREBIZOND] = Locations::supply(DISK, WHITE);
    } else {
      $setup[CONSTANTINOPLE_3] = Locations::supply(KNIGHT, ISLAMIC);
      $setup[RED_SEA] = Locations::supply(DISK, WHITE);
    }

    foreach ($setup as $location => $pool) {
      $token = self::getTopOf($pool);
      if ($token === null) {
        // Should never happen
        continue;
      };
      self::move($token->getId(), $location);
    }
  }

  private function setupPlaceStartingConcessions($players, $options)
  {
    $players = Players::getAll();
    foreach ($players as $playerId => $player) {
      $bank = $player->getBank();
      $token = self::getTopOf(Locations::supply(PAWN, $bank));
      if ($token === null) {
        // Should never happen
        continue;
      };
      self::move($token->getId(), BANK_STARTING_CONCESSION_MAP[$bank]);
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
