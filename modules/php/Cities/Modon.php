<?php
namespace PaxRenaissance\Cities;

class Modon extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = MODON;
    $this->empire = OTTOMAN;
    $this->name = clienttranslate('Modon');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => ROOK,
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
