<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN066_BlackArmy extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN066_BlackArmy';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => KNIGHT,
      ],
      [
        'separator' => REFORMIST,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = HUNGARY;
    $this->flavorText = [
      clienttranslate('Vuk Grgurević Branković was the titular Despot of Serbia under occupation of the Ottoman Empire. He ruled most of present-day Vojvodina under the overlordship of King Matthias Corvinus of Hungary.'),
      clienttranslate("Serbian epic poetry calls him Vuk the Fiery Dragon for his valor in commanding the Hungarian 'Black Army' against the Ottomans.")
    ];
    $this->name = clienttranslate('Black Army');
    $this->oneShot = REFORMATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Grgeteg monastery"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Arquebus mercenaries'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate("Fiery Dragon"),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = EAST;
  }
}
