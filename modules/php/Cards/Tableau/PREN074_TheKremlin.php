<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN074_TheKremlin extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN074_TheKremlin';
    $this->agents = [
      [
        'religion' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate('Ivan III the Great of Moscow invaded the Republic of Novgorod in 1470, declaring her recent alliance with the King of Poland-Lithuania to be an act of apostasy from orthodoxy.'),
      clienttranslate('The Archbishop of Novgorod surrendered, and the richest boyar families of Novgorod were deported to Moscow.')
    ];
    $this->name = clienttranslate('The Kremlin');
    $this->oneShot = TRADE_SHIFT_NOVGOROD_ONE_SHOT;
    $this->region = EAST;
  }
}
