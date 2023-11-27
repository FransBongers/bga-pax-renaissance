<?php
namespace PaxRenaissance\Cities;

class Venice extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = VENICE;
    $this->capital = true;
    $this->empire = PAPAL_STATES;
    $this->name = clienttranslate('VENICE');
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
