<?php
namespace PaxRenaissance\Cities;

class Cairo extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = CAIRO;
    $this->capital = true;
    $this->empire = MAMLUK;
    $this->name = clienttranslate('CAIRO');
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
        'separator' => CATHOLIC,
      ],
      REFORMIST => [
        'levyIcon' => KNIGHT,
        'separator' => REFORMIST,
      ],
    ];
  }
}
