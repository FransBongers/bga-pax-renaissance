<?php

namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Engine;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;

use const PaxRenaissance\OPTION_STARTING_MAP_1550_VARIANT;
use const PaxRenaissance\OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

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
    $mapOption = Globals::getStartingMap();
    $mapVariant1550 = $mapOption === OPTION_STARTING_MAP_1550_VARIANT;
    $mapVariantAgeOfReformationPromo = $mapOption === OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

    Globals::setEmpireReligions([
      ENGLAND => $mapVariant1550 || $mapVariantAgeOfReformationPromo ? REFORMIST : MEDIEVAL,
      FRANCE => MEDIEVAL,
      HOLY_ROMAN_EMIRE => $mapVariant1550 || $mapVariantAgeOfReformationPromo ? REFORMIST : MEDIEVAL,
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

  public static function getRegion($region)
  {
    $empires = $region === EAST ? EAST_EMPIRES : WEST_EMPIRES;
    return array_map(function ($empireId) {
      return self::get($empireId);
    }, $empires);
  }

  public static function getRegionIds($region)
  {
    return $region === EAST ? EAST_EMPIRES : WEST_EMPIRES;
  }
}
