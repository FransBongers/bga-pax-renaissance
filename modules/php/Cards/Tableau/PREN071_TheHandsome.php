<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN071_TheHandsome extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN071_TheHandsome';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => KNIGHT,
      ],
      [
        'separator' => ISLAMIC,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = HUNGARY;
    $this->flavorText = [
      clienttranslate("The boy Radu of Dracul became close friends with the sultan's son, Mehmed II (aka The Conqueror), after he and his brother Vlad were taken hostage. When Radu converted to Islam, the two brothers became mortal enemies."),
      clienttranslate('Vlad assumed command of the armies defending Wallachia and Transylvania, opposed by Radu in command of the invading Janissaries. Radu won, becoming pasha of Wallachia.')
    ];
    $this->name = clienttranslate('The Handsome');
    $this->oneShot = JIHAD_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Janissaries"),
        'top' => 66.5,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_ISLAMIC,
        'flavorText' => clienttranslate("Pasha"),
        'top' => 107,
        'left' => 4,
      ]
    ];
    $this->prestige = [ISLAMIC];
    $this->region = EAST;
  }
}
