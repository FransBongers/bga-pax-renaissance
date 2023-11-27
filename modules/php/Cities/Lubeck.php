<?php
namespace PaxRenaissance\Cities;

class Lubeck extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = LUBECK;
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->name = clienttranslate('Lübeck');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => ROOK,
        'religion' => CATHOLIC,
      ],
      CATHOLIC => [
        'levyIcon' => ROOK,
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
