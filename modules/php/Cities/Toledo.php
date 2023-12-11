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
