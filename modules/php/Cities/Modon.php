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
        'religion' => REFORMIST,
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
