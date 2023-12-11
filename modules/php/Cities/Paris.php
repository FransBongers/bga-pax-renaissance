<?php
namespace PaxRenaissance\Cities;

class Paris extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = PARIS;
    $this->capital = true;
    $this->empire = FRANCE;
    $this->name = clienttranslate('PARIS');
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
        'separator' => CATHOLIC,
      ],
      REFORMIST => [
        'levyIcon' => KNIGHT,
        'separator' => REFORMIST,
      ],
    ];
  }
}
