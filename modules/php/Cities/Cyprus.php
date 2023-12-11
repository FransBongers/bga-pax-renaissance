<?php
namespace PaxRenaissance\Cities;

class Cyprus extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = CYPRUS;
    $this->empire = MAMLUK;
    $this->name = clienttranslate('Cyprus');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => ROOK,
        'separator' => CATHOLIC,
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
