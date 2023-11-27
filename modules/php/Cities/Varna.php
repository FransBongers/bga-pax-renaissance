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
