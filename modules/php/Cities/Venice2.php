<?php
namespace PaxRenaissance\Cities;

class Venice2 extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = VENICE_2;
    $this->capital = true;
    $this->empire = PAPAL_STATES;
    $this->name = clienttranslate('VENICE');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => KNIGHT,
        'separator' => CATHOLIC,
      ],
      CATHOLIC => [
        'levyIcon' => KNIGHT,
        'separator' => CATHOLIC,
      ],
      // Note: should never be in play iwth below two theocracies
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
