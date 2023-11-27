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
        'religion' => ISLAMIC,
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
        'levyIcon' => ROOK,
        'religion' => REFORMIST,
      ],
    ];
  }
}
