<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN115X_SahkuluShiiteRevolt extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN115X_SahkuluShiiteRevolt';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => BISHOP,
      ],
    ];
    $this->empire = OTTOMAN;
    $this->flavorText = [
      clienttranslate("After Persia was consolidated by the Safavid Dynasty in 1509, it sent agent provocateurs into the neighbouring Ottoman Empire, stirring up trouble with sympathetic Turkmen. This sparked a widespread pro-Shi'a uprising in Anatolia, lef by a Shi'ite religious leader named Şahkulu."),
      clienttranslate('The rebels murdered the local Sunni governors and initially defeated the Janissaries sent to stop them.')
    ];
    $this->name = clienttranslate("Şahkulu Shi'ite Revolt");
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate("Shi'ia mullahs"),
        'top' => 67,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_ISLAMIC,
        'flavorText' => clienttranslate("Şahkulu Messiah"),
        'top' => 108,
        'left' => 4,
      ],
    ];
    $this->prestige = [ISLAMIC];
    $this->region = EAST;
  }
}
