<?php
namespace PaxRenaissance\Cities;

class Constantinople1 extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = CONSTANTINOPLE_1;
    $this->capital = true;
    $this->empire = OTTOMAN;
    $this->name = clienttranslate('CONSTANTINOPLE');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => ROOK,
        'separator' => ISLAMIC,
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
