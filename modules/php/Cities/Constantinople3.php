<?php
namespace PaxRenaissance\Cities;

class Constantinople3 extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = CONSTANTINOPLE_3;
    $this->capital = true;
    $this->empire = OTTOMAN;
    $this->name = clienttranslate('CONSTANTINOPLE');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => KNIGHT,
        'separator' => ISLAMIC,
      ],
      CATHOLIC => [
        'levyIcon' => KNIGHT,
        'separator' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => KNIGHT,
        'separator' => ISLAMIC,
      ],
      REFORMIST => [
        'levyIcon' => KNIGHT,
        'separator' => REFORMIST,
      ],
    ];
  }
}
