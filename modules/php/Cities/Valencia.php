<?php
namespace PaxRenaissance\Cities;

class Valencia extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = VALENCIA;
    $this->capital = true;
    $this->empire = ARAGON;
    $this->name = clienttranslate('VALENCIA');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => KNIGHT,
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
        'levyIcon' => ROOK,
        'religion' => REFORMIST,
      ],
    ];
  }
}
