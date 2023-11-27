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
        'religion' => ISLAMIC,
      ],
      CATHOLIC => [
        'levyIcon' => ROOK,
        'religion' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => KNIGHT,
        'religion' => ISLAMIC,
      ],
      REFORMIST => [
        'levyIcon' => ROOK,
        'religion' => REFORMIST,
      ],
    ];
  }
}
