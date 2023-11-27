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
        'levyIcon' => KNIGHT,
        'religion' => REFORMIST,
      ],
    ];
  }
}
