<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN055_DuchyOfFerrara extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN055_DuchyOfFerrara';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => ROOK,
      ]
    ];
    $this->empire = PAPAL_STATES;
    $this->flavorText = [
      clienttranslate("Ercole I d'Este, duke of Ferrara, started to develop the saltworks at Comacchio, and Venice took this as a casus belli against its salt monopoly."),
      clienttranslate("Ercole nevertheless successfully resisted being absorbed into the Papal States by his personal nemesis, Pope Sixtus IV, and his Venetian allies. Ercole reluctantly agreed to the marriage of his son Alfonso Lucrezia Borgia.")
    ];
    $this->name = clienttranslate('Duchy of Ferrara');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Salt War'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Comacchio saltworks'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [PATRON];
    $this->region = WEST;
  }
}
