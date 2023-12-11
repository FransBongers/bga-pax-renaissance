<?php
namespace PaxRenaissance\Cities;

class Algiers extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = ALGIERS;
    $this->empire = ARAGON;
    $this->name = clienttranslate('Algiers');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => ROOK,
        'separator' => ISLAMIC,
      ],
      CATHOLIC => [
        'levyIcon' => ROOK,
        'separator' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => KNIGHT,
        'separator' => ISLAMIC,
      ],
      REFORMIST => [
        'levyIcon' => ROOK,
        'separator' => REFORMIST,
      ],
    ];
  }
}
