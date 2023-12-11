<?php
namespace PaxRenaissance\Cities;

class Bordeaux extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = BORDEAUX;
    $this->empire = ENGLAND;
    $this->name = clienttranslate('Bordeaux');
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
        'levyIcon' => KNIGHT,
        'separator' => REFORMIST,
      ],
    ];
  }
}
