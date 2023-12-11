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
        'levyIcon' => ROOK,
        'separator' => REFORMIST,
      ],
    ];
  }
}
