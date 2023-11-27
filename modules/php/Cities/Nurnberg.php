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
        'religion' => REFORMIST,
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
        'levyIcon' => KNIGHT,
        'religion' => REFORMIST,
      ],
    ];
  }
}
