<?php
namespace PaxRenaissance\Cities;

class Nurnberg extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = NURNBERG;
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->name = clienttranslate('Nürnberg');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => KNIGHT,
        'separator' => REFORMIST,
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
        'levyIcon' => KNIGHT,
        'separator' => REFORMIST,
      ],
    ];
  }
}
