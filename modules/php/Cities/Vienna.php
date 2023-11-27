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
        'levyIcon' => KNIGHT,
        'religion' => REFORMIST,
      ],
    ];
  }
}
