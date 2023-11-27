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
        'religion' => ISLAMIC,
      ],
      CATHOLIC => [
        'levyIcon' => KNIGHT,
        'religion' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => KNIGHT,
        'religion' => ISLAMIC,
      ],
      REFORMIST => [
        'levyIcon' => KNIGHT,
        'religion' => REFORMIST,
      ],
    ];
  }
}
