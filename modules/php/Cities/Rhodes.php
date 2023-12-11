<?php
namespace PaxRenaissance\Cities;

class Rhodes extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = RHODES;
    $this->empire = OTTOMAN;
    $this->name = clienttranslate('Rhodes');
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
