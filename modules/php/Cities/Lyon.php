<?php
namespace PaxRenaissance\Cities;

class Lyon extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = LYON;
    $this->empire = FRANCE;
    $this->name = clienttranslate('Lyon');
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
        'levyIcon' => KNIGHT,
        'separator' => REFORMIST,
      ],
    ];
  }
}
