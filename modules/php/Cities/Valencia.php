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
        'levyIcon' => ROOK,
        'separator' => REFORMIST,
      ],
    ];
  }
}
