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
        'separator' => CATHOLIC,
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
