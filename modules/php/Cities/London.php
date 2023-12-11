<?php
namespace PaxRenaissance\Cities;

class London extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = LONDON;
    $this->capital = true;
    $this->empire = ENGLAND;
    $this->name = clienttranslate('LONDON');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => ROOK,
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
        'levyIcon' => KNIGHT,
        'separator' => REFORMIST,
      ],
    ];
  }
}
