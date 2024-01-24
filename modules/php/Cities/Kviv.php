<?php
namespace PaxRenaissance\Cities;

class Kviv extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = KVIV;
    $this->empire = HUNGARY;
    $this->name = clienttranslate('Kviv');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => KNIGHT,
        'separator' => CATHOLIC,
      ],
      // Note: should never be in play with theocracies
      CATHOLIC => [
        'levyIcon' => KNIGHT,
        'separator' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => KNIGHT,
        'separator' => CATHOLIC,
      ],
      REFORMIST => [
        'levyIcon' => KNIGHT,
        'separator' => CATHOLIC,
      ],
    ];
  }
}
