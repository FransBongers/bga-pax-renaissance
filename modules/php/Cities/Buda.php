<?php
namespace PaxRenaissance\Cities;

class Buda extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = BUDA;
    $this->capital = true;
    $this->empire = HUNGARY;
    $this->name = clienttranslate('BUDA');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => KNIGHT,
        'religion' => CATHOLIC,
      ],
      CATHOLIC => [
        'levyIcon' => KNIGHT,
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
