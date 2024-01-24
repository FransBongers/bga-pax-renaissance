<?php
namespace PaxRenaissance\Cities;

use PaxRenaissance\Core\Globals;

use const PaxRenaissance\OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

class Constantinople1 extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $ageOfReformation = Globals::getStartingMap() === OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

    $this->id = CONSTANTINOPLE_1;
    $this->capital = true;
    $this->empire = OTTOMAN;
    $this->name = clienttranslate('CONSTANTINOPLE');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => ROOK,
        'separator' => $ageOfReformation ? REFORMIST : ISLAMIC,
      ],
      CATHOLIC => [
        'levyIcon' => ROOK,
        'separator' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => ROOK,
        'separator' => ISLAMIC,
      ],
      REFORMIST => [
        'levyIcon' => ROOK,
        'separator' => REFORMIST,
      ],
    ];
  }
}
