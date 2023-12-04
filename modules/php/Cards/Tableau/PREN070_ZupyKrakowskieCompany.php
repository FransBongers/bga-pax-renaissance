<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN070_ZupyKrakowskieCompany extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN070_ZupyKrakowskieCompany';
    $this->agents = [
      [
        'religion' => CATHOLIC,
        'type' => KNIGHT,
      ]
    ];
    $this->empire = HUNGARY;
    $this->flavorText = [
      clienttranslate('During the reign of King Vladislas II, the noble landowners ever more both gained power and oppressed their serfs.'),
      clienttranslate('A peasant army assembled for the purpose of a crusade against the Turks revolted when the crusade was suspended in 1514. Led by György Dózsa, the rampaging peasants burned manor houses and murdered their landlords.')
    ];
    $this->name = clienttranslate('Zupy Krakowskie Company');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->region = EAST;
  }
}
