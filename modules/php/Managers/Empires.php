<?php

namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Engine;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;

class Empires
{
  // Mapping of empireId and corresponding class
  static $empires = [
    ARAGON => 'Aragon',
    BYZANTIUM => 'Byzantium',
    ENGLAND => 'England',
    FRANCE => 'France',
    HOLY_ROMAN_EMIRE => 'HolyRomanEmpire',
    HUNGARY => 'Hungary',
    MAMLUK => 'Mamluk',
    OTTOMAN => 'Ottoman',
    PAPAL_STATES => 'PapalStates',
    PORTUGAL => 'Portugal',
  ];

  public static function setupNewGame($players = null, $options = null)
  {
    Globals::setEmpireReligions([
      ENGLAND => MEDIEVAL,
      FRANCE => MEDIEVAL,
      HOLY_ROMAN_EMIRE => MEDIEVAL,
      HUNGARY => MEDIEVAL,
      BYZANTIUM => MEDIEVAL,
      PORTUGAL => MEDIEVAL,
      ARAGON => MEDIEVAL,
      PAPAL_STATES => CATHOLIC,
      OTTOMAN => MEDIEVAL,
      MAMLUK => ISLAMIC,
    ]);
  }

  public static function get($empireId)
  {
    if (!\array_key_exists($empireId, self::$empires)) {
      // throw new \feException(print_r(debug_print_backtrace()));
      // throw new \feException(print_r(Globals::getEngine()));
      throw new \BgaVisibleSystemException('Trying to get an empire not defined in Empires.php : ' . $empireId);
    }
    $name = '\PaxRenaissance\Empires\\' . self::$empires[$empireId];
    return new $name();
  }

  public static function getAll()
  {
    return array_map(function ($empireId) {
      return self::get($empireId);
    }, array_keys(self::$empires));
  }
}
