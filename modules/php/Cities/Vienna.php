<?php
namespace PaxRenaissance\Cities;

class Vienna extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = VIENNA;
    $this->capital = true;
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->name = clienttranslate('VIENNA');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => ROOK,
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
        'levyIcon' => KNIGHT,
        'separator' => REFORMIST,
      ],
    ];
  }
}
