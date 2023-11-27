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
