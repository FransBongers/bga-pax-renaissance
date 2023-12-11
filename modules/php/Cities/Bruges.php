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
        'separator' => CATHOLIC,
      ],
      CATHOLIC => [
        'levyIcon' => ROOK,
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
