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
        'religion' => CATHOLIC,
      ],
      CATHOLIC => [
        'levyIcon' => KNIGHT,
        'religion' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => ROOK,
        'religion' => ISLAMIC,
      ],
      REFORMIST => [
        'levyIcon' => KNIGHT,
        'religion' => REFORMIST,
      ],
    ];
  }
}
