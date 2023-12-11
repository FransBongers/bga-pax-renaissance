<?php
namespace PaxRenaissance\Cities;

class Varna extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = VARNA;
    $this->empire = HUNGARY;
    $this->name = clienttranslate('Varna');
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
        'levyIcon' => ROOK,
        'separator' => REFORMIST,
      ],
    ];
  }
}
