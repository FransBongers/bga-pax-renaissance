<?php
namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;

class Borders
{
  // Mapping of cityId and corresponding class
  static $borders = [
    BORDER_ARAGON_FRANCE => 'AragonFranceBorder',
    BORDER_ARAGON_PAPAL_STATES => 'AragonPapalStatesBorder',
    BORDER_ARAGON_PORTUGAL => 'AragonPortugalBorder',
    BORDER_BYZANTIUM_HUNGARY => 'ByzantiumHungaryBorder',
    BORDER_BYZANTIUM_MAMLUK => 'ByzantiumMamlukBorder',
    BORDER_ENGLAND_FRANCE => 'EnglandFranceBorder',
    BORDER_ENGLAND_PORTUGAL => 'EnglandPortugalBorder',
    BORDER_FRANCE_HOLY_ROMAN_EMPIRE => 'FranceHolyRomanEmpireBorder',
    BORDER_HOLY_ROMAN_EMPIRE_HUNGARY => 'HolyRomanEmpireHungaryBorder',
    BORDER_HOLY_ROMAN_EMPIRE_PAPAL_STATES => 'HolyRomanEmpirePapalStatesBorder',
    BORDER_HUNGARY_OTTOMAN => 'HungaryOttomanBorder',
    BORDER_MAMLUK_OTTOMAN => 'MamlukOttomanBorder',
    BORDER_OTTOMAN_PAPAL_STATES => 'OttomanPapalStatesBorder',
  ];

  public static function get($borderId)
  {
    if (!\array_key_exists($borderId, self::$borders)) {
      // throw new \feException(print_r(debug_print_backtrace()));
      // throw new \feException(print_r(Globals::getEngine()));
      throw new \BgaVisibleSystemException('Trying to get a border not defined in Borders.php : ' . $borderId);
    }
    $name = '\PaxRenaissance\Borders\\' . self::$borders[$borderId];
    return new $name();
  }

  public static function getAll()
  {
    return array_map(function ($borderId) {
      return self::get($borderId);
    }, array_keys(self::$borders));
  }
}
