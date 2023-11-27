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
        'levyIcon' => KNIGHT,
        'religion' => REFORMIST,
      ],
    ];
  }
}
