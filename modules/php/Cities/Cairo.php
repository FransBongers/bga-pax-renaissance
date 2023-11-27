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
        'religion' => ISLAMIC,
      ],
      CATHOLIC => [
        'levyIcon' => ROOK,
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
