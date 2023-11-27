<?php
namespace PaxRenaissance\Cities;

class Toledo extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = TOLEDO;
    $this->capital = true;
    $this->empire = PORTUGAL;
    $this->name = clienttranslate('TOLEDO');
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
        'levyIcon' => ROOK,
        'religion' => REFORMIST,
      ],
    ];
  }
}
