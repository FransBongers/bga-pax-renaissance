<?php
namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Engine;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;

class Cities
{
  // Mapping of cityId and corresponding class
  static $cities = [
    ALGIERS => 'Algiers',
    BORDEAUX => 'Bordeaux',
    BRUGES => 'Bruges',
    BUDA => 'Buda',
    CAFFA => 'Caffa',
    CAIRO => 'Cairo',
    CONSTANTINOPLE_1 => 'Constantinople1',
    CONSTANTINOPLE_2 => 'Constantinople2',
    CONSTANTINOPLE_3 => 'Constantinople3',
    CYPRUS => 'Cyprus',
    GRANADA => 'Granada',
    LONDON => 'London',
    LUBECK => 'Lubeck',
    LYON => 'Lyon',
    MODON => 'Modon',
    NOVGOROD => 'Novgorod',
    NURNBERG => 'Nurnberg',
    PARIS => 'Paris',
    RED_SEA => 'RedSea',
    RHODES => 'Rhodes',
    SPICE_ISLANDS => 'SpiceIslands',
    TANA => 'Tana',
    TIMBUKTU => 'Timbuktu',
    TOLEDO => 'Toledo',
    TREBIZOND => 'Trebizond',
    VALENCIA => 'Valencia',
    VARNA => 'Varna',
    VENICE => 'Venice',
    VIENNA => 'Vienna',
  ];

  public static function get($cityId)
  {
    if (!\array_key_exists($cityId, self::$cities)) {
      // throw new \feException(print_r(debug_print_backtrace()));
      // throw new \feException(print_r(Globals::getEngine()));
      throw new \BgaVisibleSystemException('Trying to get a city not defined in Cities.php : ' . $cityId);
    }
    $name = '\PaxRenaissance\Cities\\' . self::$cities[$cityId];
    return new $name();
  }

  public static function getAll()
  {
    return array_map(function ($cityId) {
      return self::get($cityId);
    }, array_keys(self::$cities));
  }

  public static function getCitiesThatCanStartTradeFair()
  {
    return Utils::filter(self::getAll(), function ($city) {
      return $city->canStartTradeFair();
    });
  }
}
