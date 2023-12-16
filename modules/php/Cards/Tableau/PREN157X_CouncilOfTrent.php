<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN157X_CouncilOfTrent extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN157X_CouncilOfTrent';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => BISHOP,
      ],
    ];
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('The 19th ecumenical council of the Catholic Church, held between 1545 and 1563, was the embodiment of the Counter-Reformation.'),
    ];
    $this->name = clienttranslate('Council of Trent');
    $this->oneShot = CRUSADE_ONE_SHOT;
    $this->ops = [
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Decrees & Canons'),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
  }
}
