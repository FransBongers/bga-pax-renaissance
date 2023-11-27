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
        'religion' => ISLAMIC,
      ],
      CATHOLIC => [
        'levyIcon' => ROOK,
        'religion' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => KNIGHT,
        'religion' => ISLAMIC,
      ],
      REFORMIST => [
        'levyIcon' => ROOK,
        'religion' => REFORMIST,
      ],
    ];
  }
}
