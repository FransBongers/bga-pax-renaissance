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
        'religion' => CATHOLIC,
      ],
      CATHOLIC => [
        'levyIcon' => KNIGHT,
        'religion' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => ROOK,
        'religion' => ISLAMIC,
      ],
      REFORMIST => [
        'levyIcon' => ROOK,
        'religion' => REFORMIST,
      ],
    ];
  }
}
