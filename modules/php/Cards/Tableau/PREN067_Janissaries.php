<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN067_Janissaries extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN067_Janissaries';
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
    $this->empire = EAST;
    $this->flavorText = [
      clienttranslate("The Janissaries were the Ottoman Sultan's elite household troops and bodyguards. Highly disciplined and advanced infantry, they were one of the first to use muskets and cannons."),
      clienttranslate("Their recruits were taken from the strongest sons of the sultan's Christian subjects. Their might gave them ever increasing political power.")
    ];
    $this->name = clienttranslate('Janissaries');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Kanune Raya"),
        'top' => 66.5,
        'left' => 4,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Sultan's elite bodyguard"),
        'top' => 106,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_ISLAMIC,
        'flavorText' => clienttranslate("Grand Vizier"),
        'top' => 146,
        'left' => 4,
      ]
    ];
    $this->region = EAST;
  }
}
