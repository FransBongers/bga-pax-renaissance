<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN208P_Sarmatism extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN208P_Sarmatism';
    $this->ageOfReformationPromo = true;
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = HUNGARY;
    $this->flavorText = [
      clienttranslate('Sarmatism was the dominant Baroque cultural ideology of the nobility (szlachta) within the Polish-Lithuanian Commonwealth.'),
      clienttranslate('It held that Poland originated from Sarmatians, an Iranic people. It respected "Golden Liberty" (the rights of nobility) and Catholicism, which distinguished them from their Turkish and Tatar peers.'),
    ];
    $this->name = clienttranslate("Sarmatism");
    $this->oneShot = CRUSADE_ONE_SHOT;
    $this->ops = [
      [
        'id' => VOTE_OP_EAST,
        'flavorText' => clienttranslate("Sejmik liberum veto"),
        'top' => 67,
        'left' => 4,
      ],
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate("Henrician Articles"),
        'top' => 106,
        'left' => 4,
      ],
    ];
    $this->prestige = [LAW];
    $this->region = EAST;
  }
}
