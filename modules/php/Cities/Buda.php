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
        'separator' => CATHOLIC,
      ],
      CATHOLIC => [
        'levyIcon' => KNIGHT,
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
