<?php
namespace PaxRenaissance\Cities;

class Paris extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = PARIS;
    $this->capital = true;
    $this->empire = FRANCE;
    $this->name = clienttranslate('PARIS');
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
        'religion' => CATHOLIC,
      ],
      REFORMIST => [
        'levyIcon' => KNIGHT,
        'religion' => REFORMIST,
      ],
    ];
  }
}
