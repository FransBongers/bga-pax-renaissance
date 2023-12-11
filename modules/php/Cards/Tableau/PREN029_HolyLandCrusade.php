<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN029_HolyLandCrusade extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN029_HolyLandCrusade';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ],
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = MAMLUK;
    $this->flavorText = [
      clienttranslate('Six years after the fall of Constantinople, Pope Pius II made an agonized plea for all Christendom to unite in a final crusade to retake the Holy Land.'),
      clienttranslate('Only Vlad the Impaler responded favorably, and the crusaders dissipated when the Medici withdrew their promise to provide transport.')
    ];
    $this->name = clienttranslate('Holy Land Crusade');
    $this->oneShot = CRUSADE_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate('Crusader State'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Council of Mantua'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
  }
}
