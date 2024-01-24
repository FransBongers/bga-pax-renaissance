<?php
namespace PaxRenaissance\Cities;

use PaxRenaissance\Core\Globals;

use const PaxRenaissance\OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

class Constantinople2 extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $ageOfReformation = Globals::getStartingMap() === OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

    $this->id = CONSTANTINOPLE_2;
    $this->capital = true;
    $this->empire = OTTOMAN;
    $this->name = clienttranslate('CONSTANTINOPLE');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => KNIGHT,
        'separator' => $ageOfReformation ? REFORMIST : ISLAMIC,
      ],
      CATHOLIC => [
        'levyIcon' => KNIGHT,
        'separator' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => ROOK,
        'separator' => ISLAMIC,
      ],
      REFORMIST => [
        'levyIcon' => KNIGHT,
        'separator' => REFORMIST,
      ],
    ];
  }
}
