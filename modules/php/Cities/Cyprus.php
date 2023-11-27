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
        'religion' => CATHOLIC,
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
