<?php
namespace PaxRenaissance\Cities;

class Caffa extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = CAFFA;
    $this->empire = BYZANTIUM;
    $this->name = clienttranslate('Caffa');
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
