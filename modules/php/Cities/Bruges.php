<?php
namespace PaxRenaissance\Cities;

class Bruges extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = BRUGES;
    $this->empire = FRANCE;
    $this->name = clienttranslate('Bruges');
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
        'religion' => ISLAMIC,
      ],
      REFORMIST => [
        'levyIcon' => ROOK,
        'religion' => REFORMIST,
      ],
    ];
  }
}
