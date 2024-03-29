<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN059_Safavids extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN059_Safavids';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => BISHOP,
      ]
    ];
    $this->empire = BYZANTIUM;
    $this->flavorText = [
      clienttranslate("Shah Ismāil I founded the Safavid dynasty in 1501. This united Iran, previously Sunni, under the Twelver school of Shi'a Islam, marking the beginning of modern Persian history."),
      clienttranslate("By 1511 pro-Shi'a uprisings erupted in the neighboring Ottoman Empire, a Sunni dynasty, and the Turkish Sultan responded by conquering Safavid Iran.")
    ];
    $this->name = clienttranslate('Safavids');
    $this->oneShot = JIHAD_ONE_SHOT;
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate("Shi'i Alevi holocaust"),
        'top' => 67,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_ISLAMIC,
        'flavorText' => clienttranslate("Forced conversions of Twelver Shi'a"),
        'top' => 107,
        'left' => 4,
      ]
    ];
    $this->prestige = [ISLAMIC];
    $this->region = EAST;
  }
}
