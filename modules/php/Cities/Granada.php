<?php
namespace PaxRenaissance\Cities;

class Granada extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = GRANADA;
    $this->empire = PORTUGAL;
    $this->name = clienttranslate('Granada');
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
        'levyIcon' => KNIGHT,
        'separator' => ISLAMIC,
      ],
      REFORMIST => [
        'levyIcon' => ROOK,
        'separator' => REFORMIST,
      ],
    ];
  }
}
