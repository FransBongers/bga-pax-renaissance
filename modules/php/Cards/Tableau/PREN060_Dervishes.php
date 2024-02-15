<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN060_Dervishes extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN060_Dervishes';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => BISHOP,
      ]
    ];
    $this->empire = EAST;
    $this->flavorText = [
      clienttranslate('The Bektashi were followers of Haji Bektaşî Veli, a dervish who found refuge in Anatolia in the 13th century. From here Bektashism spread into the Balkans, where its leaders (known as dedes or babas) helped convert many to Islam.'),
      clienttranslate('The Bektaşî Sufi order became the official order of the elite Janissaries.')
    ];
    $this->name = clienttranslate('Dervishes');
    $this->oneShot = APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Bektaşî Sufi"),
        'top' => 66.5,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_ISLAMIC,
        'flavorText' => clienttranslate("Sufi Pilgrimage Baba purge"),
        'top' => 107,
        'left' => 4,
      ]
    ];
    $this->prestige = [ISLAMIC];
    $this->region = EAST;
  }
}
